import { GetServerSideProps } from "next";

import { IHomeProps } from "@/models/pages/IHomeProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { AppLayout } from "@/components/AppLayout";
import Home from "@/containers/Home";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// SSG
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const enterpriseService = EnterpriseService.getInstance();
  const promotionService = PromotionService.getInstance();

  const enterprises = await enterpriseService.findAll();

  const todayWeekDay = getWeekDay();
  const promotions = await promotionService.findAllByWeekDay(todayWeekDay);

  return {
    props: {
      enterprises,
      promotions,
    },
    // revalidate: 60 * 60 * 24, // Props para executar novamente este código. 24 horas
  };
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: IHomeProps) => (
  <AppLayout>
    <Home {...props} />
  </AppLayout>
);
