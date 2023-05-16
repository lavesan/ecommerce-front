import { GetStaticPaths, GetStaticProps } from "next";

import Product from "@/containers/Product";

import { ReturnStepLayout } from "@/components/ReturnStepLayout";
import { IProductProps } from "@/models/pages/IProductProps";
import { ProductService } from "@/services/product.service";
import { IProduct } from "@/models/entities/IProduct";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
import { maskMoney } from "@/helpers/money.helper";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";

interface IPathParams {
  params: {
    productId: string;
    enterpriseId: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const enterpriseService = EnterpriseService.getInstance();

  const enterprises = await enterpriseService.findAllWithProducts();

  const paths: IPathParams[] = [];

  enterprises.map(({ id: enterpriseId, categories }) => {
    if (categories) {
      const categoriesWithProducts = categories.filter(
        (cat) => cat.products?.length
      );

      categoriesWithProducts.forEach(({ products }) => {
        if (products) {
          products.forEach(({ id: productId }) => {
            paths.push({
              params: {
                productId,
                enterpriseId,
              },
            });
          });
        }
      });
    }
  });

  return {
    paths,
    fallback: true,
  };
};

const defaultProps = {
  revalidate: 60 * 60 * 0.5, // Props para executar novamente este código. 30 minutos
};

// SSG
export const getStaticProps: GetStaticProps<IProductProps> = async ({
  params,
}) => {
  const productService = ProductService.getInstance();
  const promotionService = PromotionService.getInstance();
  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { productId, enterpriseId } = params;

  const product: IProduct = await productService.findById(productId);

  if (!product) {
    return {
      props: {
        promotion: null,
        product: null,
        enterprise: null,
      },
      ...defaultProps,
    };
  }

  const todayWeekDay = getWeekDay();

  const promotions = await promotionService.findAll({
    weekDay: todayWeekDay,
    enterpriseId,
  });

  let promotionProduct: IPromotionProduct | undefined;

  const promotion =
    promotions.find((promotion) => {
      promotionProduct = promotion.promotionProducts?.find((prodPromo) => {
        return prodPromo.product?.id === productId;
      });

      return !!promotionProduct;
    }) || null;

  const formattedProduct: IEnterpriseMenuProduct = {
    ...product,
    promotionId: promotion?.id || null,
    promotionValue: promotionProduct?.value || null,
    promotionValueFormat: maskMoney(promotionProduct?.value) || null,
    valueFormat: maskMoney(product.value),
  };

  const enterprise = (await enterpriseService.findById(enterpriseId)) || null;

  return {
    props: {
      promotion,
      enterprise,
      product: formattedProduct,
    },
    ...defaultProps,
  };
};

const ProductPage = (props: IProductProps) => {
  return (
    <ReturnStepLayout>
      <Product {...props} />
    </ReturnStepLayout>
  );
};

export default ProductPage;
