import ChatAppDispatcher from './dispatcher/ChatAppDispatcher';
import * as ChatWebAPIUtils from './utils/ChatWebAPIUtils';
import * as ChatMessageUtils from './utils/ChatMessageUtils';
import { ActionTypes } from './constants/ChatConstants';

export function createMessage(text, currentThreadID) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.CREATE_MESSAGE,
    text: text,
    currentThreadID: currentThreadID
  });
  let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  ChatWebAPIUtils.createMessage(message);
};

export function receiveAll(rawMessages) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_RAW_MESSAGES,
    rawMessages: rawMessages
  });
};

export function receiveCreatedMessage(createdMessage) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
    rawMessage: createdMessage
  });
};

export function clickThread(threadID) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.CLICK_THREAD,
    threadID: threadID
  });
};
