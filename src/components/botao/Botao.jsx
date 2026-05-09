import "./Botao.css";
import PropTypes from "prop-types";

function Botao({ text, onClick, type = "number", wide = false }) {
  return (
    <button
      className={`botao-apple ${type} ${wide ? "wide" : ""}`}
      onClick={onClick}
    >
      <span className="button-text">{text}</span>
    </button>
  );
}

Botao.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["number", "operator", "function", "action"]),
  wide: PropTypes.bool,
};

export default Botao;
