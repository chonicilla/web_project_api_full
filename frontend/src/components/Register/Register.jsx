import { useState } from "react";
import { Link } from "react-router-dom";
import "../../blocks/auth.css";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Regístrate</h1>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label className="auth__label">
          <input
            className="auth__input"
            id="signup-email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="auth__label">
          <input
            className="auth__input"
            id="signup-password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>
        <button className="auth__submit" type="submit">
          Regístrate
        </button>
      </form>
      <p className="auth__text">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
}
