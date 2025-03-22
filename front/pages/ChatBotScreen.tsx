import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const ChatBotScreen: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const requestData = {
        contents: [
          {
            parts: [
              { text: input }
            ]
          }
        ]
      };
      const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAmCcSei7xIAexb9-s1HsPSwXADW0HGv9k`;
    try {
        const response = await axios.post(URL, requestData, {
            headers: {
              "Content-Type": "application/json",
            }
          });

      console.log(response.data);
      const aiText = response.data.candidates[0].content.parts[0].text;
      setMessages([...newMessages, { sender: "bot", text: aiText }]);
    } catch (error) {
        console.error(error);
      setMessages([...newMessages, { sender: "bot", text: "Error: Unable to fetch response." }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === "user" ? styles.userBubble : styles.botBubble}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask me anything..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  chatContainer: { flex: 1, marginBottom: 10 },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#080707",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#5c40f7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: { color: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5 },
  sendButton: { marginLeft: 10, backgroundColor: "#007bff", padding: 10, borderRadius: 5 },
  sendText: { color: "#fff" },
});

export default ChatBotScreen;