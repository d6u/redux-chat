import last from 'lodash/array/last';
import { ActionTypes } from '../constants/ChatConstants';

export default function currentThreadID(state = null, action) {
  switch (action.type) {
    case ActionTypes.CLICK_THREAD:
      return action.threadID;
    case ActionTypes.RECEIVE_RAW_MESSAGES:
      return last(action.rawMessages).threadID;
    default:
      return state;
  }
}
