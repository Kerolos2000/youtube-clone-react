import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../img/404 Error-pana.svg";
import MainBtn from "../MainBtn/MainBtn";
export default function NotFound() {
  let navigate = useNavigate();
  function goToHome() {
    navigate("/");
  }
  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <img src={notFound} className="w-50" alt="Not Found" />
        <p className="h1 fw-bold text-center">OOPS! this page not found</p>
        <MainBtn
          functions={goToHome}
          text={"Go To Home"}
          theam={"main-btn my-2"}
        />
      </div>
    </>
  );
}
