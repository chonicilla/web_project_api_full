import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../../blocks/header.css";
import "../../blocks/page.css";

function Header({ isLoggedIn, email, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleToggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  const isSignUpPage = location.pathname === "/signup";

  return (
    <header className="header">
      <img
        src={logo}
        alt="Around the U.S. Logo"
        className="logo header__logo"
      />
      <h1 className="header__hidden-h1">Around The U.S.</h1>

      <button
        className={`header__menu-button ${isMenuOpen ? "header__menu-button_opened" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
      >
        <span className="header__menu-line" />
        <span className="header__menu-line" />
        <span className="header__menu-line" />
      </button>

      <nav className={`header__nav ${isMenuOpen ? "header__nav_opened" : ""}`}>
        {isLoggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <button
              className="header__auth-button"
              type="button"
              onClick={handleSignOut}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link className="header__auth-link" to={isSignUpPage ? "/signin" : "/signup"}>
            {isSignUpPage ? "Iniciar sesión" : "Regístrate"}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
