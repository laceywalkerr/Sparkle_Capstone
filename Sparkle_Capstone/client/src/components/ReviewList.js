import React from "react";
import ReviewSummaryCard from "./ReviewSummaryCard";
import { Link } from "react-router-dom";

const ReviewList = ({ reviews }) => {
    return (

        <div>
            <p>
                <Link className="btn btn-primary" to="/reviews/add">Add A Review</Link>
            </p>
            {reviews.map((review) => (
                <div className="m-4" key={review.id}>
                    <ReviewSummaryCard review={review} />
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
