import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../config/config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: []
    };
  }

  componentDidMount() {
    const { uid } = this.props.route.params; // ✅ pega o usuário logado

    firebase.database().ref(`tarefas/${uid}`).on('value', snapshot => {
      const data = snapshot.val();
      const tarefas = data
        ? Object.entries(data).map(([id, valor]) => ({ id, ...valor }))
        : [];
      this.setState({ lista: tarefas });
    });
  }

  render() {
    return (
      <View style={estilos.tela}>
        <Text style={estilos.titulo}>Home</Text>
        <ScrollView>
        {this.state.lista.map(tarefa => (
          <TouchableOpacity
            key={tarefa.id}
            style={estilos.item}
            onPress={() => this.props.navigation.navigate('Editar', { tarefa })}
          >
            <Text style={estilos.texto}>
              {tarefa.nome} {tarefa.concluida ? '✅' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
        <Button title="Nova Tarefa" onPress={() => this.props.navigation.navigate('Adicionar')} />
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 10, borderRadius: 5 }
});


export default Home;