import { useState } from "react";
import { Link } from "react-router-dom";
import "../../blocks/auth.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Inicia sesión</h1>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label className="auth__label">
          <input
            className="auth__input"
            id="signin-email"
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
            id="signin-password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="auth__submit" type="submit">
          Inicia sesión
        </button>
      </form>
      <p className="auth__text">
        ¿Aún no eres miembro?{" "}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}
