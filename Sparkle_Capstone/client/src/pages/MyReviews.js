import React, { useState, useEffect, useContext } from "react"
import ReviewList from "../components/ReviewList"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { Link } from "react-router-dom";

const MyReviews = () => {
    const { getToken } = useContext(UserProfileContext)

    const userId = localStorage.getItem("userProfile");
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        console.log(userId);
        if (userId.Id !== null) {
            getToken().then((token) =>
                fetch(`/api/review/getbyuserid`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (res.status === 404) {
                            alert("Sorry, your reviews aren't here right now.")
                            return
                        }
                        return res.json();
                    })
                    .then(data => {
                        // console.log(data);
                        setMyReviews(data)
                    })

            )
        }
    }, [])

    if (!myReviews) {
        return null
    }

    return (
        <>
            <h1>My Reviews</h1>
            <p>
                <Link className="btn btn-primary" to="/review/create">Add A Review</Link>
            </p>
            { myReviews.length > 0 ? <ReviewList reviews={myReviews} /> : <p>You currently do not have any reviews</p>}
        </>
    )
}

export default MyReviews