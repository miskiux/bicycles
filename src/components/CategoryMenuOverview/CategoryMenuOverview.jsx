import React, { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./CategoryMenuOverview.module.scss";
import { Tabs } from "src/components/Shared/Tabs/Tabs";
import { AccordionButton } from "src/components/Shared/Button/AccordionButton/AccordionButton";
import { Accordion } from "src/components/Shared/Accordion/Accordion";
import { BikeTypes, MenuCategory } from "src/utils/constants/Constants";
import StyleUtils from "src/utils/StyleUtils";
import { routes } from "src/routes";
import { ShopType } from "src/domain/Shop/Filters/Model/ShopType";
import { stringifyUrl } from "src/utils/navigation/NavigationUtils";

export function CategoryMenuOverview({ user }) {
  const [selectedMenuCategory, setSelectedMenuCategory] = useState({
    index: 0,
    category: ShopType.Bicycles,
  });

  const [accordionOpen, setAccordionOpen] = useState(false);

  const indexedMenu = {
    0: ShopType.Bicycles,
    1: ShopType.Accessories,
  };

  const menuItems = {
    [ShopType.Bicycles]: [
      {
        top: {
          redirect: {
            label: "Latest",
            route: {
              pathname: routes.shop.replace(
                ":shopType(bicycle|accessories)",
                ShopType.Bicycles
              ),
              search: stringifyUrl({ page: 1 }),
            },
          },
          items: {
            label: "Manufacturers",
            list: [],
          },
        },
      },
      {
        middle: {
          categories: {
            label: "Bicycle types",
            items: BikeTypes,
          },
        },
      },
      {
        bottom: {
          redirect: {
            label: "Place your bicycle",
            route: "pathname3",
            active: true,
          },
        },
      },
    ],
    [ShopType.Accessories]: [
      {
        top: {
          redirect: {
            label: "Latest",
            route: {
              pathname: routes.shop.replace(
                ":shopType(bicycle|accessories)",
                ShopType.Accessories
              ),
              search: stringifyUrl({ page: 1 }),
            },
          },
          items: {
            label: "Brands",
            list: ["here"],
          },
        },
      },
      {
        middle: {
          categories: {
            label: "Bicycle types",
            items: BikeTypes,
          },
          redirect: {
            label: "Sell",
            route: "pathname3",
          },
        },
        bottom: {
          redirect: {
            label: "Place your bicycle",
            route: "pathname3",
            active: true,
          },
        },
      },
    ],
  };

  const renderMenuItem = (item) => {
    switch (Object.keys(item)[0]) {
      case "top":
        const { top } = item;

        return (
          <div className={styles.topSection}>
            <div className={styles.menuTitle}>
              <Link to={top.redirect.route}>
                <span>{top.redirect.label}</span>
              </Link>
            </div>
            <div className={styles.menuTitle}>
              <span>{top.items.label}</span>
            </div>
          </div>
        );
      case "middle":
        const { middle } = item;
        return (
          <div className={styles.middleSection}>
            <div className={styles.menuTitle}>
              <span>{middle.categories.label}</span>
              <AccordionButton
                open={accordionOpen}
                handleClick={handleAccordion}
              />
            </div>
            <Accordion
              open={accordionOpen}
              list={middle.categories.items.map(({ code, label }) => (
                <Link to={code}>{label}</Link>
              ))}
            />
          </div>
        );
      case "bottom":
        const { bottom } = item;

        return (
          <div className={styles.menuTitle}>
            <Link to={bottom.redirect.route}>
              <span className={activeMenuTitle}>{bottom.redirect.label}</span>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  const handleCategoryChange = (newValue) => {
    setSelectedMenuCategory({
      index: newValue,
      category: indexedMenu[newValue],
    });
  };

  const handleAccordion = () => {
    setAccordionOpen((i) => !i);
  };

  const activeMenuTitle = StyleUtils.flatten([
    styles.coloredTitle,
    user ? styles.allowed : styles.disabled,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.selectionWrapper}>
        <Tabs
          tabs={Object.values(MenuCategory)}
          selected={selectedMenuCategory.index}
          handleChange={handleCategoryChange}
        />
      </div>
      <div className={styles.tabPanel}>
        {menuItems[selectedMenuCategory.category].map((item) =>
          renderMenuItem(item)
        )}
      </div>
    </div>
  );
}
