import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Send, Smile } from 'lucide-react-native';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface TeamChatProps {
  teamId: string;
}

export function TeamChat({ teamId }: TeamChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: 'user-1',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      message: 'Great job on that electrical install today, Sarah! 💪',
      timestamp: '2h ago',
      isCurrentUser: false,
    },
    {
      id: '2',
      userId: 'user-2',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      message: 'Thanks Mike! The client was really happy with the work. Team effort! 🔧',
      timestamp: '2h ago',
      isCurrentUser: false,
    },
    {
      id: '3',
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      message: 'Just finished the kitchen cabinet install. Ready for the next challenge! 🏠',
      timestamp: '1h ago',
      isCurrentUser: true,
    },
    {
      id: '4',
      userId: 'user-1',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      message: 'Awesome work everyone! We\'re crushing our weekly goal 🎯',
      timestamp: '30m ago',
      isCurrentUser: false,
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      message: message.trim(),
      timestamp: 'now',
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View key={msg.id} style={[
            styles.messageRow,
            msg.isCurrentUser && styles.messageRowReverse
          ]}>
            {!msg.isCurrentUser && (
              <Image source={{ uri: msg.userAvatar }} style={styles.avatar} />
            )}
            
            <View style={[
              styles.messageBubble,
              msg.isCurrentUser ? styles.messageBubbleUser : styles.messageBubbleOther
            ]}>
              {!msg.isCurrentUser && (
                <Text style={styles.senderName}>{msg.userName}</Text>
              )}
              <Text style={[
                styles.messageText,
                msg.isCurrentUser && styles.messageTextUser
              ]}>
                {msg.message}
              </Text>
              <Text style={[
                styles.timestamp,
                msg.isCurrentUser && styles.timestampUser
              ]}>
                {msg.timestamp}
              </Text>
            </View>
            
            {msg.isCurrentUser && (
              <Image source={{ uri: msg.userAvatar }} style={styles.avatar} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Smile color="#64748b" size={20} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            message.trim() ? styles.sendButtonActive : styles.sendButtonInactive
          ]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send 
            color={message.trim() ? '#ffffff' : '#94a3b8'} 
            size={20} 
            fill={message.trim() ? '#ffffff' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageRowReverse: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageBubbleOther: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageBubbleUser: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 20,
  },
  messageTextUser: {
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
  timestampUser: {
    color: '#bfdbfe',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    maxHeight: 80,
    minHeight: 20,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563eb',
  },
  sendButtonInactive: {
    backgroundColor: '#f1f5f9',
  },
});