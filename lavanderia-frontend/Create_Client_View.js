import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { API_URL } from './api';
import { useNavigation } from '@react-navigation/native';

export default function CreateClient() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const navigation = useNavigation()


  const handleCreate = async () => {
    if (!name || !address || !phoneNumber) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    try {
      const response = await fetch(`${API_URL}/clients/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          address,
          phone_number: phoneNumber,
        }),
      })

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.error || 'No se pudo crear el cliente');
        return;
      }

      Alert.alert('Cliente creado con ID: ' + data.client.id)
      setName('')
      setAddress('')
      setPhoneNumber('')
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor')
    }
  }

  return (

    <View style={styles.container}>

      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backButtonText}>← Volver</Text></Pressable>
      <View>
        <Text style={styles.title}>Crea un nuevo cliente</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName}></TextInput>
        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress}></TextInput>
        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput style={styles.input}  value={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleCreate}><Text style={styles.textButton}>Crear</Text></Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ae7cff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },


  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30
  },

  label: {
    fontSize: 20
  },

  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
    fontSize: 15,
    width: "auto"
  },

  centeredButton: {
    alignItems: 'center',
    marginTop: 15
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center"
  },

  textReg: {
    marginTop: 10,
    fontSize: 15
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
