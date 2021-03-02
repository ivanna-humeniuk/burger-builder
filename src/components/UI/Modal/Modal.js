import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.scss';


class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      //  console.log('[Modal] DidUpdate')
    }

    render() {

        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={styles.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}
                >
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal