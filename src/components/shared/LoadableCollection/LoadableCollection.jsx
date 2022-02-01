import React from "react";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "src/components/with-spinner/with-spinner.styles";
import { useSelector } from "react-redux";
import { getLoadedImages } from "src/redux/Shop/Shop.actions";
import { useImagePreloader } from "src/hooks/useImagePreloader";
import { useParamsListener } from "src/hooks/useParamsListener";

export function LoadableCollection({ initialLoad, list, children }) {
  const initialImages = list.map(({ item }) => item.url[0]);

  const itemsLoading = useSelector((state) => state.shop.imageLoading);

  const { query } = useParamsListener();

  useImagePreloader(initialLoad, initialImages, getLoadedImages);

  return initialLoad || (itemsLoading && +query.page === 1) ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <>{children}</>
  );
}
