import styled from "styled-components";

export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomSpinnerOverlay = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  height: 50px;
  width: 100%;
  padding: 8px;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${(props) => (props.size === "small" ? "30px" : "50px")};
  height: ${(props) => (props.size === "small" ? "30px" : "50px")};
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
