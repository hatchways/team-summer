import React from 'react';

export const ToastContext = React.createContext(null);

export default (Component) => (
  class WrappedComponent extends React.Component {
    render() {
      return (
        <ToastContext.Consumer>
          {(activateToast) => (
            <Component {...this.props} activateToast={activateToast}/>
          )}
        </ToastContext.Consumer>
      );
    }
  }
);