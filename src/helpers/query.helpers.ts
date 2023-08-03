export const queryValueToString = (value: string | Array<string> | undefined): string => {
  if (!value) return '';
  if (Array.isArray(value)) { return value[0]; }
  return String(value);
};

export const queryValueToNumber = (value: string | Array<string> | undefined): number | undefined => {
  if (!value) return undefined;
  return Array.isArray(value) ? Number(value[0]) : Number(value);
};
