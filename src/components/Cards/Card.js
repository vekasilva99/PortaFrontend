import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

export default function CardC(props) {
  let settings = {
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 734,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <StyledCard>
      <Slider {...settings}>
        {props.comments.map((comment) => (
          <div className="card">
            <FaQuoteLeft className="quote" color="#00507a" size="0.5em" />
            <h3>{comment.content}</h3>
          </div>
        ))}
      </Slider>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 50vw;
  height: auto;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);

  .slick-prev:before,
  .slick-next:before {
    color: #00507a !important;
  }

  .card {
    height: 15vh;
    margin: 2vh;
    width: 20vw !important;
    padding-top: 1vh;
    padding-left: 2vw;
    text-align: left;
    color: #202124;
    webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    border-radius: 0.2em;
    background: #fafafa;
  }

  .card > h3 {
    font-size: 0.9em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: flex;
    align-self: center;
  }

  @media only screen and (max-width: 734px) {
    width: 80vw;
    .card {
      height: 12vh;
      margin: 2vh;
      width: 70vw !important;
      padding-top: 1vh;
      padding-left: 2vw;
      text-align: left;
      color: #202124;
      webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      font-size: 1em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 300;
      border-radius: 0.2em;
    }

    .card > h3 {
      font-size: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 300;
      margin-left: 0.5em;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
      height: 4vh;
      width: auto;
      color: #202124;
      display: flex;
      align-self: center;
    }
  }

  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    width: 80vw;

    .card {
      height: 15vh;
      margin: 2vh;
      width: 35vw !important;
      padding-top: 1vh;
      padding-left: 2vw;
      text-align: left;
      color: #202124;
      webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
      font-size: 1em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 300;
      border-radius: 0.2em;
    }

    .card > h3 {
      font-size: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 300;
      margin-left: 0.5em;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
      height: 4vh;
      width: auto;
      color: #202124;
      display: flex;
      align-self: center;
    }
  }
`;
