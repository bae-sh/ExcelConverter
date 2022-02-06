import { Link } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const NavBox = styled.div`
    width: 300px;
    height: 100px;
    margin-bottom: 25px;
    font-size: 25px;
    border-radius: 15px;
    border: 1px solid black;
    :hover {
        background-color: #efefef;
    }
    a {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const Home = () => {
    return (
        <Main>
            <NavBox>
                <Link to="/datasave">데이터 작성</Link>
            </NavBox>
            <NavBox>
                <Link to="/datalist">데이터 목록</Link>
            </NavBox>
        </Main>
    );
};

export default Home;
