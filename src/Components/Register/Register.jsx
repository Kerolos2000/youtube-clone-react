import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
// import usePostAxios from '../../Hooks/usePostaxios'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";
import { Helmet } from "react-helmet";

export default function Register() {
  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  function sendDataToapi(data) {
    setIslaoding(true);
    setError(null);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          console.log("done");
          setIslaoding(false);
          navigate("/youtube-clone-react/login");
        }
      })
      .catch((error) => {
        console.log(error);
        setIslaoding(false);
        setError(error.response.data.message);
      });
  }

  // show and hide password
  const [checked, setChecked] = useState(true);
  const formCheckLabelRef = useRef();
  const passworkRef = useRef();
  const rePassworkRef = useRef();
  function showPassword() {
    if (checked) {
      formCheckLabelRef.current.innerHTML = "Hide Password";
      passworkRef.current.type = "text";
      rePassworkRef.current.type = "text";
    } else {
      formCheckLabelRef.current.innerHTML = "Show Password";
      passworkRef.current.type = "password";
      rePassworkRef.current.type = "password";
    }
  }

  let myValidation = Yup.object({
    name: Yup.string()
      .required("Your Name is Required")
      .min(3, "Min Length is 3 Chars")
      .max(15, "Max Length is 15 Chars"),
    email: Yup.string()
      .required("Your Email is Required")
      .email("Your Email inValid"),
    password: Yup.string()
      .required("Your Password is Required")
      .matches(
        /^[A-Z].{5,9}$/,
        "Your Password Must Start With Uppercase and Consists of 6 to 10 char"
      ),
    rePassword: Yup.string()
      .required("rePassword is Required")
      .oneOf([Yup.ref("password")], "rePassword don't Match Password"),
    phone: Yup.string()
      .required("Phone Nunber is Required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid Number Such 01[0125]xxxxxxxx"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <Helmet>
        <title>Rrgister</title>
      </Helmet>
      <section className="container py-3" id="Register">
        <h2>Rrgister Now :</h2>
        {error ? <div className="alert h5 fw-bold">{error}</div> : null}
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="mb-2">
            <label htmlFor="InputInput1" className="form-label fw-bolder">
              Name :
            </label>
            <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert">{formik.errors.name}</div>
            ) : null}
          </div>

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

          <div className="mb-2">
            <label htmlFor="InputInput4" className="form-label fw-bolder">
              rePassword :
            </label>
            <input
              id="rePassword"
              name="rePassword"
              ref={rePassworkRef}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert">{formik.errors.rePassword}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="InputInput5" className="form-label fw-bolder">
              phone :
            </label>
            <input
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
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
              <MainBtn theam={"main-btn"} text={"Register"} type={"submit"} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
