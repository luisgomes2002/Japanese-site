import styled from "styled-components";

export const ModalArea = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;

  h1 {
    color: black;
  }

  img {
    width: 500px;
    height: 50px;
    object-fit: cover;
  }
`;

export const InfoModalUser = styled.div`
  display: flex;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;
