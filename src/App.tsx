import Posts from "./components/Posts/Posts";
import About from "./components/About/About";
import ClosedMenu from "./components/ClosedMenu/ClosedMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import FullPost from "./components/FullPost/FullPost";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import React from "react";
import Popup from "./components/Popup/Popup";
import OpenedMenu from "./components/OpenedMenu/OpenedMenu";
import Preloader from "./components/Preloader/Preloader";
import "antd/dist/antd.css";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="root">
      <div className={`main `}>
        <Routes>
          <Route path="/full-post" element={<FullPost />} />
          <Route path="/" element={<About />} />
          <Route path={"/create-post"} element={<CreatePost />} />
          <Route path="/posts" element={<Preloader />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/comments" element={<Profile />} />
        </Routes>
        {pathname !== "/profile" && <Posts />}
        <ClosedMenu />
        <Popup />
        <OpenedMenu />
      </div>
    </div>
  );
};

export default App;
