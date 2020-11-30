  
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import PhotoFeed from "./components/ExplorePage/Explore"
import * as sessionActions from "./store/session";
import * as photoActions from "./store/photos"
import Navigation from "./components/Navigation/index"
import UploadFormPage from "./components/UploadPhoto/UploadPhoto"
import Images from "./components/Images";
import SinglePhoto from "./components/SinglePhoto"
import PhotoFeedByUser from "./components/MyPage/myPage";

//const backgroud = [abc , bdc]


function App() {
  const dispatch = useDispatch();
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false);
  const [background, setBackground] = useState("idbackground");
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  const user = useSelector((state) => state.session.user)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setBackground()
  //   })
  // })

  const backgroundClass = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/signup" ||
      location.pathname === "/login"
    ) {
      return "idbackground";
    } 
    return ''
  }
  
  const inspire = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/signup" ||
      location.pathname === "/login"
    ) {
      return <h1>Inspire and Get Inspired</h1>;
    }
    return "";
  };

 
    return (
      <div className="wrapper">
        <div className={backgroundClass()}>
          <div className={inspire()}></div>
          <>
            <Navigation />
            <Switch>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route exact path="/explore">
                <PhotoFeed />
              </Route>
              <Route exact path="/uploadPhoto">
                <UploadFormPage />
              </Route>
              <Route exact path="/photo/:id">
                <SinglePhoto/>
                </Route>
              <Route exact path="/myphotos">
                <PhotoFeedByUser />
              </Route>
            </Switch>
          </>
        </div>
      </div>
    );
}

export default App;

