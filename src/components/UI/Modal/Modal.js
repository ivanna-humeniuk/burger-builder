import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.scss';


const modal = props => {

    //shouldComponentUpdate was changed by React.memo()

    // shouldComponentUpdate(nextProps, nextState, nextContext)
    // {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={styles.Modal}
                 style={{
                     transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'
                 }}
            >
                {props.children}
            </div>
        </>
    )

}

export default React.memo(
    modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);