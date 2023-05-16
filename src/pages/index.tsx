import { GetStaticProps } from "next";

import { IHomeProps } from "@/models/pages/IHomeProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { AppLayout } from "@/components/AppLayout";
import Home from "@/containers/Home";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// SSG
export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const enterpriseService = EnterpriseService.getInstance();
  const promotionService = PromotionService.getInstance();

  const enterprises = await enterpriseService.findAll();

  const todayWeekDay = getWeekDay();
  const promotions = await promotionService.findAll({ weekDay: todayWeekDay });

  return {
    props: {
      enterprises,
      promotions,
    },
    revalidate: 60 * 60 * 0.5, // Props para executar novamente este código. 30 minutos
  };
};

const HomePage = (props: IHomeProps) => (
  <AppLayout>
    <Home {...props} />
  </AppLayout>
);

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default HomePage;
