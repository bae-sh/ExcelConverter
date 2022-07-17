import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getNumber, saveNumber } from './firebaseFn';
import { Main, Table, Row } from './style';

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
const Progress = () => {
  const [change, setChange] = useState(false);
  const [number, setNumber] = useState('');

  const onClick = e => {
    setChange(prev => !prev);
    if (e.target.innerText === '변경') {
      const value = document.querySelector('#input').value;
      setNumber(value);
      saveNumber({ number: value });
    }
  };
  useEffect(() => {
    getNumber({ setNumber });
  }, []);
  return (
    <Main>
      <Header>
        <h1>M B/L - H B/L : {change || number}</h1>
        {change && <NumberInput id="input" />}

        <button onClick={onClick}>{change ? '변경' : '수정'}</button>
      </Header>
      <Table>
        <thead>
          <Row>
            <th>No</th>
            <th>처리단계</th>
            <th>처리일자</th>
          </Row>
        </thead>
        <tbody>
          <Row>
            <td>1</td>
            <td>반출신고</td>
            <td>2022-06-24 15:17:42</td>
          </Row>
        </tbody>
      </Table>
    </Main>
  );
};

export default Progress;
