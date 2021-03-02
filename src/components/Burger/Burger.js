import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import styles from './Burger.module.scss'

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])]
                .map((val, i) => {
                    return <BurgerIngredient key={igKey + '-' + i} type={igKey}/>
                })
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;