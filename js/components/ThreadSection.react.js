import React, { Component } from 'react';
import ThreadListItem from '../components/ThreadListItem.react';

export default class ThreadSection extends Component {

  render() {
    let unreadCount = 0;

    let threadListItems = Object.keys(this.props.threads).map(id => {
      let thread = this.props.threads[id];
      let lastMessage = this.props.messages[thread.lastMessage];
      if (!lastMessage.isRead) {
        unreadCount += 1;
      }
      return (
        <ThreadListItem
          key={id}
          thread={thread}
          lastMessage={lastMessage}
          currentThreadID={this.props.currentThreadID}
          actions={this.props.actions}
        />
      );
    });

    let unread =
      unreadCount === 0 ? null : <span>Unread threads: {unreadCount}</span>;
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
      </div>
    );
  }

};
