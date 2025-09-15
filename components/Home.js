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
        ? Object.entries(data).map(([id, valor]) => {
            // garante que sempre tenha array de passos
            const passos = valor.passos ? valor.passos : [];

            // se não tiver passos, usa o campo concluida salvo
            // se tiver passos, calcula com base neles
            const concluida = passos.length > 0
              ? passos.every(p => p.feito)
              : !!valor.concluida;

            return {
              id,
              ...valor,
              passos,
              concluida,
            };
          })
        : [];

      this.setState({ lista: tarefas });
    });
  }

  render() {
    return (
      <View style={estilos.tela}>
        <Text style={estilos.titulo}>Tarefas</Text>
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
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 10, borderRadius: 5 },
  texto: { fontSize: 18 }
});


export default Home;