import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://678591491ec630ca33a913f9.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        navigate('/');
        console.log(error);
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return 'Загрузка...';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4> {pizza.price} p</h4>
    </div>
  );
};

export default FullPizza;
