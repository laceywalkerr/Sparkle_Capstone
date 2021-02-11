import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../../src/utils/dateFormatter";
// import { FacebookCounter } from 'react-reactions';

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
                            <h3>{review.nameOfProduct}</h3>
                        </Link>
                        <strong className="text-danger">Category: {review.category.name}</strong>
                    </div>
                    {/* <h5>
                     <p className="text-justify mx-5">{review.previewText}</p> 
                    </h5> */}
                </div>
                <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
                    <p className="ml-5 text-info">Written by {review.displayName}</p>
                    <p className="ml-5">
                        Published on {formatDate(review.publishDateTime)}
                    </p>
                </div>
                <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
                    <h5>Star Rating: {review.rating}</h5>
                </div>

                <div>
                    {/* <button type="button" class="btn btn-default btn-sm text-right">
                        <span class="glyphicon glyphicon-thumbs-up"></span>
                        <h2> 👍 </h2>
                    </button> */}

                    {/* <FacebookCounter /> */}
                </div>
            </div>
        </Card>
    );
};

export default ReviewSummaryCard;