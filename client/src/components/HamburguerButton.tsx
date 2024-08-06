import React, { useState } from "react";
import PropTypes from "prop-types";
import "./HamburguerButton.css";

interface HamburgerButtonProps {
  onClick?: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) onClick();
  };

  return (
    <div
      className={`relative z-40 ${isActive ? "open" : ""}`}
      onClick={handleClick}
    >
      <div className={`hamburger ${isActive ? "active" : ""}`}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

HamburgerButton.propTypes = {
  onClick: PropTypes.func,
};

export default HamburgerButton;
