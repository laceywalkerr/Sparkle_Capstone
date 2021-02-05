import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import ReviewForm from "../pages/ReviewForm"
import { UserProfileContext } from '../providers/UserProfileProvider';


const ReviewEdit = () => {

    const { reviewId } = useParams();
    const [review, setReview] = useState()

    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
        return getToken().then(token =>
            fetch(`/api/review/${reviewId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setReview))
    }, [])

    if (!review) {
        return null
    }

    return (
        <div className="container mt-5">
            console.log("Edit.js");
            <ReviewForm editableReview={review.review} />
        </div>
    )
}


export default ReviewEdit