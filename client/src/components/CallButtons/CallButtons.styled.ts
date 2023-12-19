import styled from "styled-components";

export const StyledCallButtons = styled.div`
  &.call-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 4px;
  }

  .button {
    border-radius: 50%;
    width: 28px;
    height: 28px;
    background-color: #2c61a0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #335b8b;
    }

    &:active {
      background-color: #4e74a1;
    }

    svg {
      width: 12px;
      height: 12px;
    }

    &.down {
      svg {
        rotate: 180deg;
      }
    }
  }
`;
