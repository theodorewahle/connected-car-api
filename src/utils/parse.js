export const parseBool = (val) => {
  return !!JSON.parse(String(val).toLowerCase());
};

export const parseNum = (val) => {
  return Number.parseFloat(val);
};
