declare module 'react-native-event-source' {
  export interface SseEvent {
    id: string;
    event: string;
    data: string;
  }

  export interface EventSourceOptions {
    [key: string]: any;
  }

  export type EventListener = (event: SseEvent) => void;

  export type SseEvents<T> = 'open' | 'message' | 'error' | T;

  export default class RNEventSource {
    constructor(url: string, options?: EventSourceOptions);
    addEventListener<T = string>(
      type: SseEvents<T>,
      listener: EventListener,
    ): void;
    removeListener(type: string, listener: EventListener): void;
    removeAllListeners(): void;
    close(): void;
  }
}
