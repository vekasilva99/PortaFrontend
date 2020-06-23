import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdStar } from "react-icons/md";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RATE_DRIVER } from "../helpers/graphql/mutations/index";
import { useMutation } from "@apollo/react-hooks";

export default function StarRating(props) {
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(null);

  const [rate, { data: dataR, error: errorR, loading: loadingR }] = useMutation(
    RATE_DRIVER
  );

  let { id } = useParams();
  console.log("id driver STAR: " + id);

  const { _id, name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  console.log("user: " + _id);

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
              onClick={async () => {
                setRating(ratingValue);
                const { RATE_DRIVER } = await rate({
                  variables: {
                    user: _id,
                    repartidor: id,
                    score: ratingValue,
                  },
                });
              }}
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
