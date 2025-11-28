'use client';

import { useState, useEffect, useRef } from 'react';
import { TeacherMessage, LessonContext } from '@/types';
import { getVoiceService } from '@/lib/voiceService';

interface TeacherChatProps {
  context: LessonContext;
  onContextUpdate: (context: LessonContext) => void;
}

export default function TeacherChat({ context, onContextUpdate }: TeacherChatProps) {
  const [messages, setMessages] = useState<TeacherMessage[]>(context.conversationHistory);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceService = useRef(getVoiceService());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: TeacherMessage = {
      role: 'student',
      content: input,
      timestamp: new Date(),
      type: 'guidance',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          message: input,
          context: {
            ...context,
            conversationHistory: newMessages,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const teacherMessage: TeacherMessage = {
        role: 'teacher',
        content: data.response,
        timestamp: new Date(),
        type: data.type,
      };

      const updatedMessages = [...newMessages, teacherMessage];
      setMessages(updatedMessages);

      // Update context
      onContextUpdate({
        ...context,
        conversationHistory: updatedMessages,
      });

      // Speak the response if it's a lecture or introduction
      if (data.type === 'lecture' || teacherMessage.content.length > 200) {
        speakMessage(data.response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to get response from teacher. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = async (text: string) => {
    setIsSpeaking(true);
    await voiceService.current.speak(text, () => {
      setIsSpeaking(false);
    });
  };

  const stopSpeaking = () => {
    voiceService.current.stop();
    setIsSpeaking(false);
  };

  const getMessageIcon = (type: TeacherMessage['type']) => {
    switch (type) {
      case 'lecture':
        return '📚';
      case 'question':
        return '❓';
      case 'feedback':
        return '✅';
      case 'assessment':
        return '📝';
      default:
        return '💬';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🦗</div>
            <div>
              <h2 className="text-xl font-bold">Jiminy - Your Virtual Teacher</h2>
              <p className="text-sm opacity-90">
                Learning: {context.currentTopic.chapter}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Progress</div>
            <div className="text-2xl font-bold">{context.progressPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === 'student'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.role === 'teacher' && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getMessageIcon(msg.type)}</span>
                  <span className="text-xs font-semibold text-gray-600 uppercase">
                    {msg.type}
                  </span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="text-xs opacity-60 mt-2">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="animate-bounce">🦗</div>
                <span className="text-gray-600">Jiminy is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Controls */}
      {isSpeaking && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="animate-pulse">🔊</span>
              <span className="text-sm text-yellow-800">Jiminy is speaking...</span>
            </div>
            <button
              onClick={stopSpeaking}
              className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Jiminy a question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
