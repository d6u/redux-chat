import last from 'lodash/array/last';
import groupBy from 'lodash/collection/groupBy';
import pluck from 'lodash/collection/pluck';
import u from 'updeep';
import { ActionTypes } from '../constants/ChatConstants';

export default function threads(state = {}, action) {

  switch (action.type) {

    case ActionTypes.CREATE_MESSAGE: {
      let message = action.message;
      return u({
        [message.threadID]: {
          lastMessage: message.id,
          messages: arr => arr.concat([message.id])
        }
      }, state);
    }

    case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE: {
      let {rawMessage: message, tempMessageID} = action;
      return u({
        [message.threadID]: {
          lastMessage: message.id,
          messages: arr =>
            u.reject(id => id === tempMessageID, arr).concat([message.id])
        }
      }, state);
    }

    case ActionTypes.RECEIVE_RAW_MESSAGES: {
      let threads = groupBy(action.rawMessages, 'threadID');
      let updated = u(
        u.map(messages => {
          return {
            id: messages[0].threadID,
            threadName: messages[0].threadName,
            lastMessage: last(messages).id,
            messages: pluck(messages, 'id')
          };
        }),
        threads);
      return {...state, ...updated};
    }

    default:
      return state;
  }

}
