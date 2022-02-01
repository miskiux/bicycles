import { useSelector } from "react-redux";

import { withProps } from "src/utils/hoc/hocFactory";

import { HeaderOverview } from "src/components/Shared/Header/HeaderOverview/HeaderOverview";

export const Data = () => {
  const isMenuOpen = useSelector((state) => state.UI.sidebar_menu);
  const user = useSelector((state) => state.user.currentUser);

  return {
    isMenuOpen,
    user,
  };
};

const HeaderContainer = withProps(Data)(HeaderOverview);

export default HeaderContainer;
