import { GetStaticProps, GetStaticPaths } from "next";

import { AppLayout } from "@/components/AppLayout";
import EnterpriseMenu from "@/containers/EnterpriseMenu";
import { getWeekDay } from "@/helpers/date.helper";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { IPromotion } from "@/models/entities/IPromotion";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";

export const getStaticPaths: GetStaticPaths = async () => {
  const enterpriseService = EnterpriseService.getInstance();

  const enterprises = await enterpriseService.findAll();

  const paths = enterprises.map(({ id }) => ({
    params: {
      enterpriseId: id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

// SSG
export const getStaticProps: GetStaticProps<IEnterpriseMenuProps> = async ({
  params,
}) => {
  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { enterpriseId } = params;

  const menu: IEnterprise = await enterpriseService.findMenu(enterpriseId);

  const todayWeekDay = getWeekDay();

  const todayPromotions = menu.promotions?.filter(
    ({ weekDay }) => weekDay === todayWeekDay
  );

  const mappedMenu = {
    ...menu,
    categories:
      menu.categories?.map((category) => ({
        ...category,
        products:
          category.products?.map((product) => {
            let promoProduct: IPromotionProduct = {} as IPromotionProduct;
            let promotion: IPromotion = {} as IPromotion;

            todayPromotions?.every(({ promotionProducts, ...promo }) => {
              return promotionProducts?.every((prodPromo) => {
                if (prodPromo.product?.id === product.id) {
                  promoProduct = prodPromo;
                  promotion = promo;
                  return false;
                }
                return true;
              });
            });

            return {
              ...product,
              promotionId: promotion?.id || null,
              promotionValue: promoProduct?.value || null,
            };
          }) || [],
      })) || [],
  };

  return {
    props: {
      menu: mappedMenu,
    },
    revalidate: 60 * 60 * 0.5, // Props para executar novamente este código. 30 minutos
  };
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: IEnterpriseMenuProps) => (
  <AppLayout>
    <EnterpriseMenu {...props} />
  </AppLayout>
);
