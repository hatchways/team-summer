import React from 'react';

export const PageContext = React.createContext(null);

export const withPageContext = (Component) =>
  class WrappedComponent extends React.Component {
    render() {
      return (
        <PageContext.Consumer>
          {(contextProps) => <Component {...contextProps} {...this.props} />}
        </PageContext.Consumer>
      );
    }
  };
