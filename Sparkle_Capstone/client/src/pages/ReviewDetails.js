import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import ReviewReactions from "../components/reviews/ReviewReactions";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from '../providers/UserProfileProvider';

const ReviewDetails = () => {
    const { reviewId } = useParams();
    const [review, setReview] = useState();
    const [reactionCounts, setReactionCounts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        return getToken().then((token) =>
            fetch(`/api/review/${reviewId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (res.status === 404) {
                        alert("* Nope *");
                        // history.push("/explore")
                        return
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        setReview(data ? data.review : null);
                        setReactionCounts(data.reactionCounts);
                    }
                }));
    }, [reviewId]);

    if (!review) return null;

    return (
        <div>
            <Jumbotron
                className="review-details__jumbo"
                style={{ backgroundImage: `url('${review.imageLocation}')` }}
            ></Jumbotron>
            <div className="container">
                <h1>{review.title}</h1>
                <h5 className="text-danger">{review.category.name}</h5>
                <div className="row">
                    <div className="col">
                        <img
                            src={review.userProfile.imageLocation}
                            alt={review.userProfile.displayName}
                        />
                        <p className="d-inline-block">{review.userProfile.displayName}</p>
                    </div>
                    <div className="col">
                        <p>{formatDate(review.publishDateTime)}</p>
                    </div>
                </div>
                <div>{review.content}</div>
                <div>
                    <ReviewReactions reviewReactions={reactionCounts} />
                </div>
            </div>

        </div>

    );
};

export default ReviewDetails;