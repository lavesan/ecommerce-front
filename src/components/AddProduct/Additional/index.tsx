import { Typography, Box, Chip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { IProductAdditionalCategory } from "@/models/entities/IProductAdditionalCategory";
import { useAppContext } from "@/hooks/useAppContext";
import { maskMoney } from "@/helpers/money.helper";
import { getImgUrl } from "@/helpers/image.helper";
import { useResponsive } from "@/hooks/useResponsive";
import { IAddProductAdditional } from "@/models/components/IAddProductAdditional";
import { useMemo } from "react";

interface IAdditionaProps {
  additionaCat: IProductAdditionalCategory;
  addAdditional: (additional: IAddProductAdditional) => void;
  subtractAdditional: (id: string) => void;
  disabledAddAddditional: (data: {
    addCategoryId: string;
    limit: number;
  }) => boolean;
  getAdditionalQuantity: (id: string) => number;
  getAdditionalCategoryQuantity: (id: string) => number;
}

export const Additional = ({
  additionaCat,
  addAdditional,
  subtractAdditional,
  disabledAddAddditional,
  getAdditionalQuantity,
  getAdditionalCategoryQuantity,
}: IAdditionaProps) => {
  const { isDarkMode } = useAppContext();
  const { isMobile } = useResponsive();

  const totalQuantityCount = useMemo<string>(() => {
    return `${getAdditionalCategoryQuantity(additionaCat.id)}/${
      additionaCat.limit
    }`;
  }, [additionaCat, getAdditionalCategoryQuantity]);

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
          {!!additionaCat.limit && (
            <Chip label={totalQuantityCount} variant="outlined" />
          )}
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
        <Box
          key={`additional_${additional.id}`}
          sx={{
            borderRadius: 0,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: 2,
            paddingInline: 4,
          }}
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
          {!!additional.imageKey && (
            <Box
              component="img"
              src={getImgUrl(additional.imageKey)}
              width={[40, 60]}
              height={[40, 60]}
            />
          )}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            width={50}
          >
            {!!getAdditionalQuantity(additional.id) && (
              <>
                <IconButton
                  onClick={() => subtractAdditional(additional.id)}
                  title={`Substrair ${additional.name}`}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{getAdditionalQuantity(additional.id)}</Typography>
              </>
            )}
            <IconButton
              title={`Adicionar ${additional.name}`}
              onClick={() =>
                addAdditional({
                  addCategoryId: additionaCat.id,
                  id: additional.id,
                  quantity: 1,
                  value: additional.value,
                  name: additional.name,
                })
              }
              disabled={disabledAddAddditional({
                limit: additionaCat.limit,
                addCategoryId: additionaCat.id,
              })}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </>
  );
};
