  
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import PhotoFeed from "./components/ExplorePage/Explore"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index"
import UploadFormPage from "./components/UploadPhoto/UploadPhoto"
import Images from "./components/Images";

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
    console.log(location)
    if (
      location.pathname === "/" ||
      location.pathname === "/signup" ||
      location.pathname === "/login"
    ) {
      return "idbackground";
    } 
    return ''
 }

 
    return (
      <div className="wrapper">
        <div className={backgroundClass()}>
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
              <Route exact path="/photo/:id" component={PhotoFeed}></Route>
            </Switch>
          </>
        </div>
      </div>
    );
}

export default App;

