import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function UpdateClient() {
  const route = useRoute();
  const navigation = useNavigation();
  const { client } = route.params;

  const [name, setName] = useState(client.name);
  const [address, setAddress] = useState(client.address);
  const [phone, setPhone] = useState(client.phone_number);

  const handleUpdate = async () => {
    if (!name || !address || !phone) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    try {
      await axios.put(
        `https://f2rrdchq-5000.usw3.devtunnels.ms/clients/update/${client.id}`,
        {
          name,
          address,
          phone_number: phone,
        }
      );

      Alert.alert("Éxito", "Cliente actualizado");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar el cliente");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Actualizar información del cliente</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}></TextInput>

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}></TextInput>

        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}></TextInput>

        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleUpdate}>
            <Text style={styles.textButton}>Actualizar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ae7cff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "black",
  },

  label: {
    fontSize: 18,
    marginTop: 10,
    color: "black",
  },

  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
    fontSize: 16,
    padding: 10,
    marginTop: 5,
  },

  centeredButton: {
    alignItems: "center",
    marginTop: 20,
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
