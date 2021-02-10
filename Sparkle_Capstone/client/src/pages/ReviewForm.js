import React, { useContext, useEffect, useState } from "react"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { useHistory, useParams } from "react-router-dom";
//photo stuff
import { storage } from '../firebase';
import { render } from "react-dom";
//photo stuff end

import StarRatingSystem from "../pages/StarRatings"

const ReviewForm = ({ editableReview }) => {

    const history = useHistory();
    const { reviewId } = useParams();
    const { getToken } = useContext(UserProfileContext)

    const [categories, setCategories] = useState([]);
    let [review, setReview] = useState("");

    const [loading, setLoading] = useState(true);

    //photo stuff 
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    //star stuff
    // const [rating, setRating] = useState(3);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log("hello:", url);
                        setUrl(url);
                        setImageUrl(url);
                        constructNewReview(url);
                    });
            }
        );
    };

    console.log("image: ", image);
    //photo stuff end

    let user = localStorage.getItem("userProfile");
    user = JSON.parse(user);

    useEffect(() => {
        if (editableReview) {
            if (editableReview.publishDateTime !== null) {
                const pubDate = editableReview.publishDateTime.split("T")[0]
                editableReview.publishDateTime = pubDate
            }
            setReview(editableReview)
        }
        getCategories();
    }, [image]);

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
                    console.log(categories);
                })
        );
    };

    const addReview = submittedReview => {
        debugger
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
        console.log("Form");
        getToken().then(token =>
            fetch(`/api/review/${reviewId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedReview)
            }))
            .then(res => {
                if (res.status === 200) {
                    alert(`Review is updated!`)
                    history.push(`/review/${review.id}`)
                } else {
                    alert(`Error! Unable to edit review!`)
                    return
                }
            })
    }

    const handleControlledInputChange = e => {
        const newReview = { ...review }
        newReview[e.target.name] = e.target.value
        setReview(newReview)
    }

    const constructNewReview = (url) => {
        if (!review.categoryId) {
            alert("Error! Must select a Category!")
            return
        }
        if (editableReview !== undefined) {
            updateReview({
                userProfileId: editableReview.userProfileId,
                id: editableReview.id,
                nameOfProduct: review.nameOfProduct,
                content: review.content,
                categoryId: review.categoryId,
                imageLocation: url,
                publishDateTime: review.publishDateTime,
                rating: review.rating
            })
        } else {
            addReview({
                userProfileId: user.id,
                nameOfProduct: review.nameOfProduct,
                content: review.content,
                categoryId: review.categoryId,
                imageLocation: url,
                publishDateTime: review.publishDateTime,
                rating: review.rating,
                IsApproved: true
            })
        }
    }

    const createReview = (e) => {
        e.preventDefault()
        handleUpload()

    }

    if (!categories) {
        return null
    }

    return (
        <div className="container mt-5">
            <h1>{!editableReview ? "Create" : "Edit"} Review</h1>
            <form onSubmit={createReview}>
                <fieldset>
                    <label htmlFor="reviewTitle">Product Name: </label>
                    <input
                        onChange={handleControlledInputChange}
                        maxLength="255"
                        id="reviewTitle"
                        name="nameOfProduct"
                        defaultValue={review.nameOfProduct}
                        placeholder="Name of the Product"
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
                <div>
                    Please upload a review photo!
                    <br />
                    <input type="file" onChange={handleChange} />
                    <br />
                    {review.imageLocation ? null : url}
                </div>
                <div>
                    {/* <div>
                        <StarRatingSystem
                            count={5}
                            size={40}
                            value={review.rating}
                            activeColor={'red'}
                            inactiveColor={'#ddd'}
                            onChange={handleChange} />
                    </div> */}
                    <StarRatingSystem review={review} />
                </div>
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