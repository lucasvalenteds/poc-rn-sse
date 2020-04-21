import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';
import RNEventSource, { SseEvent, SseEvents } from 'react-native-event-source';

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export type MessageEvents = 'new-message';

export class MessageService {
  private sse: RNEventSource;

  public constructor(url = 'http://localhost:8080') {
    this.sse = new RNEventSource(url);
  }

  listen<T>(event: SseEvents<MessageEvents>, fn: (data: T) => void): void {
    this.sse.addEventListener(event, (sseEvent: SseEvent) => {
      if (sseEvent.data) {
        fn(JSON.parse(sseEvent.data));
      }
    });
  }

  disconnect(): void {
    this.sse.removeAllListeners();
    this.sse.close();
  }
}

export const MessageComponent: React.FC<Message> = (props) => {
  const style = StyleSheet.create({
    notification: {
      padding: 16,
      width: '100%',
    },
    timestamp: {
      fontSize: 12,
      fontStyle: 'italic',
    },
    title: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    content: {
      fontSize: 16,
      fontStyle: 'normal',
    },
  });

  return (
    <TouchableNativeFeedback>
      <View style={style.notification}>
        <Text style={style.timestamp}> {props.timestamp} </Text>
        <Text style={style.title}>{props.title}</Text>
        <Text style={style.content}>{props.content}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
