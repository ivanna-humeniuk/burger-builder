import React from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

import styles from './Layout.module.scss'

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggle={this.sideDrawerToggleHandler}/>
                <SideDraw
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);