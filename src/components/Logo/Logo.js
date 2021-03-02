import React from "react";

import logoImg from '../../assets/images/burger-logo.png';
import styles from './Logo.module.scss'

const logo = () => (
    <div className={styles.Logo}>
        <img src={logoImg} alt='My Burger'/>
    </div>
)

export default logo;