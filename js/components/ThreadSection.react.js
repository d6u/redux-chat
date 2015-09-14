import React, { Component } from 'react';
import ThreadListItem from '../components/ThreadListItem.react';

export default class ThreadSection extends Component {

  render() {
    let threadListItems = Object.keys(this.props.threads).map(id => {
      let thread = this.props.threads[id];
      return (
        <ThreadListItem
          key={id}
          thread={thread}
          lastMessage={this.props.messages[thread.lastMessage]}
          currentThreadID={this.props.currentThreadID}
        />
      );
    });

    let unread =
      this.props.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.props.unreadCount}</span>;
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
