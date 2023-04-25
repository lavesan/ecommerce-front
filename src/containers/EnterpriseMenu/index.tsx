import { Stack, Typography, Box } from "@mui/material";

import { getImgUrl } from "@/helpers/image.helper";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { Banner } from "./Banner";
import { Logo } from "./Logo";
import CategoriesTabs from "./CategoriesTabs";
import { Category } from "./Category";
import { useRef } from "react";
import { IUseCategoriesTabsRef } from "./CategoriesTabs";

const EnterpriseMenu = ({ menu }: IEnterpriseMenuProps) => {
  //   const openDetails = () => {};
  const categoriesTabsRef = useRef<IUseCategoriesTabsRef>(null);

  const onVisibilityChange = (index: number, isVisible: boolean) => {
    if (isVisible) categoriesTabsRef.current?.changeCategory(index);
  };

  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Box paddingX={4} paddingTop={4}>
        <Banner src={getImgUrl(menu.bannerKey)} width="100%" />
      </Box>
      <Stack direction="row" alignItems="center" spacing={2} paddingX={4}>
        <Logo src={getImgUrl(menu.imageKey)} />
        <Typography variant="h2" fontSize="large" fontWeight="bold">
          {menu.name}
        </Typography>
        {/* <Button
          type="button"
          size="large"
          sx={{ marginLeft: "auto", textTransform: "none" }}
        >
          Ver mais
        </Button> */}
      </Stack>
      <CategoriesTabs ref={categoriesTabsRef} categories={menu.categories} />
      <Box paddingX={4} paddingBottom={4}>
        {menu.categories?.map((category, index) => (
          <Category
            key={`list_category_${category.id}`}
            category={category}
            marginTop={2}
            index={index}
            onVisibilityChange={onVisibilityChange}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default EnterpriseMenu;
