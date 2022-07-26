import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
function Forgotpassword() {

const { values, handleChange, handleSubmit, errors, handleBlur, touched}=useFormik({
    initialValues:{email:""},
    validationSchema :yup.object({
        email: yup.string().email().required(),
      }),
    onSubmit: values=>Forgotpassword(values)
})

  function Forgotpassword(values){
    fetch(`https://forgot-password27.herokuapp.com/forgotpassword`, {
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
            window.location.replace("/msg");
          }
        });
  }

  return (
    <>
      <h3  className="m-3">FORGOT PASSWORD</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="m-3 col-lg-3 col-md-3 col-sm-3">
            <label  className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
             
              name="email"
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
             
             
            />
          </div>
          {errors.email && touched.email ? <p className="error m-3">{errors.email}</p> : " "}
          <div className="m-3 col-lg-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forgotpassword;
