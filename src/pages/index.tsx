import { GetStaticProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import Home from "@/containers/Home";

import { EnterpriseService } from "@/services/enterprise.service";
import { AppLayout } from "@/components/AppLayout";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// SSG
export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const enterpriseService = EnterpriseService.getInstance();
  const promotionService = PromotionService.getInstance();

  const todayWeekDay = getWeekDay();

  await queryClient.prefetchQuery(["enterprises"], () =>
    enterpriseService.findAll()
  );

  await queryClient.prefetchQuery(
    ["promotions", { weekDay: todayWeekDay }],
    () => promotionService.findAll({ weekDay: todayWeekDay })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 0.5, // Props para executar novamente este código. 30 minutos
  };
};

const HomePage = (props: any) => (
  <AppLayout>
    <Home {...props} />
  </AppLayout>
);

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default HomePage;
