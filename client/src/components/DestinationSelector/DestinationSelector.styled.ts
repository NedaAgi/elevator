import styled from "styled-components";

export const StyledDestinationSelector = styled.div`
  &.destination-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .destination-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c61a0;
    color: #e7e3e3;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #335b8b;
    }

    &:active {
      background-color: #4e74a1;
    }
  }
`;
