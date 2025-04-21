// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { GiftedChat, IMessage } from "react-native-gifted-chat";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER = "http://10.0.2.2:5000"; // Use LAN IP

// interface RouteParams {
//   senderId: string;
//   receiverId: string;
// }

// interface MessagingScreenProps {
//   route?: { params?: RouteParams };
// }

// const MessagingScreen: React.FC<MessagingScreenProps> = ({ route }) => {
//   const senderId = route?.params?.senderId ?? "defaultSenderId";
//   const receiverId = route?.params?.receiverId ?? "defaultReceiverId";

//   if (!route?.params) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Missing senderId or receiverId</Text>
//       </View>
//     );
//   }

//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     console.log("🔌 Connecting to socket...");

//     socketRef.current = io(SOCKET_SERVER, { transports: ["websocket"] });

//     socketRef.current.on("connect", () => {
//       console.log("✅ Connected:", socketRef.current?.id);
//       socketRef.current?.emit("joinChat", { senderId, receiverId });
//     });

//     socketRef.current.on("connect_error", (error) => {
//       console.error("❌ Socket connection error:", error.message);
//     });

//     socketRef.current.on("disconnect", (reason) => {
//       console.warn("⚠️ Disconnected:", reason);
//     });

//     socketRef.current.on("receiveMessage", (newMessage: any) => {
//       console.log("📩 New message received:", newMessage);
//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [
//           {
//             _id: newMessage._id,
//             text: newMessage.message,
//             createdAt: new Date(newMessage.timestamp),
//             user: { _id: newMessage.senderId },
//           },
//         ])
//       );
//     });

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`${SOCKET_SERVER}/messages/${senderId}/${receiverId}`);
        
//         if (!response.data || !Array.isArray(response.data.messages)) {
//           console.error("🚨 Invalid response format:", response.data);
//           return;
//         }

//         const formattedMessages = response.data.messages.map((msg: any) => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: { _id: msg.senderId },
//         }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error("❌ Error fetching messages:", error);
//       }
//     };

//     fetchMessages();

//     return () => {
//       console.log("🧹 Cleaning up...");
//       socketRef.current?.off("receiveMessage");
//       socketRef.current?.disconnect();
//     };
//   }, [senderId, receiverId]);

//   const handleSend = useCallback(async (newMessages: IMessage[] = []) => {
//     if (newMessages.length === 0) return;

//     const messageData = {
//       senderId,
//       receiverId,
//       message: newMessages[0].text,
//       timestamp: new Date().toISOString(),
//     };

//     console.log("📤 Sending message:", messageData);

//     try {
//       const response = await axios.post(`${SOCKET_SERVER}/send`, messageData);
//       console.log("✅ Message saved to DB:", response.data);
//       socketRef.current?.emit("sendMessage", messageData);
//       setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//     } catch (error: any) {
//       console.error("❌ Error sending message:", error.response?.data || error.message);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GiftedChat messages={messages} onSend={handleSend} user={{ _id: senderId }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default MessagingScreen;


// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { GiftedChat, IMessage } from "react-native-gifted-chat";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER = "http://10.0.2.2:5000"; // Ensure backend runs on this IP

// interface RouteParams {
//   senderId: string;
//   receiverId: string;
// }

// interface MessagingScreenProps {
//   route?: { params?: RouteParams };
// }

// const MessagingScreen: React.FC<MessagingScreenProps> = ({ route }) => {
//   const senderId = route?.params?.senderId ?? "defaultSenderId";
//   const receiverId = route?.params?.receiverId ?? "defaultReceiverId";

//   if (!route?.params) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Missing senderId or receiverId</Text>
//       </View>
//     );
//   }

//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     console.log("🔌 Connecting to socket...");
    
//     socketRef.current = io(SOCKET_SERVER, { transports: ["websocket"] });

//     socketRef.current.on("connect", () => {
//       console.log("✅ Socket connected:", socketRef.current?.id);
//       socketRef.current?.emit("joinChat", { senderId, receiverId });
//     });

//     socketRef.current.on("connect_error", (error) => {
//       console.error("❌ Connection error:", error.message);
//     });

//     socketRef.current.on("disconnect", (reason) => {
//       console.warn("⚠️ Disconnected from server:", reason);
//     });

//     socketRef.current.on("receiveMessage", (newMessage: any) => {
//       console.log("📩 Received message:", newMessage);
//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [
//           {
//             _id: newMessage._id,
//             text: newMessage.message,
//             createdAt: new Date(newMessage.timestamp),
//             user: { _id: newMessage.senderId },
//           },
//         ])
//       );
//     });

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`${SOCKET_SERVER}/messages/${senderId}/${receiverId}`);
//         if (!response.data || !Array.isArray(response.data.messages)) {
//           console.error("⚠️ Unexpected response format:", response.data);
//           return;
//         }

//         const formattedMessages = response.data.messages.map((msg: any) => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: { _id: msg.senderId },
//         }));

//         setMessages(formattedMessages);
//       } catch (error: any) {
//         console.error("❌ Error fetching messages:", error.response?.data || error.message);
//       }
//     };

//     fetchMessages();

//     return () => {
//       console.log("🧹 Cleaning up socket...");
//       socketRef.current?.off("receiveMessage");
//       socketRef.current?.disconnect();
//     };
//   }, [senderId, receiverId]);

//   const handleSend = useCallback(async (newMessages: IMessage[] = []) => {
//     if (newMessages.length === 0) return;

//     const messageData = {
//       senderId,
//       receiverId,
//       message: newMessages[0].text,
//       timestamp: new Date().toISOString(),
//     };

//     console.log("📤 Sending message:", messageData);

//     try {
//       const response = await axios.post(
//         `${SOCKET_SERVER}/messages/send`, // ✅ Corrected endpoint
//         messageData,
//         { headers: { "Content-Type": "application/json" } } // ✅ Added headers
//       );

//       console.log("✅ Message saved:", response.data);

//       socketRef.current?.emit("sendMessage", response.data);
//       setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//     } catch (error: any) {
//       console.error("❌ Error sending message:", error.response?.data || error.message);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GiftedChat messages={messages} onSend={handleSend} user={{ _id: senderId }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default MessagingScreen;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { GiftedChat, IMessage } from "react-native-gifted-chat";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER = "http://10.0.2.2:5000"; // Use LAN IP

// interface RouteParams {
//   senderId: string;
//   receiverId: string;
// }

// interface MessagingScreenProps {
//   route?: { params?: RouteParams };
// }

// const MessagingScreen: React.FC<MessagingScreenProps> = ({ route }) => {
//   const senderId = route?.params?.senderId ?? "defaultSenderId";
//   const receiverId = route?.params?.receiverId ?? "defaultReceiverId";

//   if (!route?.params) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Missing senderId or receiverId</Text>
//       </View>
//     );
//   }

//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     console.log("🔌 Connecting to socket...");

//     socketRef.current = io(SOCKET_SERVER, { transports: ["websocket"] });

//     socketRef.current.on("connect", () => {
//       console.log("✅ Socket connected:", socketRef.current?.id);
//       socketRef.current?.emit("joinChat", { senderId, receiverId });
//     });

//     socketRef.current.on("connect_error", (error) => {
//       console.error("❌ Connection error:", error.message);
//     });

//     socketRef.current.on("disconnect", (reason) => {
//       console.warn("⚠️ Disconnected from server:", reason);
//     });

//     socketRef.current.on("receiveMessage", (newMessage: any) => {
//       console.log("📩 Received message:", newMessage);

//       // ✅ Check if the message is already in state to avoid duplicates
//       setMessages((prevMessages) => {
//         const exists = prevMessages.some((msg) => msg._id === newMessage._id);
//         if (!exists) {
//           return GiftedChat.append(prevMessages, [
//             {
//               _id: newMessage._id,
//               text: newMessage.message,
//               createdAt: new Date(newMessage.timestamp),
//               user: { _id: newMessage.senderId },
//             },
//           ]);
//         }
//         return prevMessages;
//       });
//     });

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`${SOCKET_SERVER}/messages/${senderId}/${receiverId}`);

//         if (!response.data || !Array.isArray(response.data.messages)) {
//           console.error("❌ Unexpected response format:", response.data);
//           return;
//         }

//         const formattedMessages = response.data.messages.map((msg: any) => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: { _id: msg.senderId },
//         }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error("❌ Error fetching messages:", error);
//       }
//     };

//     fetchMessages();

//     return () => {
//       console.log("🧹 Cleaning up socket...");
//       socketRef.current?.off("receiveMessage");
//       socketRef.current?.disconnect();
//     };
//   }, [senderId, receiverId]);

//   const handleSend = useCallback(async (newMessages: IMessage[] = []) => {
//     if (newMessages.length === 0) return;

//     const messageData = {
//       senderId,
//       receiverId,
//       message: newMessages[0].text,
//       timestamp: new Date().toISOString(),
//     };

//     console.log("📤 Sending message:", messageData);

//     try {
//       await axios.post(`${SOCKET_SERVER}/send`, messageData); // Save to DB
//       socketRef.current?.emit("sendMessage", messageData); // Emit to socket
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GiftedChat messages={messages} onSend={handleSend} user={{ _id: senderId }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default MessagingScreen;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
// import { GiftedChat, IMessage } from "react-native-gifted-chat";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER = "http://10.0.2.2:5000"; // LAN IP for local testing

// interface RouteParams {
//   senderId: string;
//   receiverId: string;
//   senderName?: string;
//   receiverName?: string;
//   senderAvatar?: string;
//   receiverAvatar?: string;
// }

// interface MessagingScreenProps {
//   route?: { params?: RouteParams };
// }

// // Extend the IMessage interface to include the status property
// interface ExtendedIMessage extends IMessage {
//   status: string;
// }

// const MessagingScreen: React.FC<MessagingScreenProps> = ({ route }) => {
//   if (!route?.params) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Missing senderId or receiverId</Text>
//       </View>
//     );
//   }

//   const {
//     senderId,
//     receiverId,
//     senderName = "You",
//     receiverName = "Mechanic",
//     senderAvatar = "https://i.pravatar.cc/300?img=5",
//     receiverAvatar = "https://i.pravatar.cc/300?img=3",
//   } = route.params;

//   const [messages, setMessages] = useState<ExtendedIMessage[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     console.log("🔌 Connecting to socket...");

//     socketRef.current = io(SOCKET_SERVER, { transports: ["websocket"] });

//     socketRef.current.on("connect", () => {
//       console.log("✅ Socket connected:", socketRef.current?.id);
//       socketRef.current?.emit("joinChat", { senderId, receiverId });
//     });

//     socketRef.current.on("connect_error", (error) => {
//       console.error("❌ Connection error:", error.message);
//     });

//     socketRef.current.on("disconnect", (reason) => {
//       console.warn("⚠️ Disconnected from server:", reason);
//     });

//     socketRef.current.on("receiveMessage", (newMessage: any) => {
//       console.log("📩 Received message:", newMessage);

//       setMessages((prevMessages) => {
//         const exists = prevMessages.some((msg) => msg._id === newMessage._id);
//         if (!exists) {
//           return GiftedChat.append(prevMessages, [
//             {
//               _id: newMessage._id,
//               text: newMessage.message,
//               createdAt: new Date(newMessage.timestamp),
//               user: {
//                 _id: newMessage.senderId,
//                 name: newMessage.senderId === senderId ? senderName : receiverName,
//                 avatar: newMessage.senderId === senderId ? senderAvatar : receiverAvatar,
//               },
//               status: "delivered", // Default status
//             },
//           ]);
//         }
//         return prevMessages;
//       });
//     });

//     socketRef.current.on("typing", ({ senderId: typingSender }) => {
//       if (typingSender !== senderId) {
//         setIsTyping(true);
//         setTimeout(() => setIsTyping(false), 3000);
//       }
//     });

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`${SOCKET_SERVER}/messages/${senderId}/${receiverId}`);

//         if (!response.data || !Array.isArray(response.data.messages)) {
//           console.error("❌ Unexpected response format:", response.data);
//           return;
//         }

//         const formattedMessages = response.data.messages.map((msg: any) => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: {
//             _id: msg.senderId,
//             name: msg.senderId === senderId ? senderName : receiverName,
//             avatar: msg.senderId === senderId ? senderAvatar : receiverAvatar,
//           },
//           status: msg.status || "sent", // Default status
//         }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error("❌ Error fetching messages:", error);
//       }
//     };

//     fetchMessages();

//     return () => {
//       console.log("🧹 Cleaning up socket...");
//       socketRef.current?.off("receiveMessage");
//       socketRef.current?.disconnect();
//     };
//   }, [senderId, receiverId]);

//   const handleSend = useCallback(async (newMessages: ExtendedIMessage[] = []) => {
//     if (newMessages.length === 0) return;

//     const messageData = {
//       senderId,
//       receiverId,
//       message: newMessages[0].text,
//       timestamp: new Date().toISOString(),
//       status: "sent",
//     };

//     console.log("📤 Sending message:", messageData);

//     try {
//       await axios.post(`${SOCKET_SERVER}/send`, messageData);
//       socketRef.current?.emit("sendMessage", messageData);
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       {isTyping && (
//         <View style={styles.typingIndicator}>
//           <ActivityIndicator size="small" color="#0a84ff" />
//           <Text style={styles.typingText}>{receiverName} is typing...</Text>
//         </View>
//       )}
//       <GiftedChat
//         messages={messages}
//         onSend={handleSend}
//         user={{ _id: senderId, name: senderName, avatar: senderAvatar }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   typingIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#e3e3e3",
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginBottom: 5,
//   },
//   typingText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: "#333",
//   },
// });

// export default MessagingScreen;

// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://10.0.2.2:5000/api/messages"; // ✅ New API Endpoint

// interface ChatUser {
//   id: string;
//   name: string;
//   type: "vehicleOwner" | "mechanic";
// }

// const ChatListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchChatUsers();
//     }
//   }, [userId]);

//   const fetchUserId = async () => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) return;
      
//       const response = await axios.get("http://10.0.2.2:5000/api/mechanic/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       console.log(response.data);
//       const mechanicId=response.data.MechanicOwnerid;
//       setUserId(mechanicId);
//       console.log(userId)
//     } catch (error) {
//       console.error("Error fetching user ID:", error);
//     }
//   };

//   const fetchChatUsers = async () => {
//     try {
//       console.log('mechanic data', userId);
//       const response = await axios.get<ChatUser[]>(`${API_URL}/${userId}`);
//       setChatUsers(response.data);
//     } catch (err) {
//       setError("Failed to load chats");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chats</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : error ? (
//         <Text style={styles.error}>{error}</Text>
//       ) : chatUsers.length === 0 ? (
//         <Text style={styles.noData}>No chats found</Text>
//       ) : (
//         <FlatList
//           data={chatUsers}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.card}
//               onPress={() =>
//                 navigation.navigate("ChatScreen", {
//                   senderId: userId,
//                   receiverId: item.id,
//                 })
//               }
//             >
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.userType}>{item.type === "vehicleOwner" ? "🚗 Vehicle Owner" : "🔧 Mechanic"}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 15,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   userType: {
//     fontSize: 16,
//     color: "#555",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   noData: {
//     color: "#555",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default ChatListScreen;

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000/messages"; // ✅ Correct API Endpoint

interface ChatUser {
  id: string;
  name: string;
  type: "vehicleOwner" | "mechanic";
}

const ChatListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchChatUsers();
    }
  }, [userId]); // ✅ Runs fetchChatUsers only when userId is set

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("❌ No token found");
        setError("Authentication error");
        return;
      }

      const response = await axios.get("http://10.0.2.2:5000/api/mechanic/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Mechanic Profile Response:", response.data);

      if (!response.data.success || !response.data.data.MechanicOwnerid) {
        console.error("❌ MechanicOwnerid not found in response");
        setError("User ID not found");
        return;
      }

      const mechanicId = response.data.data.MechanicOwnerid; // ✅ Correctly accessing user ID
      console.log("✅ Mechanic ID fetched:", mechanicId);
      setUserId(mechanicId);
    } catch (error) {
      console.error("❌ Error fetching user ID:", error);
      setError("Failed to fetch user ID");
    }
  };

  const fetchChatUsers = async () => {
    if (!userId) return;

    try {
      console.log("📩 Fetching chat users for ID:", userId);
      const response = await axios.get<ChatUser[]>(`${API_URL}/${userId}`);
      console.log("💬 Chat Users Fetched:", response.data);

      setChatUsers(response.data);
    } catch (err) {
      console.error("❌ Error fetching chat users:", err);
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mechanic chats</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : chatUsers.length === 0 ? (
        <Text style={styles.noData}>No chats found</Text>
      ) : (
        <FlatList
          data={chatUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}

              onPress={() =>
                // navigation.navigate("MechanicMessageScreen", {
                //   senderId: userId,
                //   receiverId: item.id,
                // })
                navigation.navigate("MechanicMessageScreen", { mechanicId:item.id, mechanicName: item.name })
              }
            >
              <Text style={styles.name}>{item.id}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.userType}>{item.type === "vehicleOwner" ? "🚗 Vehicle Owner" : "🔧 Mechanic"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userType: {
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noData: {
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ChatListScreen;
