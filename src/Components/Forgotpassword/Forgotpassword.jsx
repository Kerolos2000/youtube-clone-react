import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import { Helmet } from "react-helmet";

export default function Login() {
  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  function sendDataToapi(data) {
    setError(null);
    setIslaoding(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        data
      )
      .then((res) => {
        console.log(res);
        setIslaoding(false);
        navigate("/youtube-clone-react/reset");
      })
      .catch((error) => {
        setIslaoding(false);
        setError(error.response.data.message);
      });
  }

  let myValidation = Yup.object({
    email: Yup.string()
      .required("Your Email is Required")
      .email("Your Email inValid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <Helmet>
        <title>Find Your Account</title>
      </Helmet>
      <section className="container py-3" id="Register">
        <h2>Find Your Account Now :</h2>
        {error ? <div className="alert h5 fw-bold">{error}</div> : null}
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="mb-2">
            <label htmlFor="InputInput2" className="form-label fw-bolder">
              Email :
            </label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {islaoding ? (
              <MainBtn
                theam={"main-btn"}
                icon={"fa-solid fa-spinner fa-spin-pulse"}
                text={"loading"}
                type={"button"}
              />
            ) : (
              <MainBtn
                theam={"main-btn"}
                text={"Find Account"}
                type={"submit"}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
