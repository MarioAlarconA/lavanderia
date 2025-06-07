import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { useState } from 'react';
import { API_URL } from './api';
import { useNavigation } from '@react-navigation/native';

export default function SearchClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState([]);

  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      let url = '';
      if (name) {
        url = `${API_URL}/clients/search/name?name=${encodeURIComponent(name)}`;
      } else if (phone) {
        url = `${API_URL}/clients/search/phone?phone=${encodeURIComponent(phone)}`;
      } else {
        Alert.alert('Error', 'Ingresa un nombre o un número de teléfono');
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        Alert.alert('No encontrado', data.error || 'Error al buscar cliente');
        return;
      }

      setResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backButtonText}>← Volver</Text></Pressable>

      <View>
        <Text style={styles.title}>Buscar Cliente</Text>

        <Text style={styles.label}>Buscar por Nombre</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName}></TextInput>

        <Text style={styles.label}>Buscar por Teléfono</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone}></TextInput>

        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleSearch}><Text style={styles.textButton}>Buscar</Text></Pressable>
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>Nombre: {item.name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Teléfono: {item.phone_number}</Text>
            <Text>Dirección: {item.address}</Text>

            <Pressable
              style={styles.updateButton}
              onPress={() => navigation.navigate('Actualizar Cliente', { client: item })}
            >
              <Text style={styles.updateButtonText}>Actualizar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ae7cff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    marginTop: 10
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 15,
    padding: 8,
  },
  centeredButton: {
    alignItems: 'center',
    marginTop: 15
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  resultItem: {
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },
  updateButton: {
    marginTop: 10,
    backgroundColor: '#ffa500',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    backgroundColor: '#ffffff90',
    borderRadius: 6,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  }
})
