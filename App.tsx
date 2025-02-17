import 'react-native-get-random-values';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { Platform } from "react-native";
import { TabNavigation } from "./src/Navigaton/Navigation";
import { LoginScreen } from "./src/Login/LoginScreen";
import { ChatProvider } from "./src/ChatContext";

const App = (): JSX.Element => {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    // Solicitar permiso de notificaciones
    useEffect(() => {
        const requestPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (!enabled) {
                console.log("Permiso de notificaciones denegado");
            }
        };

        // Crear canal de notificaciones
        const createNotificationChannel = async () => {
            if (Platform.OS === "android") {
                await notifee.createChannel({
                    id: "chat_channel",
                    name: "Chat Notifications",
                    importance: AndroidImportance.HIGH,
                });
            }
        };

        requestPermission();
        createNotificationChannel();
    }, []);

    return (
        <ChatProvider>
            <NavigationContainer>
                {currentUserId ? (
                    <TabNavigation/>
                ) : (
                    <TabNavigation /*currentUserId={currentUserId}*/ />
                )}
            </NavigationContainer>
        </ChatProvider>
    );
};

export default App;
