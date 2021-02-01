import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
// import formatDate from "../../utils/dateFormatter";

const ReviewSummaryCard = ({ review }) => {
    return (
        <Card>
            <div className="row">
                <div className="col-lg-3 col-sm-12">
                    <Link to={`/review/${review.id}`}>
                        <div
                            style={{
                                backgroundImage: `url(${review.imageLocation})`,
                            }}
                        ></div>
                    </Link>
                </div>
                <div className="col-lg-5 col-sm-12 py-3">
                    <div>
                        <Link to={`/review/${review.id}`}>
                            <h2>{review.title}</h2>
                        </Link>
                        <strong className="text-danger">{review.category.name}</strong>
                    </div>
                    {/* <p className="text-justify mx-5">{review.previewText}</p> */}
                </div>
                <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
                    <p className="ml-5 text-info">Written by {review.DisplayName}</p>
                    {/* <p className="ml-5">
                        Published on {formatDate(review.publishDateTime)}
                    </p> */}
                </div>
            </div>
        </Card>
    );
};

export default ReviewSummaryCard;