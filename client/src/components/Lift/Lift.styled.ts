import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles/Breakpoints.conts";

export const StyledLift = styled.div`
  &.lift {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    padding: 6px;
    width: 100%;
    height: 100%;
    min-height: 80px;
    background-color: var(--silver-stone);
    border-radius: 4px;
    animation: fadeIn 0.5s ease-in-out;

    &.free {
      background-color: var(--forest-green);
    }

    &.alert {
      background-color: var(--amber-bronze);
    }

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: 4px;

      .hide-on-mobile {
        display: none;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
