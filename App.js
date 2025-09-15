import React from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from './config/config';

import Home from './components/Home';
import Adicionar from './components/Adicionar';
import Editar from './components/Editar';
import Buscar from './components/Buscar';

const Abas = createBottomTabNavigator();
const Pilha = createStackNavigator();

// --- Tela de Login ---
class Login extends React.Component {
  state = { usuario: '', senha: '' };

  logar = () => {
    const email = this.state.usuario.toLowerCase();
    const password = this.state.senha.toLowerCase();

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // ✅ aqui está o objeto do usuário logado
        const user = userCredential.user;  
        const uid = user.uid;
        Alert.alert("Logado!", "Login realizado com sucesso!");
        this.props.navigation.replace("AppTabs", { uid, email });
      })
      .catch(error => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          alert("Formato do email inválido");
        } else if (errorCode === "auth/user-not-found") {
          alert("Usuário não encontrado");
        } else if (errorCode === "auth/wrong-password") {
          alert("Senha incorreta");
        } else {
          alert("Erro: " + error.message);
        }
      });
  };

  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={estilos.titulo}>Logar</Text>
        <Text style={estilos.texto}>Usuário:</Text>
        <TextInput style={estilos.input} onChangeText={texto => this.setState({ usuario: texto })} />
        <Text style={estilos.texto}>Senha:</Text>
        <TextInput style={estilos.input} secureTextEntry onChangeText={texto => this.setState({ senha: texto })} />
        <Button title="Login" onPress={this.logar} />
        <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 15, alignSelf: 'center', marginVertical: 5 }}>Não tem Cadastro?</Text>
          <Button
            title="Cadastre-se"
            onPress={() => this.props.navigation.navigate("Cadastro")}
          />
        </View>
      </View>
      
    );
  }
}

// --- Tela de Cadastro ---
class Cadastro extends React.Component {
  state = { user: '', password: '' };

  gravar = () => {
    const email = this.state.user.toLowerCase();
    const password = this.state.password.toLowerCase();

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        this.props.navigation.goBack();
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={estilos.titulo}>Cadastrar</Text>
        <Text style={estilos.texto}>Usuário:</Text>
        <TextInput style={estilos.input} onChangeText={texto => this.setState({ user: texto })} />
        <Text style={estilos.texto}>Senha:</Text>
        <TextInput style={estilos.input} secureTextEntry onChangeText={texto => this.setState({ password: texto })} />
        <Button title="Cadastrar" onPress={this.gravar} />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, alignSelf: 'center', marginVertical: 5 }}>Já tenho Cadastro</Text>
          <Button
            title="Logar"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }
}

// --- Abas do App (Home, Adicionar, Detalhes, Buscar) ---
function AppTabs({ route }) {
  // ✅ pega os dados passados no login
  const { uid, email } = route.params;
  return (
    <Abas.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icone;
          if (route.name === 'Home') icone = 'home';
          else if (route.name === 'Adicionar') icone = 'plus-box';
          else if (route.name === 'Editar') icone = 'clipboard-text';
          else if (route.name === 'Buscar') icone = 'magnify';
          return <MaterialCommunityIcons name={icone} color={color} size={size} />;
        },
        headerShown: false,
      })}
    >
      <Abas.Screen name="Home" component={Home} initialParams={{ uid, email }}/>
      <Abas.Screen name="Adicionar" component={Adicionar} initialParams={{ uid, email }}/>
      <Abas.Screen name="Editar" component={Editar} initialParams={{ uid, email }}/>
      <Abas.Screen name="Buscar" component={Buscar} initialParams={{ uid, email }}/>
    </Abas.Navigator>
  );
}

// --- App principal com Pilha ---
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Pilha.Navigator screenOptions={{ headerShown: false }}>
          <Pilha.Screen name="Login" component={Login} />
          <Pilha.Screen name="Cadastro" component={Cadastro} />
          <Pilha.Screen name="AppTabs" component={AppTabs} />
        </Pilha.Navigator>
      </NavigationContainer>
    );
  }
}

const estilos = StyleSheet.create({
  titulo: { fontSize: 30, alignSelf: 'center', marginVertical: 5 },
  texto: { fontSize: 20, alignSelf: 'center', marginVertical: 5 },
  input: { height: 50, padding: 5, fontSize: 25, borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 8 }
});
