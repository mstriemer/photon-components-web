export function dom(tagName, attrs, ...content) {
  let root;

  if (tagName == "fragment") {
    root = document.createDocumentFragment();
  } else {
    root = document.createElement(tagName);
    if (attrs) {
      Object.entries(attrs).forEach(([name, value]) => {
        root.setAttribute(name, value);
      });
    }
  }

  if (content) {
    content.forEach((el) => {
      if (el == null) {
        // Don't append empty elements;
      } else if (el.split) {
        root.appendChild(document.createTextNode(el));
      } else if (el.forEach) {
        el.forEach((e) => {
          if (e.split) {
            e = document.createTextNode(e);
          }
          root.appendChild(e);
        });
      } else {
        root.appendChild(el);
      }
    });
  }

  return root;
}

// A proxy handler to support React style attribute accessors.
//
//   connectedCallback() {
//     // Probably do this in the constructor.
//     this.attrs = new Proxy(this, attributeGetter);
//     // Get the type and name attributes.
//     let {type, name} = this.attrs;
//   }
export const attributeGetter = {
  get(obj, name) {
    return obj.getAttribute(name);
  },
};
