import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles/Breakpoints.conts";

export const StyledArrowIndicator = styled.div`
  &.arrow-indicator {
    background-color: var(--pearl-white);
    border-radius: 6px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 6px;
    width: max-content;

    .arrow {
      color: var(--charcoal-grey);
      width: 18px;
      height: 18px;

      &.down {
        rotate: 180deg;
      }
      &.active {
        color: var(--golden-leaf);
      }
    }

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      padding: 6px 10px;

      .arrow {
        width: 12px;
        height: 12px;
      }
    }
  }
`;
