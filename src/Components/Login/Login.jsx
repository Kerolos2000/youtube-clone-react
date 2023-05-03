import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import { Helmet } from "react-helmet";

import { useContext } from "react";
import { userDataContext } from "../../Context/userDataContext";

export default function Login() {
  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  let dataFromContext = useContext(userDataContext);
  function sendDataToapi(data) {
    setIslaoding(true);
    setError(null);
    axios
      .post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signin`, data)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userName", res.data.user.name);
          dataFromContext.saveUserData();
          setIslaoding(false);
          navigate("/youtube-clone-react/");
        }
      })
      .catch((error) => {
        setIslaoding(false);
        console.log(error);
        setError(error.response.data.message);
      });
  }

  // show and hide password
  const [checked, setChecked] = useState(true);
  const formCheckLabelRef = useRef();
  const passworkRef = useRef();
  function showPassword() {
    if (checked) {
      formCheckLabelRef.current.innerHTML = "Hide Password";
      passworkRef.current.type = "text";
    } else {
      formCheckLabelRef.current.innerHTML = "Show Password";
      passworkRef.current.type = "password";
    }
  }

  let myValidation = Yup.object({
    email: Yup.string()
      .required("Your Email is Required")
      .email("Your Email inValid"),
    password: Yup.string().required("Your Password is Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="container py-3" id="Register">
        <h2>Login Now :</h2>
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

          <div className="mb-2">
            <label htmlFor="InputInput3" className="form-label fw-bolder">
              Password :
            </label>
            <input
              id="password"
              name="password"
              ref={passworkRef}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-2 form-check">
              <input
                onChange={() => {
                  showPassword();
                  setChecked(!checked);
                }}
                type="checkbox"
                className="form-check-input inputCleck"
                id="exampleCheck1"
              />
              <label
                ref={formCheckLabelRef}
                className="form-check-label"
                htmlFor="exampleCheck1"
              >
                Show Password
              </label>
            </div>
            {islaoding ? (
              <MainBtn
                theam={"main-btn"}
                icon={"fa-solid fa-spinner fa-spin-pulse"}
                text={"loading"}
              />
            ) : (
              <MainBtn theam={"main-btn"} text={"Login"} type={"submit"} />
            )}
          </div>
          <Link to="/forgot">Forgot Your Password ?</Link>
        </form>
      </section>
    </>
  );
}
