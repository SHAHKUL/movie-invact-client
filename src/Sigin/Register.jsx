import {useState} from 'react'
import "../design/sigin.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import url from "../url.jsx";

function Register() {
  let navigate = useNavigate();
  const [err, setErr] = useState("");
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (val) => {
      const errors = {};
      if (!val.name) {
        errors.name = "* Name field should not be empty";
      }
      if (!val.email) {
        errors.email = "* Email field should not be empty";
      }
      if (!val.password) {
        errors.password = "* Password field should not be empty";
      }
      return errors;
    },
    onSubmit: async (val) => {
      try {
        var str = await axios.post(`${url}/user/register`, val);
        console.log(str.data);

        if (str.data.register) {
          navigate("/");
        } else {
          setErr(str.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="login-page">
      <div className="form">
        <p className="form-register-head">Register Page</p>
        <form className="login-form" onSubmit={formik.handleSubmit} style={{height:"380px"}}>
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <div className="handle-error">{formik.errors.name}</div>
          ) : null}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <div className="handle-error">{formik.errors.email}</div>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <div className="handle-error">{formik.errors.password}</div>
          ) : null}
          <button type="submit">Register</button>
          
          
          {err && (
          <div className="handle-error">{err}</div>
        )  }
          
          
          
          <p className="message" style={{marginTop:"270px",marginLeft:"-40px"}}>
            Already registered?{" "}
            <a>
              <Link to={"/"}>Sign In</Link>{" "}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
