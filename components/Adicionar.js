import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import firebase from '../config/config';


class Adicionar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: '',
      novoPasso: '',
      passos: []
    };
  }

  adicionarPasso() {
    const id = this.state.passos.length + 1;
    const passo = { id, descricao: this.state.novoPasso, feito: false };
    this.setState({ passos: [...this.state.passos, passo], novoPasso: '' });
  }

  salvarTarefa() {
    const { novaTarefa, passos } = this.state;
    const { uid } = this.props.route.params;

    if (!uid) {
      alert("Usuário não identificado!");
      return;
    }

    if (novaTarefa.trim()) {
      const ref = firebase.database().ref(`tarefas/${uid}`).push();
      
      ref
        .set({
          id: ref.key,
          nome: novaTarefa,
          passos: passos,
          concluida: false, 
        })
        .then(() => {
          alert("Tarefa salva!");
          this.setState({ novaTarefa: '', passos: []});
          this.props.navigation.navigate('Home', { uid });
        })
        .catch(error => {
          alert("Erro ao salvar: " + error.message);
        });
    } else {
      alert("Digite uma tarefa!");
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

        <TextInput
          placeholder="Novo Passo"
          style={estilos.input}
          value={this.state.novoPasso}
          onChangeText={text => this.setState({ novoPasso: text })}
        />
        <Button title="Adicionar Passo" onPress={() => this.adicionarPasso()} />

        <ScrollView style={{ marginVertical: 10 }}>
          {this.state.passos.map(p => (
            <Text key={p.id}>- {p.descricao}</Text>
          ))}
        </ScrollView>

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