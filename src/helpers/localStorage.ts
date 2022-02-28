export const setItemToLocalStorage = (key: string, value: any): void => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getItemFromLocalStorage = (key: string) => {
  let res = localStorage.getItem(key);
  try {
    return JSON.parse(res ?? "null");
  } catch {
    return res ?? null;
  }
};
