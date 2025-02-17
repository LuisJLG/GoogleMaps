// Modificaciones en Adress.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { MoreIcon } from '../../assets/SVG/MoreIcon';
import { Location } from '../../assets/SVG/Location';
import { ThemeLight } from '../Theme/Theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { URL } from '../Const/Const';
import { AppContext } from '../Context/AppContext';

/*const locations = [
  { id: '1', city: 'Guanajuato', state: 'Guanajuato', postalCode: '32568' },
  { id: '2', city: 'Celaya', state: 'Guanajuato', postalCode: '12568' },
];*/

export const Adress = () => {
  const { user } = useContext(AppContext); // Usamos el contexto para obtener el Business_Id y el usuario actual
  const [addresses, setAddresses] = useState([]); // Estado para almacenar los direcciones
  const [filteredAddresses, setFilteredAddresses] = useState([]); // Estado para almacenar los direcciones filtrados
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la barra de búsqueda
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const context = useContext(AppContext); // Usamos el contexto para el color de la tienda

  const selectAddress = (addressId) => {
    navigation.navigate('EditUbication', { addressId });
  };  

  // Llamada a la API para obtener los direcciones
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}addresses/user/4`);
      const data = await response.json();
      console.log('Direcciones:', data);
      // Excluir al usuario actual de la lista
      //const filteredData = data.filter((address: any) => address.Id !== user.Id);

      setAddresses(data); // Guardar los direcciones en el estado, excluyendo al usuario actual
      setFilteredAddresses(data); // Inicialmente mostrar todos los direcciones, excluyendo al usuario actual
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar direcciones:', error);
      setLoading(false);
    }
  };

  // Usamos useFocusEffect para que la lista de direcciones se actualice cuando la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      //if (user && user.Id) {
        fetchAddresses();
      //}
    }, [/*user.Id*/])
  );

  // Filtrar direcciones cuando el texto de búsqueda cambia
  useEffect(() => {
    const filtered = addresses.filter(address =>
      address.Location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.References?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAddresses(filtered); // Actualizar el estado de direcciones filtrados
  }, [searchQuery, addresses]);

  const renderAddress = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.addressItem}
      // Pasamos el `Id` del empleado a la pantalla de edición
      onPress={() => navigation.navigate('EditAddress', { addressId: item.Id })}
    >
      <View style={[styles.addressIcon, { backgroundColor: ThemeLight.backgrounColor }]}>
        <Text style={styles.addressInitials}>
          {item.Name ? `${item.Name[0]}${item.Name.split(' ')[1]?.[0] || ''}` : 'NN'}
        </Text>
      </View>
      <View>
        <Text style={styles.addressName}>{item.Name || 'Sin nombre'}</Text>
        <Text style={styles.addressEmail}>{item.Email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Direcciones</Text>
      </View>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar direcciones"
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery} // Actualiza el texto de búsqueda
        />
      </View>
      {/*<View style={styles.ListContainer}>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.locationCard} onPress={() => selectAddress(item.id)}>
              <Location />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>
                  {item.city}, {item.state}
                </Text>
                <Text style={styles.postalCodeText}>PC. {item.postalCode}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <TouchableOpacity style={styles.addButton}
              onPress={() => navigation.navigate('EditUbication')}>
              <MoreIcon />
              <Text style={styles.addButtonText}>Nueva dirección</Text>
            </TouchableOpacity>
          }
        />
      </View>*/}
      <View style={styles.ListContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Cargando direcciones...</Text>
        ) : (
          <FlatList
            data={filteredAddresses} // Lista filtrada de direcciones
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.locationCard}
                onPress={() => selectAddress(item.Id)}
              >
                <Location />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationText}>{item.Location}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay direcciones registradas</Text>
            }
            ListFooterComponent={
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddUbication')}
              >
                <MoreIcon />
                <Text style={styles.addButtonText}>Nueva dirección</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  ListContainer: {
    flex: 1,
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerButton: {
    fontSize: 18,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2f3b91',
    padding: 15,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#d0d0d0',
  },
  postalCodeText: {
    fontSize: 14,
    color: '#A1A1A1',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4A90E2',
  },

  /*direcciones */
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  addAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  addAddressTextContainer: {
    marginLeft: 10,
  },
  addAddressText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
  },
  addAddressPin: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FF0000',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  AddIcon: {
    backgroundColor: ThemeLight.btnBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addressIcon: {
    backgroundColor: ThemeLight.btnBackground,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addressInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  addressName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
  },
  addressEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999999',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
});
