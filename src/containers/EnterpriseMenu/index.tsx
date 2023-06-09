import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

import { getImgUrl } from "@/helpers/image.helper";
import {
  IEnterpriseMenuCategory,
  IEnterpriseMenuProduct,
} from "@/models/pages/IEnterpriseMenuProps";
import { Banner } from "./Banner";
import { Logo } from "./Logo";
import { IUseCategoriesTabsRef } from "./CategoriesTabs";
import CategoriesTabs from "./CategoriesTabs";
import Category from "./Category";
import { debounce } from "@/helpers/debounce.helper";
import { getOffset } from "@/helpers/document.helper";
import { elemCategoryId } from "@/helpers/category.helper";
import { AddProductModal } from "@/components/AddProductModal";
import { useResponsive } from "@/hooks/useResponsive";
import { useEnterpriseMenuQuery } from "@/hooks/fetch/useEnterpriseMenuQuery";
import { enterpriseIsClosed } from "@/helpers/enterprise.helper";
import { formatSchedule, getWeekDay } from "@/helpers/date.helper";

const EnterpriseMenu = () => {
  const { isMobile } = useResponsive();

  const router = useRouter();

  const { result: menu } = useEnterpriseMenuQuery(
    router.query.enterpriseId as string
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProd, setSelectedProd] = useState<IEnterpriseMenuProduct>();
  const categoriesTabsRef = useRef<IUseCategoriesTabsRef>(null);

  let categoryRefs: HTMLDivElement[] = [];

  const isClosed = useMemo(() => {
    if (!menu) return true;
    if (menu.isDisabled) return true;

    return enterpriseIsClosed(menu);
  }, [menu]);

  const todaySchedule = useMemo(() => {
    const todayWeekDay = getWeekDay();

    return menu?.schedules?.find((sched) => sched.weekDay === todayWeekDay);
  }, [menu]);

  const scheduleFormatted = useMemo(() => {
    if (!todaySchedule) return "";

    const { from, to } = formatSchedule(todaySchedule);

    return `${from} até ${to}`;
  }, [todaySchedule]);

  const openModal = (product: IEnterpriseMenuProduct) => {
    if (isMobile) return router.push(`/produto/${menu?.id}/${product.id}`);

    setSelectedProd(product);
    setModalIsOpen(true);
  };

  const addCategoryRef = useCallback((ref: HTMLDivElement) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    categoryRefs = [...categoryRefs, ref];
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll: EventListener = useCallback(
    debounce((_: Event): any => {
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
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  if (!menu) {
    return <>Menu não encontrado</>;
  }

  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Box paddingX={4} marginBottom={[4, 0]}>
        <Banner
          isClosed={isClosed}
          src={getImgUrl(menu.bannerKey)}
          width="100%"
        />
      </Box>
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        width="100%"
        gap={2}
        paddingX={4}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Logo src={getImgUrl(menu.imageKey)} />
          <Typography variant="h2" fontSize="large" fontWeight="bold">
            {menu.name}
          </Typography>
        </Stack>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={["flex-start", "flex-end"]}
        >
          {isClosed && (
            <Typography variant="body2">
              <Box component="span" color="red">
                Fechado
              </Box>{" "}
              - Pode fazer o pedido e ele será preparado assim que o restaurante
              abrir
            </Typography>
          )}
          <Typography variant="body2">
            Horário de funcionamento: {scheduleFormatted}
          </Typography>
        </Box>
      </Box>
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
              category={category as IEnterpriseMenuCategory}
              marginTop={2}
              index={index}
              promotions={menu.promotions || []}
              addCategoryRef={addCategoryRef}
              setSelectedProd={openModal}
            />
          </Box>
        ))}
      </Box>
      <AddProductModal
        isOpen={modalIsOpen}
        product={selectedProd}
        enterprise={menu}
        onClose={() => setModalIsOpen((actual) => !actual)}
        filled={null}
      />
    </Stack>
  );
};

export default EnterpriseMenu;
