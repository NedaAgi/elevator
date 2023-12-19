import styled from "styled-components";

export const StyledLift = styled.div`
  &.lift {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin: 20px 0;
    width: 100%;
    height: 80px;
    background-color: #d9d9d9;
    border-radius: 4px;

    &.free {
      background-color: #418748;
    }

    &.alert {
      background-color: #a46f21;
    }

    @media (max-width: 480px) {
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: 4px;

      .hide-on-mobile {
        display: none;
      }
    }
  }
`;
