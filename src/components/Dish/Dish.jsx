import React from "react";
import { SIZE } from "../../constants/size";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { BUTTON_VIEW_VARIANT } from "../Button/constants";

import styles from "./styles.module.css";
import { selectDishCount } from "../../store/cart/selectors";
import { selectDishById, selectDishesById } from "../../store/entities/dish/selectors";
import classNames from "classnames";

export const Dish = ({ dishId, className, type }) => {
  const dish = useSelector((state) => type ? selectDishesById(state, { dishId }): selectDishById(state, { dishId }));
  const count = useSelector((state) =>
    selectDishCount(state, { dishName: dish?.name })
  );
  const dispatch = useDispatch();
  const increment = () =>
    dispatch({ type: "incrementDish", payload: dish.name });
  const decrement = () =>
    dispatch({ type: "decrementDish", payload: dish.name });

  if (!dish) {
    return null;
  }

  const { name, price } = dish;

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.dish}>
        <div className={styles.title}>
          <span>{name}</span>-<span>{price}</span>
        </div>
        <div className={styles.actions}>
          <Button
            onClick={decrement}
            className={styles.action}
            size={SIZE.s}
            viewVariant={BUTTON_VIEW_VARIANT.secondary}
            disabled={count === 0}
          >
            <span className={styles.icon}>-</span>
          </Button>
          {count}
          <Button
            onClick={increment}
            className={styles.action}
            size={SIZE.s}
            viewVariant={BUTTON_VIEW_VARIANT.secondary}
            disabled={count === 6}
          >
            <span className={styles.icon}>+</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
