import { ActionTypes } from './constants/ChatConstants';
import * as ChatExampleDataServer from './ChatExampleDataServer';

export function clickThread(threadID) {
  return {
    type: ActionTypes.CLICK_THREAD,
    threadID: threadID
  };
}

export function createMessage(text, currentThreadID) {
  return {
    type: ActionTypes.CREATE_MESSAGE,
    text: text,
    currentThreadID: currentThreadID
  };
}

export function receiveCreatedMessage(createdMessage) {
  return {
    type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
    rawMessage: createdMessage
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
    dispatch(createMessage(text, currentThreadID));
    // ChatExampleDataServer.postMessage({text, currentThreadID})
  }
}
