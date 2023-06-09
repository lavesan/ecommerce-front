import { GetStaticProps, GetStaticPaths } from "next";

import { AppLayout } from "@/components/AppLayout";
import EnterpriseMenu from "@/containers/EnterpriseMenu";
import { getWeekDay } from "@/helpers/date.helper";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { IPromotion } from "@/models/entities/IPromotion";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { maskMoney } from "@/helpers/money.helper";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const getStaticPaths: GetStaticPaths = async () => {
  // const enterpriseService = EnterpriseService.getInstance();

  // const enterprises = await enterpriseService.findAll();

  // const paths = enterprises.map(({ id }) => ({
  //   params: {
  //     enterpriseId: id,
  //   },
  // }));

  return {
    paths: [],
    fallback: "blocking",
  };
};

// SSG
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { enterpriseId } = params;

  await queryClient.prefetchQuery(["menu", enterpriseId], () =>
    enterpriseService.findMenu(enterpriseId)
  );
  // const menu: IEnterprise = await enterpriseService.findMenu(enterpriseId);

  // const todayWeekDay = getWeekDay();

  // const todayPromotions = menu.promotions?.filter(
  //   ({ weekDay }) => weekDay === todayWeekDay
  // );

  // const mappedMenu = {
  //   ...menu,
  //   categories:
  //     menu.categories?.map((category) => ({
  //       ...category,
  //       products:
  //         category.products?.map((product) => {
  //           let promoProduct: IPromotionProduct = {} as IPromotionProduct;
  //           let promotion: IPromotion = {} as IPromotion;

  //           todayPromotions?.every(({ promotionProducts, ...promo }) => {
  //             return promotionProducts?.every((prodPromo) => {
  //               if (prodPromo.product?.id === product.id) {
  //                 promoProduct = prodPromo;
  //                 promotion = promo;
  //                 return false;
  //               }
  //               return true;
  //             });
  //           });

  //           return {
  //             ...product,
  //             promotionId: promotion?.id || null,
  //             promotionValue: promoProduct?.value || null,
  //             promotionValueFormat: maskMoney(promoProduct?.value) || null,
  //             valueFormat: maskMoney(product.value),
  //           };
  //         }) || [],
  //     })) || [],
  // };

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // menu: mappedMenu,
    },
    revalidate: 60 * 60 * 0.5, // Props para executar novamente este código. 30 minutos
  };
};

const EnterprisePage = (props: any) => (
  <AppLayout>
    <EnterpriseMenu {...props} />
  </AppLayout>
);

export default EnterprisePage;
