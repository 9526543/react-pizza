import React, { useEffect, useRef } from 'react';

import qs from 'qs';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
// import { SearchContext } from '../App';

import {
  selectorFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectorFilter);
  const { items, status } = useSelector(selectPizzaData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { searchValue } = useContext(SearchContext);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const totalPages = 3;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем параметры URL и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
      getPizzas();
    }
  }, []);
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 🤔</h2>
          <p>
            Не удалось загрузить пиццы. <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {' '}
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={onChangePage}
      />
    </div>
  );
};

export default Home;

// const [categoryId, setCategotyId] = useState(0);
// const [sortType, setSortType] = useState({
//   name: 'популярности (Убыв)',
//   sortProperty: 'rating',
// });

//const [currentPage, setCurrentPage] = useState(1);

// const categoryId = useSelector((state) => state.filter.categoryId);
// const sortType = useSelector((state) => state.filter.sort.sortProperty);

// fetch(
//   `https://678591491ec630ca33a913f9.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
// )
//   .catch((err) => {
//     console.warn('Ошибка:', err);
//     setItems([]);
//   })
//   .then((res) => {
//     return res.json();
//   })
//   .then((json) => {
//     setItems(json);
//   })
//   .finally(() => setIsLoading(false));
// await axios
//   .get(
//     `https://678591491ec630ca33a913f9.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//   )
//   .then((response) => {
//     setItems(response.data);
//     setIsLoading(false);
//     setReqErr(false);
//   })
//   .catch((error) => {
//     setReqErr(true);
//     let errMsg = error.response
//       ? `Статус: ${error.response.status}, Данные: ${error.response.data}` // Ответ сервера содержит ошибку
//       : error.request
//       ? 'Нет ответа' // Ответ от сервера не получен
//       : `Ошибка настройки запроса: ${error.message}`; // Неправильная настройка запроса
//     console.error(`Axios столкнулся с препятствием: ${errMsg}`); // Подробности ошибки
//   });
