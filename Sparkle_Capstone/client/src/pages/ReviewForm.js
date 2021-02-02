import React, { useContext, useEffect, useState } from "react"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { useHistory, useParams } from "react-router-dom";

const ReviewForm = ({ editableReview }) => {

    const history = useHistory();
    const { reviewId } = useParams();
    const { getToken } = useContext(UserProfileContext)

    const [categories, setCategories] = useState([]);
    const [review, setReview] = useState("");

    const [loading, setLoading] = useState(true);

    const userId = +localStorage.getItem("userProfileId");

    useEffect(() => {
        if (editableReview) {
            // Attempting to get DatePicker to actually show date info
            // It doesn't like it even when I try to reformat it.
            if (editableReview.publishDateTime !== null) {
                const pubDate = editableReview.publishDateTime.split("T")[0]
                editableReview.publishDateTime = pubDate
            }
            setReview(editableReview)
        }
        getCategories()
    }, []);

    const getCategories = () => {
        getToken().then((token) =>
            fetch(`/api/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((categories) => {
                    setCategories(categories)
                    setLoading(false)
                })
        );
    };

    const addReview = submittedReview => {
        getToken().then(token =>
            fetch(`/api/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submittedReview)
            })
        )
            .then(res => {
                if (res.status === 200) {
                    alert(`Created ${review.nameOfProduct}!`)
                    return res.json();
                } else {
                    alert(`Error! Unable to submit review!`)
                    return
                }
            })
            .then(review => {
                if (!review) {
                    return
                } else {
                    history.push(`/review/${review.id}`)
                }
            })
    }

    const updateReview = updatedReview => {
        // getToken().then(token =>
        //     fetch(`/api/review/${reviewId}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify(updatedReview)
        //     }))
        //     .then(res => {
        //         if (res.status === 200) {
        //             alert(`Review is updated!`)
        //             return res.json();
        //         } else {
        //             toast.error(`Error! Unable to edit review!`)
        //             return
        //         }
        //     })
        //     .then(review => {
        //         // Depending on if we have a response, push to the new review
        //         if (!review) {
        //             return
        //         } else {
        //             history.push(`/review/${review.id}`)
        //         }
        //     })
    }

    const handleControlledInputChange = e => {
        const newReview = { ...review }
        newReview[e.target.name] = e.target.value
        setReview(newReview)
    }

    const constructNewReview = () => {
        if (!review.categoryId) {
            alert("Error! Must select a Category!")
            return
        }
        if (editableReview !== undefined) {
            updateReview({
                userId: editableReview.userId,
                id: editableReview.id,
                userId,
                nameOfProduct: review.nameOfProduct,
                content: review.content,
                categoryId: review.categoryId,
                imageLocation: review.imageLocation,
                publishDateTime: review.publishDateTime
            })
        } else {
            addReview({
                userId: userId,
                nameOfProduct: review.nameOfProduct,
                content: review.content,
                categoryId: +review.categoryId,
                imageLocation: review.imageLocation,
                publishDateTime: review.publishDateTime,
                IsApproved: true
            })
        }
    }

    const createReview = (e) => {
        e.preventDefault()
        constructNewReview()
    }

    if (!categories) {
        return null
    }

    return (
        <div className="container mt-5">
            <h1>{!editableReview ? "Create" : "Edit"} Review</h1>
            <form onSubmit={createReview}>
                <fieldset>
                    <label htmlFor="reviewTitle">Title: </label>
                    <input
                        onChange={handleControlledInputChange}
                        maxLength="255"
                        id="reviewTitle"
                        name="title"
                        defaultValue={review.title}
                        placeholder="Add The Name of the Product"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="reviewContent">Content: </label>
                    <textarea
                        onChange={handleControlledInputChange}
                        id="reviewContent"
                        name="content"
                        value={review.content}
                        maxLength="255"
                        placeholder="Add Review Content"
                        rows={3}
                        cols={40}
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="reviewCategories">Categories: </label>
                    <select
                        onChange={handleControlledInputChange}
                        id="reviewCategories"
                        name="categoryId"
                        value={review.categoryId}
                        required >
                        <option value="0">Choose a category</option>
                        {categories.map(c => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label html="reviewHeader">(Optional) Header Image URL: </label>
                    <input
                        onChange={handleControlledInputChange}
                        id="reviewHeader"
                        name="imageLocation"
                        defaultValue={review.imageLocation}
                        placeholder="Add image URL"
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="PublishDateTime">(Optional) Publication Date</label>
                    <input
                        onChange={handleControlledInputChange}
                        type="date"
                        id="reviewDate"
                        name="publishDateTime"
                        defaultValue={review.publishDateTime}
                        placeholder=""></input>
                </fieldset>
                <button type="submit" disabled={loading}>Submit</button>
                {!editableReview ? null : <button onClick={e => history.push(`/review/${reviewId}`)}>Cancel</button>}
            </form>
        </div>
    )
}

export default ReviewForm