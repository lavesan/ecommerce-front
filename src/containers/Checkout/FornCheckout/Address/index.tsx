import {
  Modal,
  Backdrop,
  Fade,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ChooseAddress from "@/containers/ChooseAddress";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "next/router";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";

export const Address = () => {
  const { address } = useCheckoutContext();

  const { isMobile } = useResponsive();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toogleOpen = () => {
    setIsOpen((actual) => !actual);
  };

  const openAddress = () => {
    if (isMobile) return router.push("/endereco");

    toogleOpen();
  };

  return (
    <>
      <Typography component="h2">Endereço</Typography>
      <Box
        component="button"
        onClick={openAddress}
        border="none"
        sx={{ cursor: "pointer", background: "none" }}
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
