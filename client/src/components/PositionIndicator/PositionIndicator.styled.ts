import styled from "styled-components";

export const StyledPositionIndicator = styled.div`
  &.position-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 4px;
  }

  .disk {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--charcoal-gray);
    transition: background-color 0.2s ease-in-out;

    &.active {
      background-color: var(--golden-leaf);
    }
  }
`;
