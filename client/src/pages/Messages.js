import React from 'react';
import { Button } from '@material-ui/core';

import { withPageContext } from '../components/pageContext';
import { CustomOutlinedInput } from '../components/Inputs';

class Messages extends React.Component {
  state = {
    message: '',
    receivedMessage: ''
  };

  onSubmit = (event) => {
    const {socket} = this.props;

    socket.emit('message', this.state.message, {token: localStorage.getItem('jwtToken')})
  };

  render() {
    this.props.socket.on('newMessage', (value) => this.setState({receivedMessage: value}));

    return (
      <div>
        <div>{this.state.receivedMessage}</div>
        <CustomOutlinedInput
          name="message"
          value={this.state.message}
          label="Send Message"
          onChange={( event ) => this.setState({ message: event.target.value })}/>
        <Button onClick={this.onSubmit} variant="contained" color="primary">Send</Button>
      </div>
    );
  }
}

export default withPageContext(Messages)