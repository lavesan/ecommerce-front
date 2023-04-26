import { useRef, useEffect } from "react";
import { Stack, Typography, Box } from "@mui/material";

import { getImgUrl } from "@/helpers/image.helper";
import { IEnterpriseMenuProps } from "@/models/pages/IEnterpriseMenuProps";
import { Banner } from "./Banner";
import { Logo } from "./Logo";
import { IUseCategoriesTabsRef } from "./CategoriesTabs";
import CategoriesTabs from "./CategoriesTabs";
import Category from "./Category";
import { debounce } from "@/helpers/debounce.helper";
import { getOffset } from "@/helpers/document.helper";
import { elemCategoryId } from "@/helpers/category.helper";

const EnterpriseMenu = ({ menu }: IEnterpriseMenuProps) => {
  //   const openDetails = () => {};
  const categoriesTabsRef = useRef<IUseCategoriesTabsRef>(null);

  let categoryRefs: HTMLDivElement[] = [];

  const addCategoryRef = (ref: HTMLDivElement) => {
    categoryRefs = [...categoryRefs, ref];
  };

  const onScroll: EventListener = debounce((_: Event): any => {
    const tabsElem = categoriesTabsRef.current?.tabsRef?.current;

    if (tabsElem) {
      const TABS_HEIGHT = 60; // It's parsed to rem on the elem

      const tabsTopEnd = getOffset(tabsElem).top + TABS_HEIGHT;

      categoryRefs.forEach((ref, index) => {
        if (ref) {
          const categoryTop = getOffset(ref).top;
          const categoryTopEnd = getOffset(ref).top + ref.offsetHeight;

          if (tabsTopEnd >= categoryTop && tabsTopEnd <= categoryTopEnd) {
            categoriesTabsRef.current?.changeCategory(index);
            return;
          }
        }
      });
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Box paddingX={4} marginBottom={[4, 0]}>
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
          <Box key={`list_category_${category.id}`} position="relative">
            <Box
              id={elemCategoryId(category.id)}
              position="absolute"
              top={-120}
              left={0}
            />
            <Category
              category={category}
              marginTop={2}
              index={index}
              promotions={menu.promotions || []}
              addCategoryRef={addCategoryRef}
            />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default EnterpriseMenu;
