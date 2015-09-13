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

import * as Actions from '../actions';
import React, { PropTypes } from 'react';

let ENTER_KEY_CODE = 13;

class MessageComposer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    );
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        Actions.createMessage(text, this.props.threadID);
      }
      this.setState({text: ''});
    }
  }

};

MessageComposer.propTypes = {
  threadID: PropTypes.string.isRequired
};

export default MessageComposer;
