import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { GetStaticProps } from "next";

const EnterpriseMenu = ({ menu }: IEnterpriseMenuProps) => {
  return <h1>algo</h1>;
};

// SSG
export const getStaticProps: GetStaticProps<IEnterpriseMenuProps> = async ({
  params,
}) => {
  const enterpriseService = EnterpriseService.getInstance();

  // @ts-ignore
  const { enterpriseId } = params;

  console.log("enterpriseId: ", enterpriseId);

  const menu: IEnterpriseMenuProps["menu"] = (await enterpriseService.findMenu(
    enterpriseId
  )) as IEnterpriseMenuProps["menu"];

  return {
    props: {
      menu,
    },
    // revalidate: 60 * 60 * 24, // Props para executar novamente este código. 24 horas
  };
};

export default EnterpriseMenu;
