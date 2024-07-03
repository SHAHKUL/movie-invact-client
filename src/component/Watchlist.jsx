import axios from "axios";
import "../design/entry.css";
import { useEffect, useState } from "react";
import Url from "../url";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function Watchlist() {
  const [val, setVal] = useState([]);
  const [load, setLoad] = useState(false);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    setLoad(true);
    var res = await axios.get(`${Url}/movie/watchList`,{
      headers:{
        auth:token
      }
    });
    setLoad(false);
    console.log(res.data);
    setVal(res.data);
  };

  return (
    <div className="home-page-index">
      <div className="recent-para">
        <p>Your Wishlist movies</p>
      </div>

      <div className="movie-content">
        {val
          ? val.map((cur) => {
              return (
                <Link key={cur._id} to={`/home/view/${cur._id}`}>
                <div className="movie-card" >
                  <img
                    src={cur.img}
                    className="movie-card-image"
                  />
                  <div className="movie-card-title">
                    <span className="movie-card-title-name">
                      <p>{cur.title.toUpperCase()}</p>
                      <p className="movie-card-title-name-year"> ({cur.year})</p>
                    </span>
                    <span className="movie-card-title-genre">
                      <i className="fa-solid fa-clapperboard"></i>
                      <p className="movie-card-title-genre-para">{cur.genre}</p>
                    </span>
                  </div>
                </div>
                </Link>
              );
            })
          : null}
      </div>
      {load && <Loader />}
    </div>
  )
}

export default Watchlist