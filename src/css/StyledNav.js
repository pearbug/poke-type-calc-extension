import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  font-weight: 500;

  & a {
    text-decoration: none;
  }

  & a:visited {
    color: black; /* 방문한 링크 색상을 기본 링크 색상과 동일하게 설정 */
  }

  & a:hover {
    color: #4CAF50;
    font-weight: 600;
  }

  & a.active {
    color: #4CAF50;
    font-weight: 600;
  }
`