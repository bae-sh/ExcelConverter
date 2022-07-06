import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataList } from '../routes/DataList';
import DataSave from '../routes/DataSave';
import Home from '../routes/Home';
import GlobalStyle from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/datalist" element={<DataList />}></Route>
            <Route path="/datasave" element={<DataSave />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
