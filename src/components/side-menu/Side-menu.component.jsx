import React from "react";
import "./Side-menu.styles.scss";
import Filter from "../filter/filter.component";
import { Transition } from "react-transition-group";

function SideMenu({ filterOpen, data, toggleFilter, isBreakPoint }) {
  const duration = 500;

  const sidebarStyle = {
    transition: `transform ${duration}ms`,
  };

  const SideMenuTransitionStyles = {
    entering: {
      transform: "translate3d(0%, 0%, 0)",
    },
    entered: {
      transform: "translate3d(-100%, 0, 0)",
    },
    exiting: {
      transform: "translate3d(-100%, 0, 0)",
    },
    exited: {
      transform: "translate3d(0%, 0%, 0)",
    },
  };

  return (
    <div className="side-menu-container">
      <Filter
        data={data}
        toggleFilter={toggleFilter}
        filterOpen={filterOpen}
        isBreakPoint={isBreakPoint}
      />
    </div>
  );
}

export default SideMenu;
