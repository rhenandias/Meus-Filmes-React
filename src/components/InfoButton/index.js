import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import infoImage from "../../assets/info.svg";

export default function InfoButton(props) {
  const id = props.id;
  return (
    <Link className="link-info-button" to={`/movie/${id}`}>
      <button className="info-button">
        <img src={infoImage} alt="Informações sobre o filme" />
      </button>
    </Link>
  );
}
