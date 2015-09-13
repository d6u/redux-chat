/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import MessageStore from '../stores/MessageStore';
import React from 'react';
import ThreadStore from '../stores/ThreadStore';

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

export default class MessageSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }

  componentDidMount() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange.bind(this));
    ThreadStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange.bind(this));
    ThreadStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let messageListItems = this.state.messages.map(getMessageListItem);
    if (this.state.thread) {
      return (
        <div className="message-section">
          <h3 className="message-thread-heading">{this.state.thread.name}</h3>
          <ul className="message-list" ref="messageList">
            {messageListItems}
          </ul>
          <MessageComposer threadID={this.state.thread.id}/>
        </div>
      );
    } else {
      return <div className="message-section"></div>;
    }
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let ul = this.refs.messageList;
    if (ul) {
      ul.scrollTop = ul.scrollHeight;
    }
  }

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

};
