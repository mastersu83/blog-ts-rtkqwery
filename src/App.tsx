import Posts from "./components/Posts/Posts";
import About from "./components/About/About";
import ClosedMenu from "./components/ClosedMenu/ClosedMenu";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import FullPost from "./components/FullPost/FullPost";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import React, { useEffect, useState } from "react";
import Popup from "./components/Popup/Popup";
import OpenedMenu from "./components/OpenedMenu/OpenedMenu";
import "antd/dist/antd.css";
import { useLazyAuthQuery } from "./redux/api/authApi";
import { useAppDispatch, useAppSelector } from "./hooks/appHooks";
import { setUser } from "./redux/slices/authSlice";

const App = () => {
  const {
    isAuth,
    user: { fullName },
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [authMe, { data, isSuccess }] = useLazyAuthQuery();

  const handlePopup = () => {
    setOpenPopup(!openPopup);
    setOpenMenu(false);
  };
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authMe({});
      if (isSuccess && data) {
        dispatch(setUser(data));
      }
    }
  }, [data, isAuth]);

  return (
    <div className="root">
      <div className={`main ${openMenu ? "main__move" : ""}`}>
        <Routes>
          <Route path="/full-post/:id" element={<FullPost />} />
          <Route path="/" element={<About fullName={fullName} />} />
          <Route path={"/create-post"} element={<CreatePost />} />
          <Route path="*" element={<Navigate to="/" />} />

          <Route
            path="/profile"
            element={
              isAuth ? (
                <Profile handlePopup={handlePopup} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        {pathname !== "/profile" && <Posts handlePopup={handlePopup} />}
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
