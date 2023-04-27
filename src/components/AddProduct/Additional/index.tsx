import { Typography, Box, Chip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { IProductAdditionalCategory } from "@/models/entities/IProductAdditionalCategory";
import { useAppContext } from "@/hooks/useAppContext";
import { maskMoney } from "@/helpers/money.helper";
import { getImgUrl } from "@/helpers/image.helper";
import { useResponsive } from "@/hooks/useResponsive";

interface IAdditionaProps {
  additionaCat: IProductAdditionalCategory;
}

export const Additional = ({ additionaCat }: IAdditionaProps) => {
  const { isDarkMode } = useAppContext();
  const { isMobile } = useResponsive();

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={isDarkMode ? "grey.800" : "grey.300"}
        paddingY={2}
        paddingX={4}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            component="h3"
            sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
          >
            {additionaCat.name}
          </Typography>
          <Typography variant="body2">{additionaCat.description}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Chip label={`0/${additionaCat.limit}`} variant="outlined" />
          {!additionaCat.isOptional && (
            <Chip
              label="Obrigatório"
              variant="outlined"
              sx={{ marginLeft: 2 }}
            />
          )}
        </Box>
      </Box>
      {additionaCat.productAdditionals?.map((additional) => (
        <IconButton
          key={`additional_${additional.id}`}
          sx={{
            borderRadius: 0,
            width: "100%",
            display: "flex",
            flexdirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: 2,
            paddingInline: 4,
          }}
          title={`Adicionar ${additional.name}`}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="40%"
          >
            <Typography
              color={isDarkMode ? "white" : "grey.900"}
              textAlign="start"
            >
              {additional.name}
            </Typography>
            {!!additional.value && (
              <Typography>+ {maskMoney(additional.value)}</Typography>
            )}
          </Box>
          <Box
            component="img"
            src={getImgUrl(additional.imageKey)}
            width={[40, 60]}
            height={[40, 60]}
          />
          <AddIcon />
        </IconButton>
      ))}
    </>
  );
};
