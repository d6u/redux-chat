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

import ChatThreadActionCreators from '../actions/ChatThreadActionCreators';
import React from 'react';
import classNames from 'classnames';

let ReactPropTypes = React.PropTypes;

let ThreadListItem = React.createClass({

  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
  },

  render() {
    let thread = this.props.thread;
    let lastMessage = thread.lastMessage;
    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick}>
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },

  _onClick() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }

});

export default ThreadListItem;
