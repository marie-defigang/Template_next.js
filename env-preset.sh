#!/bin/sh
DEFAULT_ENV_FILE=".env.default"
ENV_BRANCHES="develop staging master"
CURRENT_BRANCH=$1

echo "current branch: ${CURRENT_BRANCH}"

for BRANCH in ${ENV_BRANCHES}; do
  if [ "${CURRENT_BRANCH}" == "${BRANCH}"  ]; then
    CURRENT_ENV_FILE=".env.${CURRENT_BRANCH}"
    echo "exporting variables from ${CURRENT_ENV_FILE} to .env file"
    cat ${CURRENT_ENV_FILE} >> .env
    echo "Done!"    
  fi
  echo "removing .env.${BRANCH}"
  rm .env.${BRANCH}
done

if [ -z "${CURRENT_ENV_FILE}" ]; then
    echo "exporting variables from ${DEFAULT_ENV_FILE} to .env file"
    cat ${DEFAULT_ENV_FILE} >> .env
    echo "Done!"        
fi

echo "removing ${DEFAULT_ENV_FILE}"
rm ${DEFAULT_ENV_FILE}

echo ".env file:"
cat .env



# DEPRECATED:

# export_preset() {
#   local envFile=${1:-.env}
#   while IFS= read -r line; do
#     stripline="${line// /}"
#     case "$stripline" in
#       "#"*) continue ;;
#     esac
#     [[ -z "$stripline" ]] && continue
#     key=$(echo "$line" | cut -d '=' -f 1)
#     value=$(echo "$line" | cut -d '=' -f 2-)
#     eval "export ${key}=\"__CONFIG_PRESET__${key}__\""
#   done < "$envFile"
# }


# for file in $(ls .env*); do
#   echo "Loading env from $file"
#   export_preset $file
# done

# exec "$@"
