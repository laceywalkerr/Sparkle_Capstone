import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"
import ReviewList from "../components/ReviewList.js";
import { Link } from "react-router-dom";

const Explore = () => {

    const [reviews, setReviews] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (reviews !== []) {
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
        }
    }, []);


    const getSearch = () => {
        return getToken().then(token =>
            fetch(`/api/review/search?p=${search}`, {
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

                .then(reviews => {
                    setReviews(reviews)
                })
        )
    }


    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12">
            </div>

            <div className="col-lg-10 col-xs-12">
                <h1>All Reviews</h1>
                <div class="form-inline my-9 my-lg-0 navbar-right">
                    <input onChange={(s) => setSearch(s.target.value)} class="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button onClick={getSearch} class="btn btn-secondary my-2 my-sm-0">Search</button>
                </div>
                <p>
                    <Link className="btn btn-primary" to="/review/create">Add A Review</Link>
                </p>
                <ReviewList reviews={reviews} />
            </div>
        </div>
    );
};

export default Explore;
