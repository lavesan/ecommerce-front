import { useMemo, useState } from "react";
import {
  Chip,
  ChipProps,
  Modal,
  Backdrop,
  Fade,
  Box,
  IconButton,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

import { useRouter } from "next/router";
import { useResponsive } from "@/hooks/useResponsive";
import ChooseAddress from "@/containers/ChooseAddress";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useAppContext } from "@/hooks/useAppContext";
import { useGoBack } from "@/hooks/useGoBack";

interface IManageAddressProps extends ChipProps {}

export const ManageAddress = (chipProps: IManageAddressProps) => {
  const { isMobile } = useResponsive();
  const { storeGoBackUrl } = useGoBack();

  const { token } = useAppContext();
  const { address } = useCheckoutContext();

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const addressLabel = useMemo(() => {
    return address
      ? `${address.street}, ${address.number}`
      : "Adicione um endereço";
  }, [address]);

  const toogleOpen = () => {
    setIsOpen((actual) => !actual);
  };

  const onClick = () => {
    if (!token) {
      if (isMobile) storeGoBackUrl("/endereco");
      else storeGoBackUrl(router.pathname);
      return router.push("/login");
    }

    if (isMobile) return router.push("/endereco");

    toogleOpen();
  };

  return (
    <>
      <Chip
        {...chipProps}
        icon={address ? <LocationOnIcon /> : <AddLocationAltIcon />}
        label={addressLabel}
        onClick={onClick}
        variant="outlined"
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      />
      <Modal
        keepMounted
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
        aria-labelledby="add-product"
        aria-describedby="add-product-to-checkout"
        open={isOpen}
        onClose={toogleOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box
            display="flex"
            flexDirection="column"
            width={["100vw", "90vw"]}
            height={["100vh", "90vh"]}
            borderRadius={[0, 4]}
            justifyContent={"space-between"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              border: "none",
              ":focus": {
                border: "none",
              },
            }}
          >
            <Box>
              <IconButton
                onClick={toogleOpen}
                type="button"
                sx={{ width: "fit-content" }}
              >
                <CloseIcon />
              </IconButton>
              <ChooseAddress onChoose={toogleOpen} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
