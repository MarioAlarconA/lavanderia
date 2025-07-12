import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateClient from './client_module/Create_Client_View';
import CreateUser from './Create_User_View';
import Login from './Login';
import UpdateClient from './client_module/Update_Client_View';
import Home from './client_module/Home';
import DeleteClient from './client_module/Delete_Client';
import SearchClient from './client_module/Search_Client';
import CreateOrder from './order_module/CreateOrder'


const Stack = createStackNavigator();

export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Crear Cliente" component={CreateClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Crear Usuario" component={CreateUser} options={{ headerShown: false }}/>
        <Stack.Screen name="Actualizar Cliente" component={UpdateClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Eliminar Cliente" component={DeleteClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Buscar Cliente" component={SearchClient} options={{ headerShown: false }}/>
        <Stack.Screen name="Crear Orden" component={CreateOrder} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyStack />;
}
