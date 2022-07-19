import { Link } from 'react-router-dom';
import { Main, NavBox } from './style';

const Home = () => {
  return (
    <Main>
      <NavBox>
        <Link to="/datasave">데이터 작성</Link>
      </NavBox>
      <NavBox>
        <Link to="/datalist">데이터 목록</Link>
      </NavBox>
      {/* <NavBox>
        <Link to="/progress">수입화물 진행정보</Link>
      </NavBox> */}
    </Main>
  );
};

export default Home;
