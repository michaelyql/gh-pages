/**
 * More information on custom HTML elements here
 * https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
 * and here
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
 */

export class Highlight extends HTMLElement {
  // Use this to specify what attributes the element should listen to changes for
  static observedAttributes = [""];

  constructor() {
    super();
  }
  connectedCallback() {
    // Called each time element is added to the page
    console.log("Element added to page");
  }
  disconnectedCallback() {
    // Called when element is removed from the page
  }

  adoptedCallback() {
    // Called when element is moved to a new page
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}
