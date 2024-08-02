import PropTypes from 'prop-types';
import { useState } from 'react';
import './HamburguerButton.css';

const HamburgerButton = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) onClick();
  };

  return (
    <div
      className={`relative z-40 ${isActive ? 'open' : ''}`}
      onClick={handleClick}
    >
      <div className={`hamburger ${isActive ? 'active' : ''}`}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
};

HamburgerButton.propTypes = {
  onClick: PropTypes.func,
};

export default HamburgerButton;
