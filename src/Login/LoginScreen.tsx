import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { insertUser, getUserByPhone } from "./Petitions";

export const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: (userId: number) => void }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const [code, setCode] = useState("");

    const sendVerification = async () => {
        if (!phoneNumber) {
            Alert.alert("Error", "Ingresa un número de teléfono válido.");
            return;
        }
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setVerificationId(confirmation.verificationId);
            Alert.alert("Código enviado", "Revisa tu SMS para el código de verificación.");
        } catch (error) {
            console.error("Error al enviar SMS:", error);
            Alert.alert("Error", "No se pudo enviar el SMS.");
        }
    };

    const verifyCode = async () => {
        if (!verificationId || !code) {
            Alert.alert("Error", "Ingresa el código de verificación.");
            return;
        }
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, code);
            await auth().signInWithCredential(credential);

            // Buscar o crear usuario en la base de datos
            const user = await getUserByPhone(phoneNumber);
            if (!user.message) {
                onLoginSuccess(user.Id); // Notificamos el éxito del login con el ID del usuario
            } else {
                const newUser = {
                    Name: "Nuevo Usuario",
                    Username: `user_${Date.now()}`,
                    PhoneNumber: phoneNumber,
                    Image: "",
                };
                const createdUser = await insertUser(newUser);
                console.log("createdUser");
                console.log(createdUser);
                onLoginSuccess(createdUser); // Notificamos con el nuevo ID creado
            }
        } catch (error) {
            console.error("Error al verificar código:", error);
            Alert.alert("Error", "Código de verificación incorrecto.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            {!verificationId ? (
                <>
                    <TextInput
                        placeholder="Número de teléfono (+123456789)"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                    <Button title="Enviar Código SMS" onPress={sendVerification} />
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="Código de verificación"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        style={styles.input}
                    />
                    <Button title="Verificar Código" onPress={verifyCode} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 16,
        borderRadius: 4,
    },
});
