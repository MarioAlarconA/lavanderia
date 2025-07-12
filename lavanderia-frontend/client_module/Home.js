import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({navigation}) {

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('token')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lavanderia</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crear Cliente')}>
          <Text style={styles.textButton}>Crear Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Buscar Cliente')}>
          <Text style={styles.textButton}>Buscar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Eliminar Cliente')}>
          <Text style={styles.textButton}>Eliminar Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crear Orden')}>
          <Text style={styles.textButton}>Crear Orden</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    fontWeight: "bold",
    marginBottom: 30
  },

  label: {
    fontSize: 20
  },

  input: {
    borderWidth: 2,
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
    marginHorizontal: 10
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center"
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  logoutContainer: {
    marginTop: 20
  },

  logoutButton: {
    backgroundColor: "red"
  },

  logoutText: {
    fontSize: 14,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})
