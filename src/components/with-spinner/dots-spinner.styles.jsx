import styled from 'styled-components';


export const DotsOverlay = styled.div`
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    font-size: 30px;
    letter-spacing: 10px;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
  `;