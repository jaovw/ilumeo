import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { ColaboradorProvider } from './context/ColaboradorContext';

function App() {
  return (
    <BrowserRouter>
      <ColaboradorProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </ColaboradorProvider>
    </BrowserRouter>
  );
}

export default App;
