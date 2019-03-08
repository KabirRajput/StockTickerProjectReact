import React from "react";

const Card = props => {
  const { quote, acquisitionPrice } = props;
  return (
    <div>
      <p>
        <strong>{quote}</strong>: {acquisitionPrice}
      </p>
    </div>
  );
};

export default Card;
