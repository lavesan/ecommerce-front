import { getImgUrl } from "@/helpers/image.helper";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { Stack, Box, Typography, Button } from "@mui/material";
import { GetServerSideProps } from "next";

const EnterpriseMenu = ({ menu }: IEnterpriseMenuProps) => {
  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }} p={4}>
      <Box
        component="div"
        aria-details="Banner da empresa"
        height={{ sm: 200, md: 300 }}
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundImage: `url(${getImgUrl(menu.imageKey)})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          component="img"
          aria-details="Banner da empresa"
          alt="Logo da empresa"
          height={50}
          width={50}
          borderRadius="50%"
          border={(theme) => `thin solid ${theme.palette.grey[400]}`}
          src={getImgUrl(menu.imageKey)}
        />
        <Typography variant="h2" fontSize="large" fontWeight="bold">
          {menu.name}
        </Typography>
        <Button
          type="button"
          size="large"
          sx={{ marginLeft: "auto", textTransform: "none" }}
        >
          Ver mais
        </Button>
      </Stack>
    </Stack>
  );
};

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

export default EnterpriseMenu;
