import { URL } from "../Const/Const";
export const InsertNewUser = async (user: string, password: string, email: string) => {
   try{
    const url = `${URL}user`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            password: password,
            email: email,
        }),
    });
    const data = await response.json();
    //retornamos la data que nos devuelva el servidor
    return data ? data : { error: 'Error al insertar el usuario' };
   }catch(e){
    return { error: 'Error al insertar el usuario' };
   }
}

export const LoginUser = async (user: string, password: string) => {
    try{
        const body = {
            Email: user,
            Password: password,
        }
        const url = `${URL}login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        //retornamos la data que nos devuelva el servidor
        return data ? data : { error: 'Error al iniciar sesion' };
    }catch(e){
        return { error: 'Error al iniciar sesion' };
    }
}