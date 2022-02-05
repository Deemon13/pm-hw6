class EventBus {
  constructor() {
    this.handlers = [];
  }

  /**
   * The method that registers listeners for custom events
   * @param {string} event - event name
   * @param {eventListener} listener - callback
   */
  on(event, listener) {
    this.handlers.push({ event, listener });
  }

  /**
   * The method that fires event
   * @param {string} event - event name
   * @param {Object} data - any data
   */
  emit(event, data) {
    this.handlers
      .filter((el) => el.event === event)
      .forEach((el) => el.listener(data));
  }
}

// RESULT

const eventBus = new EventBus();

eventBus.on("stateUpdated", (state) => {
  console.log("first state listener"); // first state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on("stateUpdated", (state) => {
  console.log("second state listener"); // second state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on("requestFulfilled", (data) => {
  console.log("first request listener"); // first request listener
  console.log(data); // { request: 'data' }
});

eventBus.on("foo", () => {
  console.log("this message won't be shown");
});

eventBus.emit("stateUpdated", { newState: "is here" });
eventBus.emit("requestFulfilled", { request: "data" });
eventBus.emit("bar", { foo: "bar" });
