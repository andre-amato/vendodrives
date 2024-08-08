import { Link } from "react-router-dom";
import React from "react";

interface CarDetails {
  _id: string;
  title?: string;
  price?: string | number;
  zipCode?: string;
  photo?: string;
}

interface CardProps {
  carDetails: CarDetails;
}

const Card: React.FC<CardProps> = ({ carDetails }) => {
  const { _id, title, price, zipCode, photo } = carDetails;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg m-4 bg-white">
      <Link to={`/car-details/${_id}`}>
        <img
          className="object-cover rounded-t-2xl"
          style={{ width: "400px", height: "400px" }}
          src={photo ? photo : "https://via.placeholder.com/400"}
          alt={title || "Sample Image"}
          data-cy="car-card"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title || "Card Title"}</div>
        <p className="text-gray-700 text-base">
          Price: {price ? `€${price}` : "N/A"}
        </p>
        <p className="text-gray-700 text-base">Zip Code: {zipCode || "N/A"}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #cheapcars
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Volkswagen
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Easy
        </span>
      </div>
    </div>
  );
};

export default Card;
