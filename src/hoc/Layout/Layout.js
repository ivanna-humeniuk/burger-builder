import React, {useState} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

import styles from './Layout.module.scss'

const Layout = (props) => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
        <>
            <Toolbar
                isAuth={props.isAuthenticated}
                toggle={sideDrawerToggleHandler}/>
            <SideDraw
                open={sideDrawerIsVisible}
                closed={sideDrawerCloseHandler}/>
            <main className={styles.content}>
                {props.children}
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);