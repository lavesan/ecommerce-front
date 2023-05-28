import {
  ChipProps,
  Modal,
  Backdrop,
  Fade,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ChooseAddress from "@/containers/ChooseAddress";
import { useAppContext } from "@/hooks/useAppContext";

interface IManageAddressModalProps extends ChipProps {}

export const ManageAddressModal = (chipProps: IManageAddressModalProps) => {
  const { toogleAddressModal, showAddressModal } = useAppContext();

  return (
    <Modal
      keepMounted
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      aria-labelledby="add-product"
      aria-describedby="add-product-to-checkout"
      open={showAddressModal}
      onClose={toogleAddressModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showAddressModal}>
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
            overflowY: "scroll",
            ":focus": {
              border: "none",
            },
          }}
        >
          <Box>
            <IconButton
              onClick={toogleAddressModal}
              type="button"
              sx={{ width: "fit-content" }}
            >
              <CloseIcon />
            </IconButton>
            <ChooseAddress onChoose={toogleAddressModal} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
