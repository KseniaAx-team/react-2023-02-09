import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Dish } from '../../components/Dish/Dish';
import { selectDishesFilteredByName, selectIsDishLoading } from '../../store/entities/dish/selectors';
import { loadAllDishesIfNotExist } from '../../store/entities/dish/thunks/loadDishesIfNotExist';
import styles from "./styles.module.css";

export const DishesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsDishLoading);

  useEffect(() => {
    dispatch(loadAllDishesIfNotExist());
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dishSearchResult = useSelector((state) =>
    selectDishesFilteredByName(state, {
    searchValue: searchParams.get("search") || "",
  })
);


  return (
    <div className={styles.root}>
      <div className={styles.searchPanel}>
      <input
        value={searchParams.get("search") || ""}
        onChange={(event) => setSearchParams({ search: event.target.value })}
      />
      </div>
      <h3>
        Dishes
      </h3>

      <div className={styles.dishes}>
        {dishSearchResult?.map(({id}) => {
          return <Dish dishId={id} className={styles.dish} type="All"/>
        })}
      </div>
    </div>
  );
}
