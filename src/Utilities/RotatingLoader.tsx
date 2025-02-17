import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';
import { ThemeLight } from '../Theme/Theme';

export const RotatingLoader = () => {
    const rotation = useRef(new Animated.Value(0)).current;  // Inicialización de la animación

    useEffect(() => {
        // Función para iniciar la animación de rotación
        const startRotation = () => {
            rotation.setValue(0);
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,  // Duración en milisegundos de una rotación completa
                easing: Easing.linear,
                useNativeDriver: true,  // Utiliza el driver nativo para una mejor performance
            }).start(() => startRotation());  // Repite la animación indefinidamente
        };
        startRotation();
    }, [rotation]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],       // Entrada de la animación desde 0 a 1
        outputRange: ['0deg', '360deg']  // Salida de la animación de 0 a 360 grados
    });

    return (
        <View style={styles.container}>
            <Animated.View                 // Animated View que contiene el spinner
                style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                <View style={styles.circle} />
            </Animated.View>
            <Image
                source={require('../../assets/Img/RavekhLogo.png')} // Asegúrate de cambiar esto por la ruta correcta de tu logo
                style={styles.logo}
                resizeMode='contain'
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
       
        width: 250,  // Asegura que el contenedor sea del tamaño del spinner
        height: 250,
        justifyContent: 'center',  // Centra el contenido verticalmente
        alignItems: 'center',  // Centra el contenido horizontalmente

    },
    spinner: {
        width: 300, // Tamaño del spinner
        height: 300,
        borderRadius: 200, // Hace que el spinner sea circular
        borderWidth: 5, // Grosor de la línea del spinner
        borderTopColor: ThemeLight.btnBackground, // Parte activa del spinner (usando el color de tu tema)
        borderLeftColor: 'rgba(255,255,255,0.7)', // Borde izquierdo blanco
        borderRightColor: 'rgba(255,255,255,0.7)', // Borde derecho blanco
        borderBottomColor: 'rgba(255,255,255,0.7)', // Borde inferior blanco
        position: 'absolute',
    },
    logo: {
        width: 200,  // Ajusta el tamaño del logo según sea necesario
        height: 200,  // Ajusta el tamaño del logo según sea necesario
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.58)',  // Fondo blanco semitransparente
        borderRadius: 100,  // Asegura que la forma sea un círculo completo
    },
    circle: {
        width: 300,  // Ajusta si es necesario para que coincida con el tamaño del spinner
        height: 300,
        borderRadius: 200,  // Asegura que la forma sea un círculo completo
        position: 'absolute',
    },


});

