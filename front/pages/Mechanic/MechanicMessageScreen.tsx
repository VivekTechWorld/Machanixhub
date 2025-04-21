
import React, { useEffect, useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, 
  StyleSheet, KeyboardAvoidingView, Platform 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";
import axios from "axios";

const API_URL = "http://10.0.2.2:5000"; // Backend API
const socket = io('http://10.0.2.2:5000');
const API_URL2 = "http://10.0.2.2:5000/messages"; // Messages API

type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
};

const MechanicMessageScreen: React.FC = () => {
  const route = useRoute();
  const { mechanicId, mechanicName } = route.params as { mechanicId: string; mechanicName: string; };

  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null); // Store chat ID from socket
  const [loadingChatId, setLoadingChatId] = useState(true); // ✅ Wait for chatId before sending

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/mechanic/Profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data?.data?.MechanicOwnerid);
        const fetchedUserId = response.data?.data?.MechanicOwnerid;
        console.log('fetched id',fetchedUserId);
        setUserId(fetchedUserId);
        await fetchMessages(fetchedUserId, mechanicId);
        // Emit joinChat event and listen for chatId
        socket.emit("joinChat", { senderId: fetchedUserId, receiverId: mechanicId });
      } catch (error) {
        console.error("Error fetching vehicle owner ID:", error);
      }
    };

    fetchUserId();
    
    // ✅ Listen for chatId from socket
    socket.on("chatId", (receivedChatId: string) => {
      console.log("Received chatId from socket:", receivedChatId);
      setChatId(receivedChatId);
      setLoadingChatId(false); // ✅ Chat ID received
    });

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chatId");
      socket.off("receiveMessage");
    };
  }, [mechanicId]);

  // ✅ Fetch messages after receiving `chatId`
  const fetchMessages = async (userId: string,mechanicId : string) => {
    try {
      
      const response = await axios.get(`${API_URL2}/${userId}/${mechanicId}`);
      console.log(response.data);
      setMessages(response.data);
    } catch (error:any) {
        console.error("❌ Error fetching messages:", error.response?.data || error.message);
    }
  };


  const sendMessage = () => {
    if (!userId || newMessage.trim() === "" || !chatId) {
      console.warn("Waiting for chatId...");
      return;
    }

    const messageData = {
      chatId,  // ✅ Pass chatId from socket
      senderId: userId,
      receiverId: mechanicId,
      text: newMessage,
    };

    socket.emit("sendMessage", messageData);
    setMessages([...messages, { id: Date.now().toString(), ...messageData, createdAt: new Date().toISOString() }]);
    setNewMessage("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.header}>Chat with {mechanicName}</Text>

      <FlatList
    data={messages}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={[styles.messageContainer, item.senderId === userId ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        {/* ✅ Display formatted timestamp */}
        {item.createdAt && (
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString("en-US", { 
              hour: "2-digit", 
              minute: "2-digit", 
              hour12: true 
            })}
          </Text>
        )}
      </View>
    )}
    inverted
  />


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          editable={!loadingChatId} // ✅ Disable input until chatId is ready
        />
        <TouchableOpacity 
          style={[styles.sendButton, loadingChatId && { backgroundColor: "#ccc" }]} 
          onPress={sendMessage}
          disabled={loadingChatId} // ✅ Disable button until chatId is ready
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f9f9f9" },
  header: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  messageContainer: { padding: 10, borderRadius: 10, marginBottom: 5, maxWidth: "80%" },
  myMessage: { backgroundColor: "#007bff", alignSelf: "flex-end" },
  otherMessage: { backgroundColor: "#eb1717", alignSelf: "flex-start" },
  messageText: { color: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10 },
  sendButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginLeft: 5 },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
  timestamp: {
    fontSize: 12,
    color: "#ddd",
    marginTop: 3,
    textAlign: "right",
  },  
});

export default MechanicMessageScreen;
