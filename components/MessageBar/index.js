import React from "react";

import "./index.css";

class MessageBarCE extends HTMLElement {
  connected = false;

  connectedCallback() {
    if (this.connected) return;
    this.connected = true;

    let type = this.getAttribute("type");
    this.classList.add("messageBar", `messageBar--${type}`);

    let icon = document.createElement("span");
    icon.classList.add("icon");
    this.insertBefore(icon, this.firstElementChild);

    this.querySelector("p").classList.add("message");

    if (this.getAttribute("dismissible")) {
      let dismiss = document.createElement("a");
      dismiss.classList.add("close");
      // TODO: This should probably bubble an event or something.
      dismiss.addEventListener("click", () => this.remove());
      this.appendChild(dismiss);
    }
  }
}
customElements.define("message-bar", MessageBarCE);

export const MessageBar = ({children, ...props}) => {
  return (
    // This doesn't really need a wrapper, but it works.
    <message-bar {...props}>{children}</message-bar>
  );
};

export default MessageBar;
