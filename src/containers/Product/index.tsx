import { AddProduct } from "@/components/AddProduct";
import { useGoBack } from "@/hooks/useGoBack";
import { IProductProps } from "@/models/pages/IProductProps";

const Product = ({ enterprise, product }: IProductProps) => {
  const { goBack } = useGoBack();

  if (!product) {
    return <h1>Produto não encontrado</h1>;
  }

  if (!enterprise) {
    return <h1>Empresa não encontrada</h1>;
  }

  return (
    <AddProduct product={product} enterprise={enterprise} onSuccess={goBack} />
  );
};

export default Product;
