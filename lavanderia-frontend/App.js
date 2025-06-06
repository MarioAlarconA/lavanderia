import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateClient from './Create_Client_View';
import CreateUser from './Create_User_View';
import Login from './Login';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Crear Cliente" component={CreateClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Crear Usuario" component={CreateUser} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyStack />;
}
