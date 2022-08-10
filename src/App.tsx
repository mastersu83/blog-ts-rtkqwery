import Posts from "./components/Posts/Posts";
import About from "./components/About/About";
import ClosedMenu from "./components/ClosedMenu/ClosedMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import FullPost from "./components/FullPost/FullPost";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import Popup from "./components/Popup/Popup";
import OpenedMenu from "./components/OpenedMenu/OpenedMenu";
import Preloader from "./components/Preloader/Preloader";
import "antd/dist/antd.css";
import { useAuthQuery } from "./redux/api/authApi";
import { useAppDispatch } from "./hooks/appHooks";
import { setUser } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { data, isSuccess } = useAuthQuery({});

  const handlePopup = () => {
    setOpenPopup(!openPopup);
    setOpenMenu(false);
  };
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <div className="root">
      <div className={`main ${openMenu ? "main__move" : ""}`}>
        <Routes>
          <Route path="/full-post/:id" element={<FullPost />} />
          <Route path="/" element={<About />} />
          <Route path={"/create-post"} element={<CreatePost />} />
          <Route path="/posts" element={<Preloader />} />

          <Route
            path="/profile"
            element={
              <Profile handlePopup={handlePopup} openPopup={openPopup} />
            }
          />
        </Routes>
        {pathname !== "/profile" && (
          <Posts handlePopup={handlePopup} openPopup={openPopup} />
        )}
        <ClosedMenu handleMenu={handleMenu} openMenu={openMenu} />
        <Popup handlePopup={handlePopup} openPopup={openPopup} />
        <OpenedMenu
          handleMenu={handleMenu}
          openMenu={openMenu}
          handlePopup={handlePopup}
        />
      </div>
    </div>
  );
};

export default App;
