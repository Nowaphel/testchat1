import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Chat as ChatIcon,
  Assignment as BookingIcon,
  Visibility as PropertyIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Monitorização e Controlo do Chat", link: "/app/chat-monitoring", icon: <ChatIcon /> },
  { id: 1, label: "Teste do Chat", link: "/app/chat-test", icon: <ChatBubbleOutlineIcon /> },
  { id: 2, label: "Gestão de Reservas", link: "/app/bookings", icon: <BookingIcon /> },
  { id: 3, label: "Visualização de Propriedades", link: "/app/properties", icon: <PropertyIcon /> },
  { id: 'dashboard', label: "Dashboard", link: "/app/dashboard", icon: <DashboardIcon /> },
];


function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
            
          />
        ))}
        <div style={{ marginTop: 'auto' }}>
          <SidebarLink
            key="dashboard"
            location={location}
            isSidebarOpened={isSidebarOpened}
            label="Dashboard"
            link="/app/dashboard"
            icon={<DashboardIcon />}
          />
       </div>
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
