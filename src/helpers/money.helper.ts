/**
 * @description money is an integer number
 * @param {number} money
 */
export const maskMoney = (money: number) => {
  return (money / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
