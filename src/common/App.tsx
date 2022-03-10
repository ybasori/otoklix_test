import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ${isActive && "active"}`
              }
              aria-current="true"
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `list-group-item list-group-item-action ${isActive && "active"}`
              }
            >
              Create
            </NavLink>
          </div>
        </div>
        <div className="col-md-9">
          <Routes>
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Detail />} />
            <Route path="/:id/edit" element={<Edit />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
