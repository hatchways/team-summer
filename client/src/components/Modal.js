// These two containers are siblings in the DOM
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

    modalContentStyle = {
        position: 'fixed',
        top: '0',
        left: '50%',
        zIndex: 777,
        width: '550px',
        marginLeft: '-275px'
    }

    coverStyle = {
        background: 'rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    onContentClick = (e) => e.stopPropagation();

    render() {
        return ReactDOM.createPortal(
            <div style={this.coverStyle} onClick={this.props.handleClosePopup}>
                <div style={this.modalContentStyle} onClick={this.onContentClick}>{this.props.children}</div>
            </div>,
            this.el,
        );
    }
}

export default Modal;