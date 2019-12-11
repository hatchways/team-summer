// These two containers are siblings in the DOM
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {modalContentStyle} from 'styles/modalStyles'
import {coverStyle} from 'styles/modalStyles'
const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    onContentClick = (e) => e.stopPropagation();

    render() {
        return ReactDOM.createPortal(
            <div 
                style={coverStyle} 
                onClick={this.props.handleClosePopup}>
                <div 
                    style={modalContentStyle} 
                    onClick={this.onContentClick}>
                    {this.props.children}
                </div>
            </div>,
            this.el,
        );
    }
}

export default Modal;