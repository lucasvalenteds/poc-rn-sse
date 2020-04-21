import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import RNEventSource from 'react-native-event-source';

interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

type Events = 'new-message';

const App: React.FC = (): React.ReactElement => {
  useEffect(() => {
    const sse = new RNEventSource('http://localhost:8080');

    sse.addEventListener<Events>('new-message', (event) => {
      const message: Message = JSON.parse(event.data);

      console.debug(message.content);
    });

    return (): void => {
      sse.removeAllListeners();
      sse.close();
    };
  }, []);
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
