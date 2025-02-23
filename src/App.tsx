import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

// export const SearchContext = createContext('');

function App() {
  //const pathname = window.location.pathname;
  // const [searchValue, setSearchValue] = useState('');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

/* <SearchContext.Provider
    value={{
      searchValue,
      setSearchValue,
    }}
  > 
</SearchContext.Provider> */
