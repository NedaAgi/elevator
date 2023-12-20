import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles/Breakpoints.conts";

export const StyledCallButtons = styled.div`
  &.call-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 4px;

    .button {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: var(--deep-blue-sea);
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: var(--marine-blue);
      }

      &:active {
        background-color: var(--slate-gray-blue);
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

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      gap: 6px;

      .button {
        width: 22px;
        height: 22px;

        svg {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
`;
