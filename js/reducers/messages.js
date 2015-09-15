import last from 'lodash/array/last';
import indexBy from 'lodash/collection/indexBy';
import cloneDeep from 'lodash/lang/cloneDeep';
import { ActionTypes } from '../constants/ChatConstants';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';

export default function messages(state = {}, action) {

  switch (action.type) {

    case ActionTypes.CLICK_THREAD: {
      let messages = cloneDeep(state);
      Object.keys(messages).forEach(id => {
        let message = messages[id];
        if (message.threadID === action.threadID) {
          message.isRead = true;
        }
      });
      return messages;
    }

    case ActionTypes.CREATE_MESSAGE: {
      return {
        ...state,
        [action.message.id]: action.message
      };
    }

    case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE: {
      let message = ChatMessageUtils.convertRawMessage(action.rawMessage);
      message.isRead = true;
      let updatedMessages = cloneDeep(state);
      delete updatedMessages[action.tempMessageID];
      updatedMessages[message.id] = message;
      return updatedMessages;
    }

    case ActionTypes.RECEIVE_RAW_MESSAGES: {
      let messages = cloneDeep(action.rawMessages);
      let lastThreadID = last(messages).threadID;
      for (let message of messages) {
        message.isRead = message.threadID === lastThreadID ? true : false;
        message.date = new Date(message.timestamp);
      }
      let messageDict = indexBy(messages, 'id');
      return {...state, ...messageDict};
    }

    default:
      return state;

  }

}
