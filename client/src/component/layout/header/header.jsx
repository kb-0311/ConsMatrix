import React from "react";
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FcApproval } from 'react-icons/fc'
import { ReactNavbar } from 'overlay-navbar';
import logo from "../../../images/logo.png";

const options = {
  SearchIconElement : BsSearch,
  searchIcon : true,
  ProfileIconElement : CgProfile,
  profileIcon : true,
  CartIconElement : FcApproval,
  cartIcon : true,
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "10vmax",
  navColor1: "orange",
  logoHoverSize: "15px",
  logoHoverColor: "white",
  link1Text: "Home",
  link2Text: "Utilities",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "2.5vmax",
  link1Color: "black",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "white",
  link1Margin: "1.5vmax",
  
  searchIconSize : "2vmax",
  profileIconUrl: "/login",
  profileIconColor: "white",
  searchIconColor: "white",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  searchIconUrl : "/search",
  cartIconColorHover: "#eb4034",
  cartIconUrl : "/to/be/approved",
  cartIconSize : "2vmax",
  cartIconMargin: "1.3vmax",
};

const Header = () => {
  
  return <ReactNavbar {...options} />;
};

export default Header;