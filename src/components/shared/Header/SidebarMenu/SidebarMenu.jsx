import React from "react";
import { useDispatch } from "react-redux";
import styles from "./SidebarMenu.module.scss";
import { toggleSidebarMenu } from "src/redux/UI/UI.actions";
import { CloseIcon } from "src/AssetsProvider";
import StyleUtils from "src/utils/StyleUtils";
import { CategoryMenuOverview } from "src/components/CategoryMenuOverview/CategoryMenuOverview";

export function SidebarMenu({ isMenuOpen, user }) {
  const dispatch = useDispatch();

  const menuClasses = StyleUtils.flatten([
    styles.sidebarMenu,
    isMenuOpen && styles.open,
  ]);
  const overlayClasses = StyleUtils.flatten([
    styles.sidebarOverlay,
    isMenuOpen && styles.open,
  ]);

  return (
    <div className={styles.sidebarContainer}>
      <div
        className={overlayClasses}
        onClick={() => dispatch(toggleSidebarMenu())}
      />

      <div className={menuClasses}>
        <div className={styles.sidebarMenuItems}>
          <div className={styles.sidebarHeader}>
            <CloseIcon
              className={styles.closeIcon}
              onClick={() => dispatch(toggleSidebarMenu())}
            />
          </div>

          <CategoryMenuOverview user={user} />
        </div>
      </div>
    </div>
  );
}

{
  /* <Link className="logo-container" to="/">
          <h3 className="logo">bici</h3>
        </Link>
        <div className="options">
          <Link className="option" to="/shop">
            shop
          </Link>
          <span
            className="option"
            onClick={() => dispatch(OpenModal(Modal.SellFormModal))}
          >
            sell
          </span>
          {!user ? (
            <Link className="option" to="/signin">
              sign in
            </Link>
          ) : (
            <div className="account-option">
              <FiberManualRecordIcon
                className="user-account-logo"
                fontSize="large"
              />
              <span className="account-option-title">{`${user.displayName}`}</span>
            </div>
          )}
        </div>

        dropdowna daryt cia {selectAccount && <AccountDropdown />} */
}
