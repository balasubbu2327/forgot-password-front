import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
function Resetpassword() {
    const { pass_token } = useParams();

    const initialValues = {
      password: "",
      confirmpassword: "",
      pass_token: pass_token,
    };
    const validationSchema = yup.object({
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .min(8, "Password is too short - should be 8 chars minimum."),
      confirmpassword: yup
        .string()
        .required("Please Enter your confirm password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .min(8, "Password is too short - should be 8 chars minimum."),
    });
  
    const onSubmit = (values) =>reset(values);
  
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
      useFormik({
        initialValues,
        validationSchema,
        onSubmit,
      });
  
    function reset(values) {
      fetch(`https://ilavenilforgetpassword.herokuapp.com/resetpassword`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error("Error: " + data.error);
          } else {
            toast.success("Success: " + data.msg);
            window.location.replace("/");
            
          }
        });
    }
  return (
    <>
    <h3  className="m-3">RESET PASSWORD</h3>
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-3 col-lg-3 col-md-3 col-sm-3">
          <label  className="form-label">
           password
          </label>
          <input
           type="password"
            className="form-control"
            name="password"
            
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
           
           
          />
        </div>
        {errors.password && touched.password ? <p className="error m-3">{errors.password}</p> : " "}
        <div className="m-3 col-lg-3 col-md-3 col-sm-3">
          <label  className="form-label">
            confirm password
          </label>
          <input
            type="password"
            className="form-control"
           
            name="confirmpassword"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
           
           
          />
        </div>
        {errors.confirmpassword && touched.confirmpassword ? <p className="error m-3">{errors.confirmpassword}</p> : " "}
        <div className="m-3 col-lg-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  </>
  )
}

export default Resetpassword