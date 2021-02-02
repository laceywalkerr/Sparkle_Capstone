import React from "react";
import ReviewSummaryCard from "./ReviewSummaryCard";

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h1>Review Summaries</h1>
            {reviews.map((review) => (
                <div className="m-4" key={review.id}>
                    <ReviewSummaryCard review={review} />
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
