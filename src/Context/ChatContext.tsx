// se importan las librerías necesarias de react para el manejo de estados y contextos, 
import React, { createContext, useState, useContext, useEffect } from "react";
// se importa la libreria de mensajería de Firebase
import messaging from "@react-native-firebase/messaging";
// se importa la librería de notificaciones de Notifee
import notifee, { AndroidImportance } from "@notifee/react-native";

// se crea la interfaz ChatMessage con los atributos id, chatId, senderId, content y createdAt
interface ChatMessage {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    createdAt: Date;
}

// se crea el contexto ChatContext con valor inicial null
const ChatContext = createContext<any>(null);

// se crea el componente ChatProvider con el parámetro children de tipo React.ReactNode
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    // se crea el estado messages con valor inicial un arreglo vacío y la función setMessages
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // se crea la función setNewMessage con el parámetro message de tipo ChatMessage que agrega un nuevo mensaje al estado messages
    const setNewMessage = (message: ChatMessage) => {
        console.log("Nuevo mensaje recibido:", message);
        setMessages((prevMessages) => [message, ...prevMessages]);
    };

    // se crea el efecto useEffect que se ejecuta al montar el componente
    useEffect(() => {
        const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
            console.log("Mensaje recibido en primer plano:", remoteMessage);

            // Verificar si el mensaje contiene una notificación
            if (remoteMessage.notification) {
                // Mostrar la notificación en primer plano usando Notifee
                await notifee.displayNotification({
                    title: remoteMessage.notification.title || "Nuevo mensaje",
                    body: remoteMessage.notification.body || "Tienes un nuevo mensaje",
                    android: {
                        channelId: "chat_channel",
                        importance: AndroidImportance.HIGH,
                    },
                });
            }

            // Verificar si el mensaje contiene datos
            if (remoteMessage.data) {
                // Extraer los datos del mensaje
                const { chatId, senderId, content, createdAt } = remoteMessage.data;

                // Verificar que los datos sean válidos
                if (
                    typeof chatId === "string" &&
                    typeof senderId === "string" &&
                    typeof content === "string" &&
                    (typeof createdAt === "string" || typeof createdAt === "number")
                ) {
                    // Agregar el mensaje al estado local
                    setNewMessage({
                        id: `${Date.now()}-${Math.random()}`,
                        chatId,
                        senderId,
                        content,
                        createdAt: new Date(createdAt),
                    });
                }
            }
        });

        return () => {
            unsubscribeForeground(); // Limpia el listener de mensajes en primer plano
        };
    }, []);

    // se retorna el componente ChatContext.Provider con el valor del contexto ChatContext.Provider
    return (
        <ChatContext.Provider value={{ messages, setMessages, setNewMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

// se crea la función useChat que retorna el contexto ChatContext
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat debe usarse dentro de un ChatProvider");
    }
    return context;
};
