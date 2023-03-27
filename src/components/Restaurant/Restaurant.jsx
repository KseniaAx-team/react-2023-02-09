import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { selectRestaurantById } from "../../store/entities/restaurant/selectors";
import { Tab } from "../Tab/Tab";
import styles from "./styles.module.css";

export const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, { restaurantId })
  );

  if (!restaurant) {
    return null;
  }

  const { name } = restaurant;

  return (
    <div>
      <h2>{name}</h2>
        <div className={styles.root}>
          <Tab to="menu" title="Menu" className={styles.restauranTab}/>
          <Tab to="reviews" title="Reviews" className={styles.restauranTab}/>
        </div>
      <Outlet />
    </div>
  );
};
