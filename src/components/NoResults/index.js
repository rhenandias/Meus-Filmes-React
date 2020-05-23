import React from "react";
import "./styles.css";

import warning from "../../assets/warning.svg";

export default function NoResults() {
  return (
    <div className="no-results-card">
      <img src={warning} alt="Imagem com ponto de exclamação" />
      <strong>Oh não! :(</strong>
      <p>Nenhum resultado encontrado para esse filme ...</p>
    </div>
  );
}
