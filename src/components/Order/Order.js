import React from 'react';

import styles from './Order.module.scss'

const order = (props) => {
    const ingredients = [];

    for (let key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }

    const ingredientOutput = ingredients.map(ing => {
        return (
            <span
                key={ing.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >{ing.name}({ing.amount})</span>
        )
    })

    return (
        <div className={styles.Order}><p> Ingredients:{ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;