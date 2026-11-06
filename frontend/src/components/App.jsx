import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { POPUPS } from "../utils/popups.js";
import EditProfile from "./Main/components/popup/EditProfile.jsx";
import NewCard from "./Main/components/popup/NewCard.jsx";
import EditAvatar from "./Main/components/popup/EditAvatar.jsx";
import ImagePopup from "./Main/components/popup/ImagePopup.jsx";
import RemoveCard from "./Main/components/popup/RemoveCard.jsx";

const TOKEN_KEY = "jwt";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar:
      "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
    _id: "7db464fb0536b983646b92b4",
  });
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [imageCard, setImageCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((data) => {
        setUserEmail(data.email);
        setIsLoggedIn(true);
        loadMainData();
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem(TOKEN_KEY);
      });
  }, []);

  function loadMainData() {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleOpenPopup(popupName) {
    setPopup(popupName);
  }

  function handleClosePopup() {
    setPopup(null);
    setImageCard(null);
    setCardToDelete(null);
  }

  const handleUpdateUser = async (data) => {
    try {
      const response = await api.setUserInfo(data);
      setCurrentUser(response);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const response = await api.setUserAvatar(data);
      setCurrentUser(response);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  async function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleRequestDelete(card) {
    setCardToDelete(card);
    setPopup(POPUPS.REMOVE_CARD);
  }

  async function handleConfirmDelete() {
    if (!cardToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteCard(cardToDelete._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== cardToDelete._id),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      handleClosePopup();
    }
  }

  async function handleAddPlaceSubmit({ name, link }) {
    try {
      const newCard = await api.addCard(name, link);
      setCards((prevCards) => [newCard, ...prevCards]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenImage(card) {
    setImageCard(card);
    handleOpenPopup(POPUPS.IMAGE);
  }

  function handleSubmitNewCard(data) {
    handleAddPlaceSubmit(data);
  }

  function handleRegistration({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegisterSuccess(true);
        setInfoTooltipMessage("¡Correcto! Ya estás registrado.");
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setIsRegisterSuccess(false);
        setInfoTooltipMessage(
          "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        );
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
          setUserEmail(email);
          setIsLoggedIn(true);
          loadMainData();
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        setIsRegisterSuccess(false);
        setInfoTooltipMessage(
          "Uy, algo salió mal. El correo o la contraseña son incorrectos.",
        );
        setIsInfoTooltipOpen(true);
      });
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false);
    if (isRegisterSuccess) {
      navigate("/signin");
    }
  }

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
    setUserEmail("");
    setCards([]);
    navigate("/signin");
  }

  const popupConfig = (() => {
    switch (popup) {
      case POPUPS.EDIT_PROFILE:
        return {
          title: "Editar perfil",
          children: <EditProfile />,
        };
      case POPUPS.NEW_CARD:
        return {
          title: "Nuevo lugar",
          children: <NewCard onSubmit={handleSubmitNewCard} />,
        };
      case POPUPS.EDIT_AVATAR:
        return {
          title: "Cambiar foto de perfil",
          children: <EditAvatar />,
        };
      case POPUPS.IMAGE:
        return {
          title: null,
          children: <ImagePopup card={imageCard} />,
        };
      case POPUPS.REMOVE_CARD:
        return {
          title: "¿Estás seguro/a?",
          children: (
            <RemoveCard
              onConfirm={handleConfirmDelete}
              isLoading={isDeleting}
            />
          ),
        };
      default:
        return null;
    }
  })();

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleRequestDelete}
                    onOpenPopup={handleOpenPopup}
                    onOpenImage={handleOpenImage}
                    popupConfig={popupConfig}
                    onClosePopup={handleClosePopup}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register onRegister={handleRegistration} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login onLogin={handleLogin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>
      </div>
      {isInfoTooltipOpen && (
        <InfoTooltip
          isSuccess={isRegisterSuccess}
          message={infoTooltipMessage}
          onClose={handleInfoTooltipClose}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
