import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import { ProductImage } from "@/containers/EnterpriseMenu/Category/ProductImage";
import { IProductProductCard } from "@/models/components/IProductProductCard";
import { Additional } from "./Additional";
import { useResponsive } from "@/hooks/useResponsive";

interface IAddProductProps {
  isOpen: boolean;
  product?: IProductProductCard;
  onClose: VoidFunction;
}

export const AddProduct = ({ isOpen, product, onClose }: IAddProductProps) => {
  const { isMobile } = useResponsive();

  return (
    <Modal
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      aria-labelledby="add-product"
      aria-describedby="add-product-to-checkout"
      open={isOpen}
      onClose={onClose}
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
          flexDirection={["column", "row"]}
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
          {isMobile && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              paddingBottom={1}
            >
              <IconButton onClick={onClose} title="Fechar">
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          )}
          <Box
            width={["100%", "49%"]}
            display="flex"
            alignItems="center"
            overflow="hidden"
            height={["50px", "auto"]}
          >
            <ProductImage
              imageKey={product?.imageKey || ""}
              productName={product?.name || ""}
              width={["100%", "100%"]}
              height={["auto", "auto"]}
            />
          </Box>
          <Box width={["100%", "49%"]}>
            {!isMobile && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                paddingBottom={2}
              >
                <IconButton onClick={onClose} title="Fechar">
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>
            )}
            <Box
              display="flex"
              flexDirection="column"
              maxHeight={["40%", "70%"]}
              sx={{
                "-webkit-overflow-scrolling": "touch",
                overflowY: "scroll",
              }}
            >
              <Box paddingX={4} paddingY={2}>
                <Typography variant="h2" fontWeight="bold" fontSize={40}>
                  {product?.name}
                </Typography>
                {/* @ts-ignore */}
                <Typography
                  mt={2}
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
                <Typography mt={2} fontWeight="bold">
                  {product?.boldDescription}
                </Typography>
                <Typography mt={2}>
                  {product?.promotionValue && (
                    <Box
                      component="span"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {product?.promotionValue}
                    </Box>
                  )}{" "}
                  <Box
                    component="span"
                    color={
                      product?.promotionValue ? "grey.500" : "primary.main"
                    }
                    fontWeight={product?.promotionValue ? "normal" : "bold"}
                    fontSize={product?.promotionValue ? "small" : "large"}
                    sx={{
                      textDecoration: product?.promotionValue
                        ? "line-through"
                        : "none",
                      textDecorationColor: "grey.500",
                    }}
                  >
                    {product?.value}
                  </Box>
                </Typography>
              </Box>
              {product?.productAdditionalCategory?.map((additionaCat) => (
                <Additional
                  key={`additional_category_${additionaCat.id}`}
                  additionaCat={additionaCat}
                />
              ))}
            </Box>
            <Divider />
            <Box
              component="footer"
              height={150}
              alignSelf="flex-end"
              justifySelf="flex-end"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              flexDirection={isMobile ? "column" : "row"}
              gap={2}
              paddingY={2}
              paddingX={4}
            >
              <Box
                width={["100%", "30%"]}
                border={(theme) => `thin solid ${theme.palette.grey[400]}`}
                borderRadius={2}
                paddingY={[0, 1]}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                1
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: isMobile ? "100%" : "40%",
                  paddingBlock: isMobile ? 1 : 2,
                }}
              >
                <Box>Adicionar</Box>
                <Box>R$ 20,00</Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
