const TOKEN_KEY = "17847468-188a-4978-a423-c1b2f2b49cd9tok";

export const getStorageToken = () => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem(TOKEN_KEY)
    : "";
};

export const setStorageToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
