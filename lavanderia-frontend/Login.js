import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function Login({navigation}) {
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input}></TextInput>
        <View style={styles.centeredButton}>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Aceptar</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Crear Usuario')}><Text style={styles.textReg}>Registrate</Text></Pressable>
        </View>
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
  }

})