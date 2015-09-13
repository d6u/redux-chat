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

import React from 'react';
import MessageStore from '../stores/MessageStore';
import ThreadListItem from '../components/ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';
import UnreadThreadStore from '../stores/UnreadThreadStore';

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

let ThreadSection = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  },

  render() {
    let threadListItems = this.state.threads.map(function(thread) {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    }, this);
    let unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;
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
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;
