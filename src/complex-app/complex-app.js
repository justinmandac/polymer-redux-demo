(() => {
  class ComplexApp extends Polymer.Element {
    static get is() { return 'complex-app'; }
  }

  customElements.define(ComplexApp.is, ComplexApp);
})();