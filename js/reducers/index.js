import { combineReducers } from 'redux';
import currentThreadID from './currentThreadID';
import messages from './messages';
import threads from './threads';

/**
 * State shape
 *
 * {
 *   currentThreadID,
 *   messages: {
 *     id: {
 *       id,
 *       threadID,
 *       threadName,
 *       authorName,
 *       text,
 *       timestamp,
 *       isRead
 *     }
 *   },
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

export default combineReducers({
  currentThreadID,
  messages,
  threads
});
