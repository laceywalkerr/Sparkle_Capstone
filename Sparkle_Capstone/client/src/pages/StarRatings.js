import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function StarRating({ count, value,
    inactiveColor = '#ddd',
    size = 24,
    activeColor = '#f00', onChange, review }) {

    const stars = Array.from({ length: count }, () => '🟊')

    const handleChange = (value) => {
        onChange(value + 1);
        review = value + 1
    }

    return (
        <div>
            {stars.map((s, index) => {
                let style = inactiveColor;
                if (index < value) {
                    style = activeColor;
                }
                return (
                    <span className={"star"}
                        key={index}
                        style={{ color: style, width: size, height: size, fontSize: size }}
                        onClick={() => handleChange(index)}>{s}</span>
                )
            })}
            {value}
        </div>
    )
}


function StarRatingSystem({ review }) {
    const [rating, setRating] = useState(3);
    // const [review, setReview] = useState("");

    const handleChange = (value) => {
        debugger
        review.rating = value
        setRating(value);
    }
    return (
        <div>
            <StarRating
                review={review}
                count={5}
                size={40}
                value={rating}
                activeColor={'red'}
                inactiveColor={'#ddd'}
                onChange={handleChange} />
        </div>
    )
}

const rootElement = document.querySelector("#root");
ReactDOM.render(<StarRatingSystem />, rootElement);

export default StarRatingSystem


