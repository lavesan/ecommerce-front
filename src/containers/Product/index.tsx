import { useMemo } from "react";
import { useRouter } from "next/router";

import { AddProduct } from "@/components/AddProduct";
import { useGoBack } from "@/hooks/useGoBack";
import { IProductProps } from "@/models/pages/IProductProps";

const Product = ({ enterprise, product }: IProductProps) => {
  const router = useRouter();

  const { goBack } = useGoBack();

  const filledProduct = useMemo(() => {
    const filled = router.query?.product as string;
    return filled ? JSON.parse(filled) : null;
  }, [router]);

  if (!product) {
    return <h1>Produto não encontrado</h1>;
  }

  if (!enterprise) {
    return <h1>Empresa não encontrada</h1>;
  }

  return (
    <AddProduct
      product={product}
      enterprise={enterprise}
      onSuccess={goBack}
      filled={filledProduct}
    />
  );
};

export default Product;
