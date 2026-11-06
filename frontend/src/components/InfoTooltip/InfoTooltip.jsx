import "../../blocks/info-tooltip.css";

export default function InfoTooltip({ isSuccess, message, onClose }) {
  function handleOverlayClick(event) {
    if (event.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content info-tooltip">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />
        <svg
          className="info-tooltip__icon"
          viewBox="0 0 120 120"
          role="img"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="60" fill={isSuccess ? "#2be080" : "#ff0000"} />
          {isSuccess ? (
            <path
              d="M34 62l18 18 34-36"
              fill="none"
              stroke="#fff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M42 42l36 36M78 42l-36 36"
              fill="none"
              stroke="#fff"
              strokeWidth="8"
              strokeLinecap="round"
            />
          )}
        </svg>
        <p className="info-tooltip__message">{message}</p>
      </div>
    </div>
  );
}
