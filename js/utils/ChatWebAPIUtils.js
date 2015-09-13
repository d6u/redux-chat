/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import ChatServerActionCreators from '../actions/ChatServerActionCreators';

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

export default {

  getAllMessages() {
    // simulate retrieving data from a database
    let rawMessages = JSON.parse(localStorage.getItem('messages'));

    // simulate success callback
    ChatServerActionCreators.receiveAll(rawMessages);
  },

  createMessage(message, threadName) {
    // simulate writing to a database
    let rawMessages = JSON.parse(localStorage.getItem('messages'));
    let timestamp = Date.now();
    let id = 'm_' + timestamp;
    let threadID = message.threadID || ('t_' + Date.now());
    let createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    setTimeout(() => {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  }

};
