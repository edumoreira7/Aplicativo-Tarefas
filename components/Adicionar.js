import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import firebase from '../config/config';


class Adicionar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: '',
    };
  }

  salvarTarefa() {
    const { novaTarefa } = this.state;
    const { uid } = this.props.route.params; // pega UID do usuário logado

    if (novaTarefa.trim()) {
      firebase.database()
        .ref(`tarefas/${uid}`) // salva na pasta do usuário logado
        .push({
          nome: novaTarefa,
          concluida: false
        })
        .then(() => {
          alert("Sucesso", "Tarefa salva!");
          this.setState({ novaTarefa: '' });
          this.props.navigation.navigate('Home', { uid });
        })
        .catch(error => {
          alert("Erro" + error.message);
        });
    }
  }


  render() {
    return (
      <View style={estilos.tela}>
        <Text style={estilos.titulo}>Adicionar Nova Tarefa</Text>
        <TextInput
          placeholder="Título da Tarefa"
          style={estilos.input}
          value={this.state.novaTarefa}
          onChangeText={text => this.setState({ novaTarefa: text })}
        />

        <Button title="Salvar Tarefa" onPress={() => this.salvarTarefa()} />
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default Adicionar;