import styled from "styled-components";

export const StyledArrowIndicator = styled.div`
  &.arrow-indicator {
    background-color: #e7e3e3;
    border-radius: 6px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 6px;
    width: max-content;
  }

  .arrow {
    color: #3a3535;
    width: 18px;
    height: 18px;

    &.down {
      rotate: 180deg;
    }
    &.active {
      color: #c5b043;
    }
  }
`;
