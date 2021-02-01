import React, { useState, useEffect, useContext } from "react"
import ReviewList from "../components/ReviewList"
import { UserProfileContext } from "../providers/UserProfileProvider"

const MyReviews = () => {
    const { getToken } = useContext(UserProfileContext)

    const userId = localStorage.getItem("userProfileId");
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        if (userId !== null) {
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
            { myReviews.length > 0 ? <ReviewList reviews={myReviews} /> : <p>You currently do not have any reviews</p>}
        </>
    )
}

export default MyReviews