import React from "react";

import closeImg from "./close-16.svg";
import infoImg from "./info-16.svg";
import checkImg from "./check-16.svg";
import warningImg from "./warning-16.svg";
import errorImg from "./error-16.svg";
import closeWhiteImg from "./close-white-16.svg";

let indexCss = `
:host {
  border-radius: 4px;
  display: flex;
  min-height: 32px;
}

:host .icon {
  height: 16px;
  margin: 8px 4px;
  width: 16px;
}

::slotted(p) {
  margin: 6px 8px 6px 4px;
}

::slotted(.button) {
  margin: 4px 0;
}

:host .close {
  background-image: url(${closeImg});
  background-repeat: no-repeat;
  background-size: 16px 16px;
  height: 16px;
  margin: 4px;
  margin-left: auto;
  width: 16px;
}

:host([type="generic"]) {
  background: var(--grey-20);
  color: var(--grey-90);
}

:host([type="generic"]) .button {
  background: var(--grey-90-a10);
}

:host([type="generic"]) .icon {
  background-image: url(${infoImg});
  background-repeat: no-repeat;
  background-size: 16px 16px;
}

:host([type="generic"]) .button:hover {
  background: var(--grey-90-a20);
  color: white;
}

:host([type="generic"]) .button:active {
  background: var(--grey-90-a30);
  color: white;
}

:host([type="success"]) {
  background: var(--green-50);
}

:host([type="success"]) .icon {
  background-image: url(${checkImg});
  background-repeat: no-repeat;
  background-size: 16px 16px;
}

:host([type="success"]) .button {
  background: var(--green-60);
}

:host([type="success"]) .button:hover {
  background: var(--green-70);
  color: white;
}

:host([type="success"]) .button:active {
  background: var(--green-80);
  color: white;
}

:host([type="warning"]) {
  background: var(--yellow-50);
  color: var(--yellow-90);
}

:host([type="warning"]) .icon {
  background-image: url(${warningImg});
  background-repeat: no-repeat;
  background-size: 16px 16px;
}

:host([type="warning"]) .button {
  background: var(--yellow-60);
}

:host([type="warning"]) .button:hover {
  background: var(--yellow-70);
  color: white;
}

:host([type="warning"]) .button:active {
  background: var(--yellow-80);
  color: white;
}

:host([type="error"]) {
  background: var(--red-60);
  color: white;
}

:host([type="error"]) .icon {
  background-image: url(${errorImg});
  background-repeat: no-repeat;
  background-size: 16px 16px;
}

:host([type="error"]) .button {
  background: var(--red-70);
  color: white;
}

:host([type="error"]) .button:hover {
  background: var(--red-80);
}

:host([type="error"]) .button:active {
  background: var(--red-90);
}

:host([type="error"]) .close {
  background-image: url(${closeWhiteImg});
}
`;

class MessageBarCE extends HTMLElement {
  connectedCallback() {
    let shadow = this.attachShadow({mode: "open"});

    let style = document.createElement("style");
    style.textContent = indexCss;
    shadow.appendChild(style);

    let icon = document.createElement("span");
    icon.classList.add("icon");
    shadow.appendChild(icon);

    let content = document.createElement("slot");
    shadow.appendChild(content);

    if (this.getAttribute("dismissible")) {
      let dismiss = document.createElement("a");
      dismiss.classList.add("close");
      // TODO: This should probably bubble an event or something.
      dismiss.addEventListener("click", () => this.remove());
      shadow.appendChild(dismiss);
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
