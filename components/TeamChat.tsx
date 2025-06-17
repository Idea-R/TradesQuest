import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Paperclip, Smile, MoveVertical as MoreVertical, Camera, Mic } from 'lucide-react-native';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice' | 'system';
  isCurrentUser?: boolean;
  attachments?: string[];
}

interface TeamChatProps {
  teamId: string;
  currentUserId: string;
  onSendMessage?: (message: string, type: 'text' | 'image' | 'voice') => void;
}

export function TeamChat({ teamId, currentUserId, onSendMessage }: TeamChatProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock chat messages
  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'system',
      userName: 'System',
      userAvatar: '',
      message: 'Alex Johnson joined the team',
      timestamp: '2024-01-15T09:00:00Z',
      type: 'system'
    },
    {
      id: '2',
      userId: 'mike-123',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      message: 'Welcome to the team! 🎉 Ready to crush some goals this week?',
      timestamp: '2024-01-15T09:05:00Z',
      type: 'text'
    },
    {
      id: '3',
      userId: 'sarah-456',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      message: 'Just finished a complex electrical panel upgrade. Took 3 hours but customer was super happy!',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text'
    },
    {
      id: '4',
      userId: currentUserId,
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      message: 'Thanks for the warm welcome! Excited to be part of the team. Just completed my first job today 💪',
      timestamp: '2024-01-15T11:15:00Z',
      type: 'text',
      isCurrentUser: true
    },
    {
      id: '5',
      userId: 'mike-123',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      message: 'Nice work! Pro tip: always take before/after photos for warranty claims. Saves time later.',
      timestamp: '2024-01-15T11:20:00Z',
      type: 'text'
    },
    {
      id: '6',
      userId: 'david-789',
      userName: 'David Kim',
      userAvatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      message: 'Anyone know a good supplier for Samsung appliance parts? My usual guy is out of stock.',
      timestamp: '2024-01-15T12:45:00Z',
      type: 'text'
    }
  ]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage?.(message.trim(), 'text');
      setMessage('');
      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleAttachment = () => {
    // Handle file attachment
    console.log('Attachment pressed');
  };

  const handleVoiceMessage = () => {
    // Handle voice message
    console.log('Voice message pressed');
  };

  useEffect(() => {
    // Auto-scroll to bottom when component mounts
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Team Chat</Text>
          <Text style={styles.headerSubtitle}>5 members online</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <MoreVertical color="#64748b" size={20} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageWrapper}>
            {msg.type === 'system' ? (
              <View style={styles.systemMessage}>
                <Text style={styles.systemMessageText}>{msg.message}</Text>
              </View>
            ) : (
              <View style={[
                styles.messageContainer,
                msg.isCurrentUser && styles.currentUserMessage
              ]}>
                {!msg.isCurrentUser && (
                  <Image source={{ uri: msg.userAvatar }} style={styles.messageAvatar} />
                )}
                
                <View style={[
                  styles.messageBubble,
                  msg.isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
                ]}>
                  {!msg.isCurrentUser && (
                    <Text style={styles.messageSender}>{msg.userName}</Text>
                  )}
                  <Text style={[
                    styles.messageText,
                    msg.isCurrentUser && styles.currentUserMessageText
                  ]}>
                    {msg.message}
                  </Text>
                  <Text style={[
                    styles.messageTime,
                    msg.isCurrentUser && styles.currentUserMessageTime
                  ]}>
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.typingDots}>
              <View style={[styles.typingDot, styles.typingDot1]} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
            </View>
            <Text style={styles.typingText}>Someone is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachmentButton} onPress={handleAttachment}>
            <Paperclip color="#64748b" size={20} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            multiline
            maxLength={500}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />
          
          <TouchableOpacity style={styles.emojiButton}>
            <Smile color="#64748b" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceMessage}>
            <Mic color="#7c3aed" size={20} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send color="#ffffff" size={20} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#16a34a',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  headerAction: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessageText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  otherUserBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserBubble: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7c3aed',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  currentUserMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 11,
    color: '#94a3b8',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  currentUserMessageTime: {
    color: '#e2e8f0',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingDots: {
    flexDirection: 'row',
    marginRight: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94a3b8',
    marginHorizontal: 1,
  },
  typingDot1: {
    // Animation would be added here
  },
  typingDot2: {
    // Animation would be added here
  },
  typingDot3: {
    // Animation would be added here
  },
  typingText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
    paddingVertical: 8,
  },
  emojiButton: {
    padding: 8,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563eb',
  },
  sendButtonInactive: {
    backgroundColor: '#e2e8f0',
  },
});