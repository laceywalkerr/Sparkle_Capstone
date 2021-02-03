import React, { useEffect, useState, useContext } from "react";
import {
    ListGroup,
    ListGroupItem,
    Input,
    InputGroup,
    Button,
} from "reactstrap";
import Review from "../components/Review";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ReviewManager = () => {
    const { getToken } = useContext(UserProfileContext);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");

    useEffect(() => {
        getCategories();

    }, []);

    const getCategories = () => {
        getToken().then((token) =>
            fetch(`/api/review`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((categories) => {
                    setCategories(categories);
                })
        );
    };

    const saveNewReview = () => {
        const reviewToAdd = { name: newReview };
        console.log(reviewToAdd);
        getToken().then((token) =>
            fetch("/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reviewToAdd),
            }).then(() => {
                setNewReview("");
                getReviews();
            })
        );
    };

    return (
        <div className="container mt-5">
            <h1>Review Management</h1>
            <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-8 col-md-6">
                    <ListGroup>
                        {reviews.map((review) => (
                            <ListGroupItem key={review.id}>
                                <Review review={review} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <div className="my-4">
                        <InputGroup>
                            <Input
                                onChange={(e) => setNewReview(e.target.value)}
                                value={newReview}
                                placeholder="Add a new Review"
                            />
                            <Button onClick={saveNewReview}>Save</Button>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewManager;
