import { ActionTypes } from './constants/ChatConstants';
import * as ChatExampleDataServer from './ChatExampleDataServer';
import * as ChatMessageUtils from './utils/ChatMessageUtils';

export function clickThread(threadID) {
  return {
    type: ActionTypes.CLICK_THREAD,
    threadID: threadID
  };
}

export function createMessage(message) {
  return {
    type: ActionTypes.CREATE_MESSAGE,
    message
  };
}

export function receiveCreatedMessage(createdMessage, tempMessageID) {
  return {
    type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
    rawMessage: createdMessage,
    tempMessageID
  };
}

export function requestRawMessages() {
  return {
    type: ActionTypes.RAW_MESSAGES_REQUEST
  };
}

export function receiveAll(rawMessages) {
  return {
    type: ActionTypes.RECEIVE_RAW_MESSAGES,
    rawMessages: rawMessages
  };
}

export function getAllMessages() {
  return dispatch => {
    dispatch(requestRawMessages());
    ChatExampleDataServer.getMessages(messages => {
      dispatch(receiveAll(messages));
    });
  };
}

export function postNewMessage(text, currentThreadID) {
  return dispatch => {
    let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    dispatch(createMessage(message));
    ChatExampleDataServer.postMessage(message, createdMessage => {
      dispatch(receiveCreatedMessage(createdMessage, message.id));
    });
  }
}
