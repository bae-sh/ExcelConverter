import styled from 'styled-components';
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;
const Title = styled.div`
  width: 70%;
  margin-top: 100px;
`;
const Table = styled.table`
  width: 90%;
  border: 1px solid #cccccc;
  margin-top: 30px;
  margin-bottom: 100px;
`;
const Row = styled.tr`
  border: 1px solid #cccccc;
  &:first-child {
    & > th {
      padding: 10px;
      border: 1px solid #cccccc;
      background-color: #f9f9f9;
    }
  }
  & > td {
    :not(2) {
      padding: 20px;
      width: 100%;
      height: 100%;
    }
    text-align: center;
    border: 1px solid #cccccc;
    &:first-child {
      font-weight: 500;
    }
  }
`;
const SaveDiv = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    font-size: 18px;
    margin-top: 10px;
    margin-right: 20px;
  }
`;
const ImgBox = styled.div`
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const ImgBtn = styled.input`
  display: none;
`;
const LableForIgmBtn = styled.label`
  border: 1px solid #767676;
  border-radius: 5px;
  padding: 0px 3px;
  background-color: #efefef;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.textarea`
  text-align: center;
  resize: none;
  width: 100%;
`;
const PriceInput = styled.input`
  text-align: center;
  resize: none;
  width: 80%;
`;

export { Main, Title, Table, ImgBtn, LableForIgmBtn, Input, PriceInput, Row, SaveDiv, ImgBox };
