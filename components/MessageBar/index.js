/** @jsx dom */
/* eslint-disable react/no-unknown-property */

import React from "react";
import { attributeGetter, dom } from "./helpers";

import "./index.css";

class MessageBarCE extends HTMLElement {
  connected = false;
  attrs = new Proxy(this, attributeGetter);

  connectedCallback() {
    if (this.connected) return;
    this.connected = true;
    let {type, dismissible} = this.attrs;

    this.classList.add("messageBar", `messageBar--${type}`);
    this.querySelector("p").classList.add("message");

    this.insertBefore(<span class="icon"/>, this.firstElementChild);

    if (dismissible) {
      let dismiss = <a class="close"/>;
      dismiss.addEventListener("click", () => this.remove());
      this.appendChild(dismiss);
    }
  }
}

customElements.define("message-bar", MessageBarCE);

export const MessageBar = ({children, ...props}) => {
  return React.createElement("message-bar", props, children);
};

export default MessageBar;
