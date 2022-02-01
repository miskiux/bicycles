import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withProps } from "src/utils/hoc/hocFactory";

import { getManufacturerListStart } from "src/redux/SellStore/SellFormStore/SellForm.actions";

import SellOverview from "src/components/SellForm/SellOverview/SellOverview";

export const Data = () => {
  const sellForm = useSelector((state) => state.sellForm);
  const isLoading = useSelector((state) => state.sell.isLoading);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManufacturerListStart());
  }, [dispatch]);

  return {
    sellForm,
    isLoading,
    ...user,
  };
};

const SellContainer = withProps(Data)(SellOverview);

export default SellContainer;
