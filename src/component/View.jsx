import { useEffect, useState } from "react";
import "../design/view.css";
import { Link, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import Url from "../url";
import { useSelector } from "react-redux";
import swal from "sweetalert";
function View() {
  const param = useParams();
  const [val, setVal] = useState([]);
  const [star, setStar] = useState(false);
  const navigate=useNavigate()
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    fetch();
    addTowatchlist()
  }, []);
  const fetch = async () => {
    var res = await axios.get(`${Url}/movie/get/${param.id}`,{
      headers:{
        auth:token
      }
    });
    console.log(res.data);
    setStar(res.data.watched)
    setVal(res.data);
  };

  const removeMovie = async () => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Movie!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         axios.delete(`${Url}/movie/remove/${param.id}`,{
          headers:{
            auth:token
          }
        });
        swal("Poof! Your Movie deleted Successfully!", {
          icon: "success",
        });
        navigate('/home/entry')
      } else {
        swal("Your Movie is not Deleted!");
      }
    });
  };

  const addTowatchlist = async () => {
    var store = val.watched;

    var res = await axios.put(`${Url}/movie/update/${param.id}`, {
      ...val,
      watched: !store,
    },{
      headers:{
        auth:token
      }
    });
    setStar(res.data.watched);
    console.log(res.data);
  };

  return (
    <div className="movie-view">
      <div className="movie-view-image">
        <img className="movie-view-image-original" src={val.img} />
        {star ? (
          <i
            className="fa-solid fa-star fa-3x movie-add-watchlist"
            onClick={addTowatchlist}
          ></i>
        ) : (
          <i
            className="fa-regular fa-star fa-3x movie-add-watchlist"
            onClick={addTowatchlist}
          ></i>
        )}
      </div>
      <div className="movie-view-genre">
        <p className="movie-view-genre-each">{val.genre}</p>
      </div>
      <div className="movie-view-title">
        <p className="movie-view-title-each">{val.title}</p>
      </div>
      <div className="movie-view-year">
        <p className="movie-view-year-each">{val.year}</p>
        <p className="movie-view-year-rating">{val.rating}/5</p>
      </div>

      <div className="movie-view-desc">
        <div>
          <p className="movie-view-desc-each"> Description</p>
          <p className="movie-view-desc-content">{val.description}</p>
        </div>
        <div className="movie-view-box"></div>

        <div>
          <p className="movie-view-desc-each">Review</p>
          <p className="movie-view-desc-content">{val.review}</p>
        </div>
      </div>
      <div className="edit-delete-button">
        <Link to={`/home/edit/${param.id}`}>
        <i className="fa-solid fa-pen-to-square fa-bounce"></i>
     
        </Link>
        <i className="fa-solid fa-trash fa-shake" onClick={removeMovie}></i>
        
      </div>
    </div>
  );
}

export default View;
