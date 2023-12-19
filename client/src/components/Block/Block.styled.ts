import styled from "styled-components";

export const StyledBlock = styled.div`
  &.block {
    margin: 0 auto;
    padding: 10px 40px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 480px) {
      padding: 4px 10px;
    }
  }
`;
