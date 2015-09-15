import last      from 'lodash/array/last';
import groupBy   from 'lodash/collection/groupBy';
import pluck     from 'lodash/collection/pluck';
import indexBy   from 'lodash/collection/indexBy';
import cloneDeep from 'lodash/lang/cloneDeep';
import get       from 'lodash/object/get';

import { combineReducers } from 'redux';
import { ActionTypes } from './constants/ChatConstants';
import { getMessages } from './ChatExampleDataServer';
import * as ChatMessageUtils from './utils/ChatMessageUtils';

/**
 * State shape
 *
 * {
 *   currentThreadID,
 *   messages: [{
 *     id,
 *     threadID,
 *     threadName,
 *     authorName,
 *     text,
 *     timestamp,
 *     isRead
 *   }],
 *   threads: {
 *     id: {
 *       id,
 *       threadName,
 *       lastMessage,
 *       messages: [id],
 *     }
 *   }
 * }
 */

function currentThreadID(state = null, action) {
  switch (action.type) {
  case ActionTypes.CLICK_THREAD:
    return action.threadID;
  case ActionTypes.RECEIVE_RAW_MESSAGES:
    return last(action.rawMessages).threadID;
  default:
    return state;
  }
}

function messages(state = {}, action) {
  switch (action.type) {
  case ActionTypes.CLICK_THREAD: {
    let updatedMessages = cloneDeep(state);
    Object.keys(updatedMessages).forEach(id => {
      let message = updatedMessages[id];
      if (message.threadID === action.threadID) {
        message.isRead = true;
      }
    });
    return updatedMessages;
  }
  case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE: {
    let message = action.rawMessage;
    message.date = new Date(message.timestamp);
    message.isRead = true;
    let updatedMessages = cloneDeep(state);
    updatedMessages[message.id] = message;
    return updatedMessages;
  }
  case ActionTypes.RECEIVE_RAW_MESSAGES:
    let messages = cloneDeep(action.rawMessages);
    let lastMessageThreadID = last(action.rawMessages).threadID;
    for (let message of messages) {
      message.isRead = message.threadID === lastMessageThreadID ? true : false;
      message.date = new Date(message.timestamp);
    }
    return indexBy(messages, 'id');
  default:
    return state;
  }
}

function threads(state = {}, action) {
  switch (action.type) {
  case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE: {
    let threads = cloneDeep(state);
    let message = action.rawMessage;
    let thread = threads[message.threadID];
    thread.lastMessage = message.id;
    thread.messages.push(message.id);
    return threads;
  }
  case ActionTypes.RECEIVE_RAW_MESSAGES: {
    let threads = groupBy(action.rawMessages, 'threadID');
    Object.keys(threads).forEach(id => {
      let messages = threads[id];
      threads[id] = {
        id: id,
        threadName: messages[0].threadName,
        lastMessage: last(messages).id,
        messages: pluck(messages, 'id')
      };
    });
    return threads;
  }
  default:
    return state;
  }
}

export default combineReducers({
  currentThreadID,
  messages,
  threads
});
