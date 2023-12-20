import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles/Breakpoints.conts";

export const StyledBlock = styled.div`
  &.block {
    margin: 0 auto;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 800px;

    .lift-names {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
    }

    .floor-list {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: center;
    }

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      padding: 4px 10px;

      .lift-names {
        padding: 0 18px;
      }
    }
  }
`;
