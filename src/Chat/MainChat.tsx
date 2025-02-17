import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { getDeviceToken, insertDevice, getUsers, getIdentifiers } from "./Petitions";

export const MainChat = ({
    navigation,
    currentUserId,
}: {
    navigation: any;
    currentUserId: number;
}) => {
    const [device, setDevice] = useState("");
    const [users, setUsers] = useState<{ Id: number; Username: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Obtener el token del dispositivo
            const token = await getDeviceToken();

            if (token) {
                setDevice(token);

                // Verificar si el token ya existe en la base de datos
                const existingTokens = await getIdentifiers(currentUserId);

                if (!existingTokens.some((t: any) => t.identifier === token)) {
                    const body = {
                        userId: currentUserId,
                        identifier: token,
                    };
                    await insertDevice(body);
                }
            }

            // Obtener la lista de usuarios
            const data = await getUsers();
            if (data?.users) {
                const userList = data.users
                    .filter((user: any) => user.Id !== currentUserId)
                    .map((user: any) => ({
                        Id: user.Id,
                        Username: user.Username,
                    }));
                setUsers(userList);
            }
        };

        fetchData();
    }, [currentUserId]);

    const handlePress = (userId: number, username: string) => {
        navigation.navigate("ChatView", { userId, username });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => handlePress(item.Id, item.Username)}
                    >
                        <Text style={styles.userText}>
                            <Text>{item.Id} - {item.Username}</Text>
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    userText: {
        fontSize: 16,
    },
});
