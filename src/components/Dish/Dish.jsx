import React, { useState } from 'react'
import { Button } from '../Button/Button';
import { Ingredients } from '../Ingredients/Ingredients';

const MAX_COUNT = 6;
const MIN_COUNT = 0;

export const Dish = ({dish}) => {
    let [count, setCount] = useState(0);
    const {name, price, ingredients} = dish;

    const increaseCount = () => {
        setCount(++count);
    }
    const decreaseCount = () => {
        setCount(--count);
    }

    return (
        <>        
            <h3>{`Dish name: ${name}`}</h3>
            <h2>{`Price: ${price}$`}</h2>
            {
                count > 0 ?
                    <Ingredients ingredients={ingredients}/>
                : null
            }
            
            <Button children="-" onClick={decreaseCount} disabled={count === MIN_COUNT}/>
                {count}
            <Button children="+" onClick={increaseCount} disabled={count === MAX_COUNT}/>
        </>

    )
}
