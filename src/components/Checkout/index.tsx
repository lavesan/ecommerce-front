import { useCheckoutContext } from "@/hooks/useCheckoutContext";

export const Checkout = () => {
  const {} = useCheckoutContext();

  return <h1>Checkout</h1>;
};
