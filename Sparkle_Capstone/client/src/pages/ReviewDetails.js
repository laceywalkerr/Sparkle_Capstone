import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Jumbotron,
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
    let userId = localStorage.getItem("userProfile");
    userId = JSON.parse(userId);

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
            <Jumbotron
                className="review-details__jumbo"
                style={{ backgroundImage: `url('${review.imageLocation}')` }}
            ></Jumbotron>
            <div className="container">
                <h1>Review Details</h1>
                <h3>{review.nameOfProduct}</h3>
                <h5 className="text-danger">{review.category.name}</h5>
                <div className="row">
                    <div className="col">
                        <p className="d-inline-block">Review By: {review.userProfile.displayName}</p>
                    </div>
                    <div className="col">
                        <p>{formatDate(review.publishDateTime)}</p>
                    </div>
                    <div>
                        Star Rating: {review.rating}
                    </div>

                    {
                        // If it's my review, show me edit/delete options
                        review.userProfile.id !== userId.id ? null :
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

            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete Review: {review.nameOfProduct}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this review? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button onClick={e => {
                        getToken().then(token =>
                            fetch(`/api/review/${review.id}`, {
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }).then(res => {
                                if (res.status === 204) {
                                    alert("review deleted!")
                                    history.push("/explore")
                                } else {
                                    alert("Error! Unable to delete review!")
                                }
                            }))
                    }}
                        className="btn btn-outline-danger">Yes, Delete</Button>
                </ModalFooter>
            </Modal>


        </div>

    );
};

export default ReviewDetails;
