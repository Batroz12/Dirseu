import "../../styles/Navbar.css";
import React, { useState, useEffect } from "react";
import { IconButton, Badge, InputBase, Button } from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "20px",
  marginRight: "20px",
  width: "70%", // Modificado el ancho
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const visible = prevScrollPos > currentScrollPos || currentScrollPos < 50;
    setShowTopBar(visible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav>
      <div className="top-bar" style={{ top: showTopBar ? "0" : "-40px" }}>
        <div className="contact-info">
          <a href="mailto:contacto@empresa.com" className="contact-link">
            <EmailIcon
              style={{ verticalAlign: "middle", marginRight: "5px" }}
            />
            <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
            contacto@empresa.com
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=+123456789"
            className="contact-link"
          >
            <WhatsAppIcon
              style={{
                verticalAlign: "middle",
                marginLeft: "20px",
                marginRight: "5px",
              }}
            />
            <span style={{ fontWeight: "bold" }}>Tel:</span> +123456789
          </a>
        </div>
        <div className="social-icons" style={{ marginLeft: "20px" }}>
          <IconButton color="inherit" href="https://www.facebook.com/">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/">
            <InstagramIcon />
          </IconButton>
        </div>
      </div>

      <div className={`main-navbar ${!showTopBar ? "fixed" : ""}`}>
        <div className="menu-section">
          <Button
            startIcon={<MenuIcon />}
            color="inherit"
            aria-label="menu"
            style={{
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
            }}
            href="#"
          >
            MENÚ
          </Button>
        </div>
        <img
          src="https://creaemocion.com/wp-content/uploads/2018/01/logo-largo-.png"
          alt="Logo"
          style={{ width: "150px", height: "auto", marginLeft: "0" }}
        />{" "}
        {/* Alineado a la derecha */}
        <div className="search-section">
          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{ color: "black" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
        <div className="navbar-icons">
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon style={{ color: "orange" }} />
            </Badge>
          </IconButton>
          <IconButton color="black">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
