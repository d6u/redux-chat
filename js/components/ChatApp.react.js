import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';

class ChatApp extends Component {

  render() {
    const { threads, messages, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
        // <MessageSection actions={actions} />
    return (
      <div className="chatapp">
        <ThreadSection threads={threads} messages={messages} actions={actions} />
      </div>
    );
  }

};

ChatApp.propTypes = {
  threads: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    threads: state.threads,
    messages: state.messages
  };
}

export default connect(mapStateToProps)(ChatApp);
