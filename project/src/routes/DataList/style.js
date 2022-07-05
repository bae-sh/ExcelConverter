import styled from 'styled-components';
const Main = styled.div`
  display: ${({ running }) => (running ? 'none' : 'flex')};
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
  margin-top: 330px;
  margin-bottom: 100px;
  z-index: 0;
`;
const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
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
const Input = styled.textarea`
  text-align: center;
  resize: none;
  width: 100%;
  :read-only {
    background-color: white;
    border: none;
    outline: none;
    cursor: auto;
  }
`;
const InputCost = styled(Input)`
  width: 100px;
`;
const PriceInput = styled.input`
  text-align: center;
  resize: none;
  width: 80%;
  :read-only {
    background-color: white;
    border: none;
    outline: none;
    cursor: auto;
  }
`;
const ExchangeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  div {
    width: 50%;
    text-align: center;
  }
  div:nth-child(1) {
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
`;
const RateSpan = styled.span`
  font-size: 12px;
`;
const SettingBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  label {
    margin-right: 10px;
  }
  input {
    text-align: center;
  }
`;
const ModalHeader = styled.div`
  img {
    width: 150px;
    height: 150px;
  }
  p {
    font-size: 20px;
  }
`;
const ModalLabel = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 16px;
  }
  input {
    width: 80px;
    text-align: center;
    margin: 0 5px;
  }
  button {
    margin-right: 10px;
  }
`;
const Spinner = styled.div`
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  position: absolute;
  opacity: 0.8;
  z-index: 100;
  display: ${({ running }) => (running ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 80px;
`;

export {
  Main,
  Title,
  Table,
  Header,
  Row,
  SaveDiv,
  ImgBox,
  Input,
  InputCost,
  PriceInput,
  ExchangeBox,
  RateSpan,
  SettingBox,
  ModalHeader,
  ModalLabel,
  Spinner,
};
