export const prepareHashMessage = (data: any) => {
  return (
    Object.entries(data)
      //@ts-ignore
      .sort(([a], [b]) => a - b)
      .map(([key, val]) => `${key}_${val}`)
      .join('__')
  );
};
