import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataList } from '../routes/DataList';
import DataSave from '../routes/DataSave';
import Home from '../routes/Home';
import GlobalStyle from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { authService } from '../firebase';
import Login from '../routes/Login';

function App() {
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home />}></Route>
                <Route path="/datalist" element={<DataList />}></Route>
                <Route path="/datasave" element={<DataSave />}></Route>
              </>
            ) : (
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
            )}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
