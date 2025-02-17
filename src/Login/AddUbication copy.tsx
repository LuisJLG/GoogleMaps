import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createAddress } from './Petitions';
import { AppContext } from '../Context/AppContext';
import { Address } from '../Model/Address';

export const AddUbicationStarter = ({ navigation }: any) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [references, setReferences] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado
  const context = useContext(AppContext);
  const [region, setRegion] = useState({
    latitude: 20.915, // Coordenadas iniciales (ejemplo: Guanajuato, México)
    longitude: -101.252,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

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
    await createAddress(Address);
    console.log('Ubicación agregada:', {
      User_Id: context.user.Id,
    });
    // Navega a otra pantalla si es necesario
    //navigation.replace('ListUbication');
  };

  // Simular carga (después de 3 segundos ocultar skeleton)
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
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
      {/* MapView */}
      <MapView
        style={styles.mapContainer}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {marker && (
          <Marker
            coordinate={marker}
            title="Ubicación seleccionada"
            description="Este es el lugar que seleccionaste"
          />
        )}
      </MapView>

      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        placeholder="Busca un lugar"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details && details.geometry && details.geometry.location) {
            const { lat, lng } = details.geometry.location;
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            setMarker({ latitude: lat, longitude: lng });

            // Asigna el número de casa con la dirección
            setHouseNumber(details.formatted_address); // Usar la dirección completa como el número de casa
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
            zIndex: 1,
          },
          textInput: {
            height: 50,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginHorizontal: 16,
            marginTop: 16,
            backgroundColor: '#f0f0f0',
          },
        }}
      />

      {/* Detalles de ubicación */}
      <View style={styles.detailsContainer}>
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
        <Pressable style={styles.addButton} onPress={handleAddLocation}>
          <Text style={styles.addButtonText}>Agregar Ubicación</Text>
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
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
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
