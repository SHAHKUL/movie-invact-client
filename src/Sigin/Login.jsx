import { useState } from "react";
import "../design/sigin.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import url from "../url.jsx";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import Loader from "../component/Loader.jsx";

function Login() {

  const [err, setErr] = useState("");
  const [load,setLoad]=useState(false)
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (val) => {
      const errors = {};

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
        setLoad(true)
        var str = await axios.post(`${url}/user/login`, val);
        setLoad(false)

        if (str.data.login) {
          dispatch(login(str.data));
        
          navigate("/home/entry");
        } else {
          setErr(str.data.message);
        }

        setTimeout(() => {
          setErr("");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="login-page">
      <div className="form">
        <p className="form-register-head">Login Page</p>
        <form className="login-form" onSubmit={formik.handleSubmit} style={{height:"280px"}}>
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
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <div className="handle-error">{formik.errors.password}</div>
          ) : null}
          <button type="submit">login</button>

          {err && <div className="handle-error">{err}</div>}
          <p className="message" style={{marginTop:"176px",marginLeft:'-20px'}}>
            Not registered?{" "}
            <a>
              <Link to={"/register"}>Create an account</Link>{" "}
            </a>
          </p>
        </form>
      </div>
      {
        load && (<Loader/>)
      }
    </div>
  );
}

export default Login;
