type EventMap<T extends any[]> = {
  [eventName: string]: Array<(...params: T) => void>;
};

class EventEmitter {
  private listenersMap: EventMap<any> = {};

  addListener<T extends any[]>(
    eventName: string,
    listener: (...params: T) => void,
  ) {
    this.listenersMap[eventName] = this.listenersMap[eventName] || [];
    this.listenersMap[eventName].push(listener);
  }

  removeListener<T extends any[]>(
    eventName: string,
    listener: (...params: T) => void,
  ) {
    const listeners = this.listenersMap[eventName];
    if (!listeners) return;

    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(eventName: string) {
    this.listenersMap[eventName] = [];
  }

  notify<T extends any[]>(eventName: string, ...params: T) {
    const listeners = this.listenersMap[eventName];
    if (!listeners) return false;

    listeners.forEach(fnc => {
      fnc(...params);
    });
    return true;
  }
}
const eventEmitter = new EventEmitter();

export default eventEmitter;