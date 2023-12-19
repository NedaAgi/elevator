import styled from "styled-components";

export const StyledFloor = styled.div`
  &.floor {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    width: 100%;
    max-width: 800px;

    > div:last-child {
      border-bottom: 2px solid #827777;
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .lift-container {
      width: 100%;
    }

    .floor-number {
      font-size: 20px;
      font-weight: bold;
    }

    @media (max-width: 480px) {
      gap: 10px;

      > div:last-child {
        height: 200px;
        gap: 10px;
      }
    }
  }
`;
