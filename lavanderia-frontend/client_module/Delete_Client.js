import { StyleSheet, Text, View, TextInput, Pressable, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { API_URL } from '../api';
import { useNavigation } from '@react-navigation/native';


export default function DeleteClient() {
  const [clientId, setClientId] = useState('')

  const navigation = useNavigation()


  const handleDelete = async () => {
    if (!clientId) {
      Alert.alert('Error', 'Debes ingresar un ID válido')
      return
    }

    try {
      const response = await fetch(`${API_URL}/clients/delete/${clientId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        Alert.alert('Error', data.error || 'No se pudo eliminar el cliente')
        return
      }

      Alert.alert(data.msg || 'Cliente eliminado')
      navigation.navigate('Home')
      setClientId('')
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor')
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}> <Text style={styles.backButtonText}>← Volver</Text></Pressable>
      <View>
        <Text style={styles.title}>Eliminar Cliente</Text>
        <Text style={styles.label}>Ingresa el ID del cliente a eliminar</Text>
        <TextInput style={styles.input} value={clientId} onChangeText={setClientId}></TextInput>
        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleDelete}><Text style={styles.textButton}>Aceptar</Text></Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#946dd3',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 15,
    padding: 8,
    marginTop: 8,
  },
  centeredButton: {
    alignItems: 'center',
    marginTop: 15,
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
    fontSize: 15,
    textAlign: 'center',
  },
  textReg: {
    marginTop: 10,
    fontSize: 15,
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
