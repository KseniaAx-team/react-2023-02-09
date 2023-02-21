import React from "react";

export const Menu = ({ menu }) => {
  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {menu.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};
