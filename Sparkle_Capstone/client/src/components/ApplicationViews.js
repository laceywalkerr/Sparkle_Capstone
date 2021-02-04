import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ReviewDetails from "../pages/ReviewDetails";
import ReviewEdit from "../pages/ReviewEdit";
import MyReviews from "../pages/MyReviews";
import ReviewCreate from "../pages/ReviewCreate";
import CategoryManager from "../pages/CategoryManager";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <p>
                    <img src="https://i.imgur.com/PpqfgTH.png"
                        alt="Image that says Welcome Home" /> </p> : <Redirect to="/login" />}
            </Route>
            <Route path="/explore">
                {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
            </Route>
            <Route path="/my_reviews">
                {isLoggedIn ? <MyReviews /> : <Redirect to="/login" />}
            </Route>
            <Route path="/review/create">
                {isLoggedIn ? <ReviewCreate /> : <Redirect to="/login" />}
            </Route>
            <Route path="/review/:reviewId">
                {isLoggedIn ? <ReviewDetails /> : <Redirect to="/login" />}
            </Route>
            <Route path="/review/edit/:reviewId">
                {isLoggedIn ? <ReviewEdit /> : <Redirect to="/login" />}
            </Route>
            <Route path="/categories">
                {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    );
};

export default ApplicationViews;