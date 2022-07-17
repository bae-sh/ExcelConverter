import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
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
    text-align: center;
    border: 1px solid #cccccc;
    &:first-child {
      font-weight: 500;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
`;

const NumberInput = styled.input`
  font-size: 43px;
  height: 52px;
  width: 400px;
`;

const Title = styled.div`
  width: 70%;
  margin-top: 100px;
`;

export { Main, Table, Row, Header, NumberInput, Title };
