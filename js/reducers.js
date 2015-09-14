import last      from 'lodash/array/last';
import groupBy   from 'lodash/collection/groupBy';
import pluck     from 'lodash/collection/pluck';
import indexBy   from 'lodash/collection/indexBy';
import cloneDeep from 'lodash/lang/cloneDeep';
import get       from 'lodash/object/get';

import { combineReducers, applyMiddleware } from 'redux';
import { ActionTypes } from './constants/ChatConstants';
import { getMessages } from './ChatExampleDataServer';
import ChatMessageUtils from './utils/ChatMessageUtils';

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
  case ActionTypes.RECEIVE_RAW_MESSAGES:
    let messages = cloneDeep(action.rawMessages);
    for (let message of messages) {
      message.isRead = false;
      message.date = new Date(message.timestamp);
    }
    return indexBy(messages, 'id');
  // case ActionTypes.CREATE_MESSAGE:
  //   let messages = cloneDeep(state);
  //   let {text, currentThreadID} = action;
  //   let msg = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  //   msg.isRead = true;
  //   messages.push(msg);
  //   return messages;
  default:
    return state;
  }
}

function threads(state = {}, action) {
  switch (action.type) {
  case ActionTypes.RECEIVE_RAW_MESSAGES:
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
  // case ActionTypes.CREATE_MESSAGE:
  default:
    return state;
  }
}

export default combineReducers({
  currentThreadID,
  messages,
  threads
});
