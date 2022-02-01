import React, { useEffect } from "react";
import styles from "./ShopOverview.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useList } from "src/hooks/useList";
import { ShopCollection } from "../ShopCollection/ShopCollection";
import { LoadableCollection } from "src/components/Shared/LoadableCollection/LoadableCollection";
import { selectList } from "src/redux/Shop/Shop.selectors";
import { clearAggregatedList, getList } from "src/redux/Shop/Shop.actions";
import { useParamsListener } from "src/hooks/useParamsListener";
import { collection } from "src/redux/actions/shop/collection";

export function ShopOverview() {
  const {
    params: { shopType },
  } = useParamsListener();
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.shop.limit);
  const lastVisible = useSelector((state) => state.shop.lastVisible);
  const initialLoad = useSelector((state) => state.shop.initialLoad);

  const { list } = useList(selectList, collection.request, {
    limit: limit,
    lastVisible: lastVisible,
  });

  useEffect(() => {
    dispatch(clearAggregatedList());
  }, [shopType, dispatch]);

  return (
    <div className={styles.overview}>
      <LoadableCollection initialLoad={initialLoad} list={list}>
        <ShopCollection />
      </LoadableCollection>
    </div>
  );
}
