// import React from 'react'

import { useEffect,useState } from "react";
import "../design/sigin.css";
import axios from "axios";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Url from "../url.jsx";
import { useSelector } from "react-redux";
import Popup from "./Popup.jsx";


function Edit() {


  const param = useParams();
  const [notifi, setNotify] = useState(false);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    var res = await axios.get(`${Url}/movie/get/${param.id}`,{
      headers:{
        auth:token
      }
    });
    formik.setValues(res.data);
  };
  let formik = useFormik({
    initialValues: {
      createdBy: "",
      title: "",
      description: "",
      img: "",
      year: "",
      genre: "",
      review: "",
      rating: "",
    },
    validate: (val) => {
      const errors = {};
      if (!val.title) {
        errors.title = "* Title field should not be empty";
      }
      if (!val.description) {
        errors.description = "* Description field should not be empty";
      }
      if (!val.year) {
        errors.year = "* Year field should not be empty";
      }
      if (!val.img) {
        errors.img = "* Image field should not be empty";
      }
      if (!val.genre) {
        errors.genre = "* Genre field should not be empty";
      }
      if (!val.review) {
        errors.review = "* Review field should not be empty";
      }
      if (!val.rating) {
        errors.rating = "* Rating field should not be empty";
      }
      if (val.rating < 1 || val.rating > 5) {
        errors.rating = "* Rating should  1 to 5 only";
      }
      return errors;
    },

    onSubmit: async (val) => {
      try {
        setNotify(true)
        var str = await axios.put(`${Url}/movie/update/${param.id}`, val,{
          headers:{
            auth:token
          }
        });
        setTimeout(() => {
          setNotify(false)
        }, 1000);
        console.log(str.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="login-page" style={{ marginTop: "-90px" }}>
    <div className="form">
      <p className="form-register-head">Edit Movie</p>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Movie Name"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title ? (
          <div className="handle-error">{formik.errors.title}</div>
        ) : null}
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description ? (
          <div className="handle-error">{formik.errors.description}</div>
        ) : null}
        <input
          type="text"
          placeholder="Enter Image Link"
          name="img"
          value={formik.values.img}
          onChange={formik.handleChange}
        />
        {formik.errors.img ? (
          <div className="handle-error">{formik.errors.img}</div>
        ) : null}

        <input
          type="text"
          placeholder="Movie Release Year"
          name="year"
          value={formik.values.year}
          onChange={formik.handleChange}
        />
        {formik.errors.year ? (
          <div className="handle-error">{formik.errors.year}</div>
        ) : null}

        <input
          type="text"
          placeholder="Movie Genre"
          name="genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
        />
        {formik.errors.review ? (
          <div className="handle-error">{formik.errors.genre}</div>
        ) : null}

        <input
          type="text"
          placeholder="Movie Review"
          name="review"
          value={formik.values.review}
          onChange={formik.handleChange}
        />
        {formik.errors.review ? (
          <div className="handle-error">{formik.errors.review}</div>
        ) : null}

        <input
          type="text"
          placeholder="Enter Movie Rating"
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
        />
        {formik.errors.rating ? (
          <div className="handle-error">{formik.errors.rating}</div>
        ) : null}
        <button type="submit">Update Movie</button>

        
      </form>
    </div>
    {notifi && <Popup message='New Movie Updated Successfully'/>}
  </div>
  );
}

export default Edit;
