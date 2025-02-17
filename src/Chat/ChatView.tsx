import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { getChats, getMessages, sendMessage } from "./Petitions";
// se importa la funcion de usechat desde el contexto
import { useChat } from "../ChatContext";

export const ChatView = ({ route }: { route: any }) => {
    const { userId, username, currentUserId } = route.params; // Usuario autenticado y usuario seleccionado
    const { messages: globalMessages } = useChat();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [chatId, setChatId] = useState<number | null>(null);
    useEffect(() => {
        const fetchChatAndMessages = async () => {
            try {
                const chats = await getChats(userId, currentUserId);
                if (chats.length > 0) {
                    setChatId(chats[0].Id);
                    const msgs = await getMessages(chats[0].Id);
                    const formattedMessages = msgs.map((msg: any) => ({
                        id: msg.Id.toString(),
                        text: msg.Content,
                        createdAt: new Date(msg.Created_At),
                        userId: msg.Sender_Id.toString(),
                        username: `User ${msg.Sender_Id}`,
                    }));
                    setMessages(formattedMessages.reverse());
                }
            } catch (error) {
                console.error("Error al cargar los chats o mensajes:", error);
            }
        };
    
        fetchChatAndMessages();
    }, [userId, currentUserId]);

    useEffect(() => {
        if (chatId) {
            const filteredMessages = globalMessages.filter(
                (msg: any) => msg.chatId === chatId.toString()
            );
            if (filteredMessages.length > 0) {
                setMessages((prevMessages) => {
                    const mergedMessages = [...prevMessages, ...filteredMessages];
                    const uniqueMessages = mergedMessages.filter(
                        (msg, index, self) =>
                            index === self.findIndex((m) => m.id === msg.id)
                    );
                    uniqueMessages.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    return uniqueMessages;
                });
            }
        }
    }, [globalMessages, chatId]);

    const handleSend = async () => {
        if (newMessage.trim() === "") return;

        const messageToSend = {
            id: `${Date.now()}-${Math.random()}`,
            text: newMessage,
            createdAt: new Date(),
            userId: currentUserId.toString(),
            username: username,
        };

        setMessages((prevMessages) => [messageToSend, ...prevMessages]);

        try {
            if (chatId) {
                await sendMessage({
                    chatId,
                    senderId: currentUserId,
                    content: newMessage,
                });
                console.log("Mensaje enviado correctamente.");
            }
        } catch (err) {
            console.error("Error al enviar el mensaje:", err);
        }

        setNewMessage("");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.userId === currentUserId.toString()
                                ? styles.myMessage
                                : styles.otherMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                        <Text style={styles.messageTime}>
                            {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </View>
                )}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",
        alignSelf: "flex-start",
    },
    myMessage: {
        backgroundColor: "#d1e7ff",
        alignSelf: "flex-end",
    },
    otherMessage: {
        backgroundColor: "#ffffff",
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    messageTime: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
        alignSelf: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
