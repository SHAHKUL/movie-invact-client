import { Link,useNavigate } from "react-router-dom";

 
import '../design/navbar.css'
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleLogout = () => {
    
    dispatch(logout());
    console.log(dispatch(logout()));
    navigate("/");
  };

  return (
    <div className="navigation">
      <ul >
        <span>
        <li className="list " id="act">
          <Link to={"/home/entry"}>
            <span className="icon">
            <i className="fa-solid fa-user"></i>
            </span>
            <span className="title" style={{display:'flex',flexDirection:'row',justifyContent:"center"}}>{name}</span>
          </Link>
        </li>


        
        <li className="list " >
          <Link to={"/home/entry"}>
            <span className="icon">
              <i className="fa-solid fa-house-chimney"></i>
            </span>
            <span className="title">Home</span>
          </Link>
        </li>
        <li className="list">
          <Link to={"/home/watchlist"}>
            <span className="icon">
            <i className="fa-solid fa-film"></i>
            </span>
            <span className="title">Watchlist</span>
          </Link>
        </li>
        <li className="list">
          <Link to={"/home/create"}>
            <span className="icon">
             
              <i className="fa-solid fa-plus"></i>{" "}
            </span>

            <span className="title">Create Movie</span>
          </Link>
        </li>
        </span>
        <span className="logout-button">

        <li className="list" id="special-logout">
          <Link to={"/"}>
            <span className="icon" id="icon-ide">
            <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className="title" onClick={handleLogout}>Logout</span>
          </Link>
        </li>
        </span>
      </ul>
    </div>
  );
}

export default Navbar;
