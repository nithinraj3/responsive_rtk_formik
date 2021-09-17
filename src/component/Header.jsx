import { useMediaQuery } from "@material-ui/core";
import React from "react";
import AuthNavBar from "./AuthNavBar";
import Drawer from "./Drawer";
import UserNavBar from "./UserNavBar";

const Header = (props) => {
  const user = props.user;

  const isDesktop = useMediaQuery("(min-width:640px)");

  const desktopHeader = user ? (
    <UserNavBar logout={props.logout} />
  ) : (
    <AuthNavBar />
  );
  const mobileHeader = user ? <Drawer /> : <AuthNavBar />;
  return <>{isDesktop ? desktopHeader : mobileHeader}</>;
};

export default Header;
