import { AppLayout } from "@/components/AppLayout";
import EnterpriseMenu from "@/containers/EnterpriseMenu";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { GetServerSideProps } from "next";

// SSG
export const getServerSideProps: GetServerSideProps<
  IEnterpriseMenuProps
> = async ({ params }) => {
  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { enterpriseId } = params;

  const menu: IEnterpriseMenuProps["menu"] = await enterpriseService.findMenu(
    enterpriseId
  );

  return {
    props: {
      menu,
    },
    // revalidate: 60 * 60 * 24, // Props para executar novamente este código. 24 horas
  };
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: IEnterpriseMenuProps) => (
  <AppLayout>
    <EnterpriseMenu {...props} />
  </AppLayout>
);
