import { URL } from "../Const/Const";
import { Address } from "../Model/Address";

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

export const createAddress = async (Address: Address) => {
    try {
        const url = `${URL}/addresses`;

        // Crear el cuerpo de la petición
        const body = {
            User_Id: Address.User_Id,
            Location: Address.Location,
            References: Address.References,
            Latitude: Address.Latitude,
            Longitude: Address.Longitude,
        };

        console.log("cuerpo de la peticion a la base de datos", JSON.stringify(body));

        // Realizar la petición al servidor
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // Verificar el resultado
        if (!response.ok) {
            throw new Error(`Error en el registro de dirección: ${response.statusText}`);
        }

        const data = await response.json();

        // Retornar la respuesta del servidor
        return data;
    } catch (error) {
        console.error("Error en el registro de dirección:", error);
        return { error: "Error en el registro de dirección." };
    }
};

export const updateAddress = async (address: Address) => {
    try {
        const response = await fetch(`${URL}addresses/${address.Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        });
        console.log('json', JSON.stringify(address));
        const data = await response.json();
        console.log('Respuesta de la base de datos:', data);
        return true;
    } catch (e) {
        return false;
    }
}

export const getAddress = async (id: number) => {
    try {
        const response = await fetch(`${URL}addresses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (e) {
        return null;
    }
}