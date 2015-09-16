import last from 'lodash/array/last';
import indexBy from 'lodash/collection/indexBy';
import { compose } from 'redux';
import u from 'updeep';
import { ActionTypes } from '../constants/ChatConstants';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';

export default function messages(state = {}, action) {

  switch (action.type) {

    case ActionTypes.CLICK_THREAD: {
      let markRead = u({isRead: true});
      return u(
        u.map(m => m.threadID === action.threadID ? markRead(m) : m),
        state);
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
      return compose(
        u({[message.id]: message}),
        u(u.omit(action.tempMessageID))
      )(state);
    }

    case ActionTypes.RECEIVE_RAW_MESSAGES: {
      let lastThreadID = last(action.rawMessages).threadID;
      let messages = indexBy(action.rawMessages, 'id');
      let formatMessage = u.map(message => u({
        isRead: message.threadID === lastThreadID,
        date: new Date(message.timestamp)
      }, message));
      let updated = u(formatMessage, messages);
      return {...state, ...updated};
    }

    default:
      return state;

  }

}
