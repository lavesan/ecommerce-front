/**
 * @description money is an integer number
 * @param {number} money
 */
export const maskMoney = (money?: number): string => {
  if (typeof money !== "number") return "";

  return (money / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
