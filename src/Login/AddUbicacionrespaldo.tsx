import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Modal,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createAddress, updateAddress } from './Petitions';
import { AppContext } from '../Context/AppContext';
import { Address } from '../Model/Address';
//import BackgroundGeolocation from 'react-native-background-geolocation';

export const AddUbicationStarter = ({ navigation }: any) => {
    const [houseNumber, setHouseNumber] = useState('');
    const [references, setReferences] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [locationGranted, setLocationGranted] = useState(false);
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const context = useContext(AppContext);

    const [region, setRegion] = useState({
        latitude: 20.915, // Coordenadas iniciales
        longitude: -101.252,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

    // Comprobar si se cumplen las condiciones para habilitar el botón
    const isAddButtonEnabled = houseNumber.trim() !== '' && marker !== null;

    const handleAddLocation = async () => {
        if (!marker) {
            console.error('No se ha seleccionado una ubicación.');
            return;
        }
        const Address: Address = {
            User_Id: 1,
            Location: houseNumber,
            References: references,
            Latitude: marker.latitude,
            Longitude: marker.longitude,
        };
        await updateAddress(Address);
        console.log('Ubicación actualizada:', {
            User_Id: context.user.Id,
        });
        // Navega a otra pantalla si es necesario
        navigation.replace('ListUbication');
    };

    // Solicitar permisos de ubicación
    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                const auth = await Geolocation.requestAuthorization('always');
                if (auth === 'granted') {
                    setLocationGranted(true);
                } else {
                    console.log('Permiso de ubicación denegado para iOS');
                }
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permiso de Ubicación',
                        message: 'Necesitamos acceso a tu ubicación para mostrar tu posición en el mapa.',
                        buttonNeutral: 'Preguntar luego',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Aceptar',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setLocationGranted(true);
                } else {
                    console.log('Permiso de ubicación denegado para Android');
                    setShowPermissionModal(true); // Mostrar el modal si no se otorgaron permisos
                }
            }
        };

        requestLocationPermission();
    }, []);

    // Simular carga (después de 3 segundos ocultar skeleton)
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        // Skeleton loader
        return (
            <View style={styles.container}>
                <View style={[styles.mapSkeleton, styles.skeleton]} />
                <View style={styles.detailsContainer}>
                    <View style={[styles.inputSkeleton, styles.skeleton]} />
                    <View style={[styles.referencesSkeleton, styles.skeleton]} />
                    <View style={[styles.buttonSkeleton, styles.skeleton]} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Modal para solicitar permisos */}
            <Modal
                visible={showPermissionModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowPermissionModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Permiso de Ubicación</Text>
                        <Text style={styles.modalMessage}>
                            Necesitamos tu permiso para acceder a tu ubicación y brindarte un mejor servicio.
                        </Text>
                        <TouchableOpacity
                            style={styles.permissionButton}
                            onPress={async () => {
                                setShowPermissionModal(false);
                                await PermissionsAndroid.request(
                                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                                );
                            }}
                        >
                            <Text style={styles.permissionButtonText}>Dar Permiso</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Contenedor absoluto para evitar problemas de superposición */}
            <View style={styles.autocompleteContainer}>
                <GooglePlacesAutocomplete
                    placeholder="Busca un lugar"
                    minLength={2}
                    fetchDetails={true}
                    keyboardShouldPersistTaps="handled"
                    onPress={(data, details = null) => {
                        setIsAutocompleteOpen(false); // Cerrar al seleccionar un elemento
                        if (details?.geometry?.location) {
                            const { lat, lng } = details.geometry.location;
                            setRegion({
                                latitude: lat,
                                longitude: lng,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            });
                            setMarker({ latitude: lat, longitude: lng });
                            setHouseNumber(details.formatted_address);
                        } else {
                            console.error('Detalles no disponibles o incompletos.');
                        }
                    }}
                    query={{
                        key: 'AIzaSyBllGL0e72-MN5OfHg0tr_BPojw6C4lLwQ', // Sustituye con tu clave de API de Google
                        language: 'es',
                    }}
                    styles={{
                        container: {
                            width: '100%',
                            position: 'absolute',
                            top: 10,
                            zIndex: 10, // Mayor prioridad
                        },
                        textInput: {
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 16,
                            backgroundColor: '#f0f0f0',
                        },
                        listView: {
                            position: 'absolute',
                            top: 60,
                            left: 16,
                            right: 16,
                            backgroundColor: '#fff',
                            zIndex: 25, // Asegura que esté por encima del mapa
                            elevation: 5, // Android: levanta la lista
                        },
                    }}
                />
            </View>

            {/* MapView */}
            <MapView
                style={styles.mapContainer}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={locationGranted}
                //pointerEvents="none" // Evita que el mapa bloquee interacciones con otros elementos
                pointerEvents={isAutocompleteOpen ? 'none' : 'auto'} // Deshabilita eventos del mapa si la lista está abierta
            >
                {marker && (
                    <Marker
                        coordinate={marker}
                        title="Ubicación seleccionada"
                        description="Este es el lugar que seleccionaste"
                    />
                )}
            </MapView>

            {/* Detalles de ubicación */}
            <View style={[styles.detailsContainer, isAutocompleteOpen && { display: 'none' }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Número de la casa *"
                    value={houseNumber}
                    onChangeText={setHouseNumber}
                />
                <TextInput
                    style={[styles.input, styles.referencesInput]}
                    placeholder="Referencias"
                    value={references}
                    onChangeText={setReferences}
                    multiline
                />
                <Pressable
                    style={[
                        styles.addButton,
                        isAddButtonEnabled ? styles.addButtonEnabled : styles.addButtonDisabled,
                    ]}
                    onPress={handleAddLocation}
                    disabled={!isAddButtonEnabled}
                >
                    <Text style={styles.addButtonText}>
                        {isAddButtonEnabled ? 'Agregar Ubicación' : 'Completa los datos'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    mapContainer: {
        flex: 1,
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
        backgroundColor: '#F9F9F9',
    },
    referencesInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    addButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    addButtonEnabled: {
        backgroundColor: '#4CAF50',
    },
    addButtonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Skeleton styles
    skeleton: {
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        marginBottom: 12,
        opacity: 0.7,
        overflow: 'hidden',
    },
    mapSkeleton: {
        flex: 1,
    },
    inputSkeleton: {
        height: 40,
    },
    referencesSkeleton: {
        height: 80,
    },
    buttonSkeleton: {
        height: 50,
        marginTop: 16,
    },
});
