import { Box, Typography } from "@mui/material";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "next/router";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useAppContext } from "@/hooks/useAppContext";

export const Address = () => {
  const { toogleAddressModal } = useAppContext();
  const { address } = useCheckoutContext();

  const { isMobile } = useResponsive();

  const router = useRouter();

  const openAddress = () => {
    if (isMobile) return router.push("/endereco");

    toogleAddressModal();
  };

  return (
    <>
      <Typography component="h2" fontSize="28px">
        Endereço
      </Typography>
      <Box
        component="button"
        onClick={openAddress}
        my={2}
        p={2}
        width="100%"
        border={(theme) => `thin solid ${theme.palette.grey[300]}`}
        borderRadius={3}
        sx={(theme) => ({
          cursor: "pointer",
          background: "none",
          transition: "0.3s",
          textAlign: "start",
          boxShadow: `0 0 0 ${theme.palette.grey[300]}`,
          ":hover": {
            boxShadow: `2px 2px 8px ${theme.palette.grey[300]}`,
          },
        })}
      >
        {address ? (
          <>
            <Typography>
              {address.street}, {address.number}
            </Typography>
            <Typography>
              {address.complement} - {address.district}
            </Typography>
          </>
        ) : (
          <>
            <Typography>Adicione um endereço</Typography>
          </>
        )}
      </Box>
    </>
  );
};
