import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 0 6px 6px 8px;
  font-weight: 500;

  img {
    height: 14px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
  }

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