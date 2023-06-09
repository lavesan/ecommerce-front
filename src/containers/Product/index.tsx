import { useMemo } from "react";
import { useRouter } from "next/router";

import { AddProduct } from "@/components/AddProduct";
import { useGoBack } from "@/hooks/useGoBack";
import { useProductQuery } from "@/hooks/fetch/useProductQuery";
import { getWeekDay } from "@/helpers/date.helper";
import { BouncingDotsLoader } from "@/components/BouncingDotsLoader";

const Product = () => {
  const router = useRouter();

  const { goBack } = useGoBack();

  const { result } = useProductQuery({
    enterpriseId: router.query.enterpriseId as string,
    productId: router.query.productId as string,
    weekDay: getWeekDay(),
  });

  const filledProduct = useMemo(() => {
    const filled = router.query?.product as string;
    return filled ? JSON.parse(filled) : null;
  }, [router]);

  if (!result) return <BouncingDotsLoader isLoading />;

  if (!result.product) {
    return <h1>Produto não encontrado</h1>;
  }

  if (!result.enterprise) {
    return <h1>Empresa não encontrada</h1>;
  }

  return (
    <AddProduct
      product={result.product}
      enterprise={result.enterprise}
      onSuccess={goBack}
      filled={filledProduct}
    />
  );
};

export default Product;
