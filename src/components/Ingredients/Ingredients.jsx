import React from 'react'

export const Ingredients = ({ingredients}) => {
  return (
    <>
      <h3>Ingredients:</h3>
      <div>
        <ul>
            {
              ingredients.map((ingredient) => !!ingredient && <li>{ingredient}</li>)
            }
        </ul>
      </div>
    </>
  )     
}
