import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles/Breakpoints.conts";

export const StyledFloor = styled.div`
  &.floor {
    border-bottom: 2px solid var(--stone-gray);
    min-height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 6px 0;

    .lift-container {
      width: 100%;
      height: 100%;
      min-height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .floor-center {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;
    }

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      gap: 10px;
    }
  }
`;
