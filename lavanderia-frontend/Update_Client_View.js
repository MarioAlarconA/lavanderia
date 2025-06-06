import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function UpdateClient() {
  return (
    <View>

      <View>
        <Text>Actualizar información del cliente</Text>
        <Text>Nombre</Text>
        <TextInput></TextInput>
        <Text>Numero de telefono</Text>
        <TextInput></TextInput>
        <Text>Dirección</Text>
        <TextInput></TextInput>
        <Pressable><Text>Actualizar</Text></Pressable>
      </View>
    </View>
  );
}
