import React, { PropTypes } from 'react';

let ENTER_KEY_CODE = 13;

class MessageComposer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    );
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        this.props.actions.postNewMessage(text, this.props.threadID);
      }
      this.setState({text: ''});
    }
  }

};

MessageComposer.propTypes = {
  threadID: PropTypes.string.isRequired
};

export default MessageComposer;
