import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './components/Home'
import Adicionar from './components/Adicionar'
import Editar from './components/Editar'

const Abas = createBottomTabNavigator();


class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Abas.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let icone;
              if (route.name === 'Home') icone = 'home';
              else if (route.name === 'Adicionar') icone = 'plus-box';
              else if (route.name === 'Editar') icone = 'clipboard-text';

              return <MaterialCommunityIcons name={icone} color={color} size={size} />;
            }
          })}
        >
          <Abas.Screen name="Home" component={Home} />
          <Abas.Screen name="Adicionar" component={Adicionar} />
          <Abas.Screen name="Editar" component={Editar} />
        </Abas.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
