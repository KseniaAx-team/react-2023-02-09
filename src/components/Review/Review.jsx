import React from "react";

import styles from "./styles.module.css"

export const Review = ({ review }) => {
  if (!review) {
    return null;
  }

  const { user, text, rating } = review;
  return (
    <div className={styles.root}>
      <div>{user}</div>
      <div>{text}</div>
      <div>{rating}</div>
    </div>
  );
};
