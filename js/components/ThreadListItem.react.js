import * as Actions from '../actions';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

class ThreadListItem extends React.Component {

  render() {
    let thread = this.props.thread;
    let lastMessage = this.props.lastMessage;

    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick.bind(this)}>
        <h5 className="thread-name">{thread.threadName}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  }

  _onClick() {
    this.props.actions.clickThread(this.props.thread.id);
  }

};

ThreadListItem.propTypes = {
  thread: PropTypes.object.isRequired,
  lastMessage: PropTypes.object.isRequired,
  currentThreadID: PropTypes.string.isRequired
};

export default ThreadListItem;
