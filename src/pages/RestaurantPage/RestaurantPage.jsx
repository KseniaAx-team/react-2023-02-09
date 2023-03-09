import React, { useState } from "react";
import { Cart } from "../../components/Cart/Cart";
import { Restaurant } from "../../components/Restaurant/Restaurant";
import { Tabs } from "../../components/Tabs/Tabs";
import { transformRestaurantsToTabs } from "../../utils/transformRestaurantsToTabs";

export const RestaurantPage = ({ restaurants }) => {
  const [activeRestaurantIndex, setActiveRestaurantIndex] = useState(0);
  const activeRestaurant = restaurants[activeRestaurantIndex];

  if (!activeRestaurant) {
    return null;
  }

  return (
    <div>
      <Tabs
        tabs={transformRestaurantsToTabs(restaurants)}
        activeIndex={activeRestaurantIndex}
        onTabClick={setActiveRestaurantIndex}
      />
      <Restaurant restaurant={activeRestaurant} />
      <Cart />
    </div>
  );
};
