import { URL } from "../Const/Const";
import messaging from "@react-native-firebase/messaging";

export const insertDevice = async (data: any) => {
    try {
        const response = await fetch(`${URL}chats/insertDeviceToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.status === 409) {
            console.log("El token ya está registrado.");
            return;
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error al insertar el token:", error);
        throw error;
    }
};

export const getIdentifiers = async (userId: number) => {
    try {
        const response = await fetch(`${URL}chats/getDeviceTokens/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await response.json();

        if (res.deviceTokens && Array.isArray(res.deviceTokens)) {
            // Mapea los tokens si están disponibles y son un array
            return res.deviceTokens.map((token: string) => token);
        } else {
            console.warn("No se encontraron tokens válidos en la respuesta.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los tokens:", error);
        throw error;
    }
};


export const getUsers = async () => {
    try {
        const response = await fetch(`${URL}chats/getUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error;
    }
};

export const getChats = async (userId1: number, userId2: number) => {
    try {
        const response = await fetch(`${URL}chats/getChats/${userId1}/${userId2}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();

        if (res.chats && Array.isArray(res.chats)) {
            // Retorna el array de chats si está presente
            return res.chats;
        } else {
            console.warn("No se encontraron chats en la respuesta.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        throw error;
    }
};


export const getMessages = async (chatId: number) => {
    try {
        const response = await fetch(`${URL}chats/getMessages/${chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await response.json();

        if (res.messages && Array.isArray(res.messages)) {
            // Retorna los mensajes si están disponibles y son un array
            return res.messages;
        } else {
            console.warn("No se encontraron mensajes en la respuesta.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        throw error;
    }
};


export const sendMessage = async (data: any) => {
    console.log("Enviando mensaje:", data);
    try {
        const response = await fetch(`${URL}chats/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log("Respuesta al enviar mensaje:", res);
        return res;
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        throw error;
    }
};

// funcion para pedir permisos de notificaciones
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        return true;
    }
    return false;
};

// funcion para obtener el device token
export const getDeviceToken = async () => {
    // si el usuario no tiene permisos, no se puede obtener el token
    const hasPermission = await requestUserPermission();
    if (!hasPermission) return null;

    try {
        // Obtiene el token del dispositivo usando la librería de Firebase
        const token = await messaging().getToken();
        return token; // Este es el deviceToken que necesitas
    } catch (error) {
        console.error("Error al obtener el token del dispositivo:", error);
        return null;
    }
};
