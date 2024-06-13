import styled from "styled-components";

export const StyledResult = styled.div`
  width: 100%;
  height: 180px;
  overflow-y: scroll;

  @media (min-height: 500px) {
    height: 300px;
    overflow-y: scroll;
  }

  @media (min-height: 600px) {
    height: auto;
    overflow-y: auto;
  }

  #resultContainer {
    display: flex;
    justify-content: space-between;
    gap: 0; /* 아이템 간의 간격 */
    list-style-type: none; /* 리스트 스타일 제거 */
    padding: 0;
    margin: 0;
  }

  #resultContainer > ul {
    display: flex;
    flex-grow: 1;
    border-left: 1px solid #12121210;
    border-right: 1px solid #12121210;
    flex-direction: column;
    align-items: center;
  }


  #resultContainer button {
    display: flex;
    flex-wrap: nowrap;
    cursor: auto;

    margin: 2px 0 2px 0;
    padding: 0 6px 0 0;
    flex-direction: row;
    align-items: center;

    border-radius: 100px;
    outline: none;
    border: 2px solid #e2e8f000;
    background-color: #e2e8f090;
    gap: 4px;

    font-size: 14px;
  }

  #resultContainer button img {
    width: 16px;
    height: 16px;
  }

  #resultContainer h3 {
    font-weight: bold;
    border-bottom: 2px solid #00000090;
    margin-bottom: 4px;
  }

  #resultContainer ul:first-child > h3, #resultContainer ul:last-child > h3 {
    border-bottom: 2px solid #ff1212;
  }

  #resultContainer ul:first-child, #resultContainer ul:last-child {
    color: #ff1212;
  }

  #resultContainer ul:first-child button, #resultContainer ul:last-child button {
    color: #ff1212;
    border: 2px solid #e2e8f000;
    background-color: #e2e8f090;
  }
`