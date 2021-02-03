import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
// import { Card } from "reactstrap";
// import ReviewReactions from "../components/reviews/ReviewReactions";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from '../providers/UserProfileProvider';

const ReviewDetails = () => {
    const { reviewId } = useParams();
    const [review, setReview] = useState();
    const { getToken } = useContext(UserProfileContext);
    const [pendingDelete, setPendingDelete] = useState(false);
    const history = useHistory();
    // const userId = localStorage.getItem("userProfileId");

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
                        alert("* Details page is not made yet *");
                        history.push("/explore")
                        return
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        setReview(data ? data.review : null);
                    }
                }));
    }, [reviewId]);

    if (!review) return null;

    return (
        <div>
            <div
                className="review-details__jumbo"
                style={{ backgroundImage: `url('${review.imageLocation}')` }}
            ></div>
            <div className="container">
                <h1>Review Details</h1>
                <h3>{review.nameOfProduct}</h3>
                <h5 className="text-danger">{review.category.name}</h5>
                <div className="row">
                    <div className="col">
                        {/* <img
                            src={review.userProfile.imageLocation}
                            alt={review.userProfile.displayName}
                        /> */}
                        <p className="d-inline-block">Review By: {review.userProfile.displayName}</p>
                    </div>
                    <div className="col">
                        <p>{formatDate(review.publishDateTime)}</p>
                    </div>

                    {
                        // If it's my review, show me edit/delete options
                        // !isAdmin() && review.userProfileId !== userId ? null : 
                        <ButtonGroup size="sm">
                            <Button className="btn btn-primary" onClick={e => history.push(`/review/edit/${reviewId}`)}>
                                Edit
                            </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={e => setPendingDelete(true)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    }
                </div>
                <div>{review.content}</div>
                {/* <div>
                    <ReviewReactions reviewReactions={reactionCounts} />
                </div> */}
            </div>

        </div>

    );
};

export default ReviewDetails;
