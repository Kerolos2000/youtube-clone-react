import React from "react";
import "./MainBtn.css";

export default function MainBtn(props) {
  return (
    <>
      <button
        type={props.type}
        onClick={props.functions}
        className={`${props.theam} ${props.width}`}
      >
        <i className={props.icon}></i> {props.text}
      </button>
    </>
  );
}
