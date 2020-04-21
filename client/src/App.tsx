import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, FlatList, View } from 'react-native';
import { MessageService, Message, MessageComponent } from './Message';

const App: React.FC = (): React.ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const service = new MessageService();

    service.listen<Message>('new-message', (message) => {
      setMessages((previous: Message[]) => [message, ...previous]);
    });

    return () => service.disconnect();
  }, []);
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <FlatList
          data={messages}
          keyExtractor={(prop) => prop.id}
          renderItem={(prop) => MessageComponent(prop.item)}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: '#22222222' }} />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
