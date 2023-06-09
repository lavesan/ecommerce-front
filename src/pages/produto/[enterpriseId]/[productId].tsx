import { GetStaticPaths, GetStaticProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import Product from "@/containers/Product";

import { ReturnStepLayout } from "@/components/ReturnStepLayout";
import { ProductService } from "@/services/product.service";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const productService = ProductService.getInstance();
  const promotionService = PromotionService.getInstance();
  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { productId, enterpriseId } = params;

  const todayWeekDay = getWeekDay();

  await queryClient.prefetchQuery(["product", productId], () =>
    productService.findById(productId)
  );

  await queryClient.prefetchQuery(
    [
      "promotions",
      {
        weekDay: todayWeekDay,
        enterpriseId,
      },
    ],
    () =>
      promotionService.findAll({
        weekDay: todayWeekDay,
        enterpriseId,
      })
  );

  await queryClient.prefetchQuery(["enterprise", enterpriseId], () =>
    enterpriseService.findById(enterpriseId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    ...defaultProps,
  };
};

const ProductPage = (props: any) => {
  return (
    <ReturnStepLayout>
      <Product {...props} />
    </ReturnStepLayout>
  );
};

export default ProductPage;
