import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"
import ReviewList from "../components/reviews/List";

const Explore = () => {

    const [reviews, setReviews] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
        return getToken().then(token =>
            fetch("/api/review", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 401) {
                    }
                    return res.json()
                })
                .then(reviews => setReviews(reviews))
        )
    }, []);

    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12"></div>
            <div className="col-lg-10 col-xs-12">
                <ReviewList reviews={reviews} />
            </div>
        </div>
    );
};

export default Explore;
