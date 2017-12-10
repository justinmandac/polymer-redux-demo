(() => {
  const initial = {
    message: 'Hello Polymer Redux!',
    history: [],
  };
  const reducer = (state, action) => {
    switch(action.type) {
      case 'UPDATE_MESSAGE':
        return Object.assign({}, state, {
          message: action.message,
          history: [
            {
              message: state.message,
              date: action.date,
            },
            ...state.history
          ],
        });
      break;
      case 'CLEAR_MESSAGE':
        return Object.assign({}, state, {
          message: '',
        });
      break;
      default:
        return state;
    }
  };
  const store = Redux.createStore(
    reducer,
    initial,
    window.__REDUX_DEVTOOLS_EXTENSION__ && // Enable Redux devtools
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  const ReduxMixin = PolymerRedux(store);

  class MainApp extends ReduxMixin(Polymer.Element) {
    static get is() { return 'main-app'; }

    static get properties() {
      return {
        message: {
          type: String,
          statePath: 'message',
        },

        history: {
          type: Array,
          statePath: 'history',
        },
      };
    }

    _clearPressed() {
      this.$.messageInput.value = '';
      this.dispatch({ type: 'CLEAR_MESSAGE' });
    }

    _updatePressed() {
      this.dispatch({
        type: 'UPDATE_MESSAGE',
        message: this.$.messageInput.value,
        date: (new Date()).toISOString(),
      });
    }
  }

  customElements.define(MainApp.is, MainApp);
})();