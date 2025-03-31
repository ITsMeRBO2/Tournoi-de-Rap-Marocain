import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">Loading
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black; /* Fond noir */
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 150px;
    height: 150px;
    background: transparent;
    border: 3px solid rgba(0, 255, 0, 0.1);
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #00ff00; /* Texte en vert */
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 10px #00ff00;
    box-shadow: 0 0 20px rgba(0, 255, 0, .15);
    position: relative;
  }

  .loader::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #00ff00; /* Bordure verte */
    border-right: 3px solid #00ff00;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }

  .loader span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }

  .loader span::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00ff00; /* Boule verte */
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px 5px #00ff00;
  }

  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;

export default Loader;
