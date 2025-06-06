import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>Crea un nuevo cliente</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.label}>Numero de telefono</Text>
        <TextInput style={styles.input}></TextInput>
        <View style={styles.centeredButton}>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Crear</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
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
    borderRadius:10,
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