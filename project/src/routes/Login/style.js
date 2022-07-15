import styled from 'styled-components';
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Header = styled.h1`
  font-size: 50px;
`;
const LoginBox = styled.div`
  width: 320px;
  height: 50px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputBox = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid gray;
`;
const LogginButton = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid gray;
  background-color: lightgray;

  :hover {
    cursor: pointer;
  }
  :active {
    opacity: 0.8;
  }
`;
const ErrorBox = styled.div`
  color: red;
  font-size: 20px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
export { Main, LoginBox, Header, InputBox, LogginButton, ErrorBox, Form };
