import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdStar } from "react-icons/md";

export default function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <RatingStyle>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              className="rating"
              type="radio"
              name="rate"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            ></input>
            <MdStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#00507a" : "#202124"}
              size="2em"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </RatingStyle>
  );
}
const RatingStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5vw;
  .rating {
    display: none;
  }
  .star {
    cursor: pointer;
    transition: color 200ms;
  }
`;
