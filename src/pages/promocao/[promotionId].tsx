import { AppLayout } from "@/components/AppLayout";
import PromotionMenu from "@/containers/PromotionMenu";
import { IPromotionMenuProps } from "@/models/pages/IPromotionMenuProps";
import { PromotionService } from "@/services/promotion.service";
import { GetServerSideProps } from "next";

// SSG
export const getServerSideProps: GetServerSideProps<
  IPromotionMenuProps
> = async ({ params }) => {
  const promotionService = PromotionService.getInstance();

  // @ts-ignore
  const { promotionId } = params;

  const promotion = await promotionService.findById(promotionId);

  return {
    props: {
      promotion,
    },
    // revalidate: 60 * 60 * 24, // Props para executar novamente este código. 24 horas
  };
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: IPromotionMenuProps) => (
  <AppLayout>
    <PromotionMenu {...props} />
  </AppLayout>
);
