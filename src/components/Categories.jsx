import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((catName, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => onChangeCategory(index)}
          >
            {catName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
