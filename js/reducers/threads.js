import last      from 'lodash/array/last';
import pull      from 'lodash/array/pull';
import groupBy   from 'lodash/collection/groupBy';
import pluck     from 'lodash/collection/pluck';
import cloneDeep from 'lodash/lang/cloneDeep';
import { ActionTypes } from '../constants/ChatConstants';

export default function threads(state = {}, action) {

  switch (action.type) {

    case ActionTypes.CREATE_MESSAGE: {
      let threads = cloneDeep(state);
      let message = action.message;
      let thread = threads[message.threadID];
      thread.lastMessage = message.id;
      thread.messages.push(message.id);
      return threads;
    }

    case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE: {
      let threads = cloneDeep(state);
      let message = action.rawMessage;
      let thread = threads[message.threadID];
      thread.lastMessage = message.id;
      thread.messages = pull(thread.messages, action.tempMessageID);
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
      return {...state, ...threads};
    }

    default:
      return state;
  }

}
