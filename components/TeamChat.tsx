import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Smile, Image as ImageIcon, Trophy, Zap } from 'lucide-react-native';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'achievement' | 'system';
  achievementData?: {
    title: string;
    xp: number;
    icon: string;
  };
}

interface TeamChatProps {
  teamId: string;
}

export function TeamChat({ teamId }: TeamChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'mike-123',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      message: 'Great job on that emergency call today, Sarah! 🔥',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: 'text',
    },
    {
      id: '2',
      userId: 'sarah-456',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      message: 'Thanks! Customer was really happy with the quick response time.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      type: 'text',
    },
    {
      id: '3',
      userId: 'system',
      userName: 'System',
      userAvatar: '',
      message: 'Sarah Chen earned the Speed Demon achievement!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      type: 'achievement',
      achievementData: {
        title: 'Speed Demon',
        xp: 200,
        icon: '⚡',
      },
    },
    {
      id: '4',
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      message: 'Nice work everyone! Let\'s keep pushing for that weekly goal 💪',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      type: 'text',
    },
    {
      id: '5',
      userId: 'mike-123',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      message: 'Anyone available for a backup on the downtown job? Customer is requesting ASAP.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      type: 'text',
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      message: message.trim(),
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const renderMessage = (msg: ChatMessage) => {
    const isCurrentUser = msg.userId === 'current-user';
    const isSystem = msg.type === 'system' || msg.type === 'achievement';

    if (msg.type === 'achievement') {
      return (
        <View key={msg.id} style={styles.achievementMessage}>
          <View style={styles.achievementContent}>
            <Trophy color="#f59e0b" size={20} />
            <Text style={styles.achievementText}>
              <Text style={styles.achievementUser}>{msg.userName}</Text> earned{' '}
              <Text style={styles.achievementTitle}>{msg.achievementData?.title}</Text>
            </Text>
            <View style={styles.achievementXP}>
              <Zap color="#7c3aed" size={16} />
              <Text style={styles.achievementXPText}>+{msg.achievementData?.xp} XP</Text>
            </View>
          </View>
          <Text style={styles.messageTime}>{formatTime(msg.timestamp)}</Text>
        </View>
      );
    }

    return (
      <View key={msg.id} style={[
        styles.messageContainer,
        isCurrentUser && styles.currentUserMessage
      ]}>
        {!isCurrentUser && (
          <View style={styles.messageHeader}>
            <Text style={styles.messageSender}>{msg.userName}</Text>
            <Text style={styles.messageTime}>{formatTime(msg.timestamp)}</Text>
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
        ]}>
          <Text style={[
            styles.messageText,
            isCurrentUser && styles.currentUserText
          ]}>
            {msg.message}
          </Text>
        </View>
        {isCurrentUser && (
          <Text style={[styles.messageTime, styles.currentUserTime]}>
            {formatTime(msg.timestamp)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <View style={styles.messagesContent}>
          {messages.map(renderMessage)}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send 
              color={message.trim() ? '#ffffff' : '#94a3b8'} 
              size={20} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Smile color="#64748b" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ImageIcon color="#64748b" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  messageTime: {
    fontSize: 11,
    color: '#94a3b8',
  },
  currentUserTime: {
    textAlign: 'right',
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1e293b',
  },
  currentUserText: {
    color: '#ffffff',
  },
  achievementMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  achievementText: {
    fontSize: 14,
    color: '#92400e',
  },
  achievementUser: {
    fontWeight: '600',
  },
  achievementTitle: {
    fontWeight: '600',
    color: '#f59e0b',
  },
  achievementXP: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  achievementXPText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7c3aed',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563eb',
  },
  sendButtonInactive: {
    backgroundColor: '#f1f5f9',
  },
  inputActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
});