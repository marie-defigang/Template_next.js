#!/bin/sh

export_envs() {
  local envFile=${1:-.env}
  while IFS= read -r line; do
    stripline="${line// /}"
    case "$stripline" in
      "#"*) continue ;;
    esac
    [[ -z "$stripline" ]] && continue
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    eval "value=\"\$(echo $value)\""
    defval=$(printenv $key)
    val="${defval:-$value}"
    eval "export ${key}=\"$(echo \${val})\""
    eval "export __CONFIG_PRESET__${key}__=\"$(echo \${val})\""
  done < "$envFile"
}

NODE_ENV=${NODE_ENV:-production}
NODE_CONFIG_ENV=${NODE_CONFIG_ENV:-$NODE_ENV}

for dotenv in ".env.${NODE_CONFIG_ENV}.local" ".env.local" ".env.${NODE_CONFIG_ENV}" ".env"; do
  if [ -e $dotenv ]; then
   echo "Loading env from $dotenv"
   export_envs $dotenv
  fi;
done
ARGS=""

while IFS= read -r line; do
  value=${line#*=}
  key=${line%%=*}
  s="s|$key|$value|g"
  ARGS="$ARGS$s;"
  unset $key
#  echo $key=$value
done << EOT
`env | grep '__CONFIG_PRESET__'`
EOT

ARGS="${ARGS:0:-1}"
#echo $ARGS
grep -r '__CONFIG_PRESET__' .next | cut -d':' -f1 | xargs -n1 sed -i -e "$ARGS"
env
echo "Starting..."

exec "$@"
