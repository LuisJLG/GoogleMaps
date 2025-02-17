import { URL } from "../Const/Const";

export const insertUser = async (data: any) => {
    try {
        const response = await fetch(`${URL}users/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        throw error;
    }
};

export const getUserByPhone = async (phoneNumber: string) => {
    try {
        const response = await fetch(`${URL}users/getUserByPhoneNumber/${phoneNumber}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error al obtener usuario por teléfono:", error);
        throw error;
    }
}