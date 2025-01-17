import React, { useContext, useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryId, setCategotyId] = useState(0);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности (Убыв)',
  //   sortProperty: 'rating',
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://678591491ec630ca33a913f9.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .catch((err) => {
        console.warn('Ошибка:', err);
        setItems([]);
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      })
      .finally(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
