import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorBox, Form, Header, InputBox, LogginButton, LoginBox, Main } from './style';

const Login = ({ setIsLoggedIn }) => {
  const [account, setAccount] = useState({ id: '', pw: '' });
  const [errorName, setErrorName] = useState('');
  const { register, handleSubmit } = useForm();
  const onChange = e => {
    console.log(account);
    setAccount(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onSubmitAccount = async () => {
    const { id, pw } = account;
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, id, pw)
        .then(userCredential => {
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/invalid-email') {
            setErrorName('이메일 형식이 올바르지 않습니다.');
          } else if (error.code === 'auth/internal-error') {
            setErrorName('정보를 모두 입력해 주세요.');
          } else if (error.code === 'auth/wrong-password') {
            setErrorName('비밀번호가 올바르지 않습니다.');
          } else if (error.code === 'auth/user-not-found') {
            setErrorName('존재하지 않는 이메일 입니다.');
          }
        });
    } catch (error) {
      //실패하면 throw new Error("") 값 출력
      window.alert(error);
    }
  };
  return (
    <Main>
      <Header>루시아이(LUXIAI)</Header>
      <Form onSubmit={handleSubmit(onSubmitAccount)}>
        <LoginBox>
          <span>아이디</span>
          <InputBox {...register('id', { required: true })} name="id" onChange={onChange} />
        </LoginBox>
        <LoginBox>
          <span>비밀번호</span>
          <InputBox
            {...register('pw', { required: true })}
            name="pw"
            onChange={onChange}
            type="password"
          />
        </LoginBox>
        <ErrorBox>{errorName}</ErrorBox>
        <LogginButton type="submit" value="로그인"></LogginButton>
      </Form>
    </Main>
  );
};

export default Login;
