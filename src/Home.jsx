import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Entry from "./component/Entry";
import Create from "./component/Create";
import Edit from "./component/Edit";
import View from "./component/View";
import Watchlist from "./component/Watchlist";

function Home() {
  return (
    <div className="row">
      <div className="col-lg-1">
        <Navbar />
      </div>
      <div className="col-lg-11">
        <Routes>
          <Route path="/entry" element={<Entry />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
