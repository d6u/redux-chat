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

import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtils';
import {EventEmitter} from 'events';
import ThreadStore from '../stores/ThreadStore';
import assign from 'object-assign';

let ActionTypes = ChatConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _messages = {};

function _addMessages(rawMessages) {
  rawMessages.forEach(message => {
    if (!_messages[message.id]) {
      _messages[message.id] = ChatMessageUtils.convertRawMessage(
        message,
        ThreadStore.getCurrentID()
      );
    }
  });
}

function _markAllInThreadRead(threadID) {
  for (let id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

let MessageStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get(id) {
    return _messages[id];
  },

  getAll() {
    return _messages;
  },

  /**
   * @param {string} threadID
   */
  getAllForThread(threadID) {
    let threadMessages = [];
    for (let id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  },

  getAllForCurrentThread() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }

});

MessageStore.dispatchToken = ChatAppDispatcher.register(action => {

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    case ActionTypes.CREATE_MESSAGE:
      let message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      _messages[message.id] = message;
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default MessageStore;
