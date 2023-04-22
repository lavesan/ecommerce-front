import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
