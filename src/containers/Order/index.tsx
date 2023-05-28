import { useRouter } from "next/router";

const Order = () => {
  const { query } = useRouter();

  return <>Pedido: {query.orderId}</>;
};

export default Order;
