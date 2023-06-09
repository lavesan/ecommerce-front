import { GetStaticProps, GetStaticPaths } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { AppLayout } from "@/components/AppLayout";
import EnterpriseMenu from "@/containers/EnterpriseMenu";
import { EnterpriseService } from "@/services/enterprise.service";

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
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
