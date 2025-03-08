import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Home from './pages/Home';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
// import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

// export const SearchContext = createContext('');

function App() {
  //const pathname = window.location.pathname;
  // const [searchValue, setSearchValue] = useState('');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />{' '}
            </Suspense>
          }
        />
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
