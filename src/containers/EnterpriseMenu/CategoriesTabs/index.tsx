import {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
import { Tabs, Tab, TabsProps } from "@mui/material";

import { ICategory } from "@/models/entities/ICategory";
import { useResponsive } from "@/hooks/useResponsive";
import { elemCategoryId } from "@/helpers/category.helper";

interface ICategoriresTabsProps extends TabsProps {
  categories?: ICategory[];
}

export interface IUseCategoriesTabsRef {
  changeCategory: (index: number) => void;
}

const CategoriesTabs: ForwardRefRenderFunction<
  IUseCategoriesTabsRef,
  ICategoriresTabsProps
> = ({ categories = [], ...tabsProps }, ref) => {
  const { isMobile } = useResponsive();

  const [tab, setTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    const a = document.createElement("a");
    a.href = `#${elemCategoryId(categories[newValue].id)}`;
    a.click();

    setTab(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeCategory: (index: number) => {
      setTab(index);
    },
  }));

  return (
    <Tabs
      {...tabsProps}
      value={tab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="inherit"
      variant={isMobile ? "scrollable" : "fullWidth"}
      aria-label="categories list"
      scrollButtons="auto"
      sx={{
        position: "sticky",
        top: isMobile ? "3.125rem" : "4.063rem",
        left: 0,
        backgroundColor: "white",
      }}
    >
      {categories.map(({ id, name }) => (
        <Tab
          key={`category_${id}`}
          id={`category_${id}`}
          aria-controls={`category_full-width-tabpanel-${id}`}
          label={name}
          sx={{
            textTransform: "none",
          }}
        />
      ))}
    </Tabs>
  );
};

export default forwardRef(CategoriesTabs);
