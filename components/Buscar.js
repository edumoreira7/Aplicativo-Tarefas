import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import firebase from '../config/config'

class Buscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termo: '',
      resultados: []
    };
  }

  buscarTarefa() {
    const { uid } = this.props.route.params; // ✅ pega o uid do usuário logado

    firebase.database().ref(`tarefas/${uid}`)
      .orderByChild('nome')
      .equalTo(this.state.termo)
      .once('value', snapshot => {
        const data = snapshot.val();
        if (!data) {
          alert("Tarefa não encontrada!");
          this.setState({ resultados: [] });
        } else {
          const tarefas = Object.entries(data).map(([id, valor]) => ({ id, ...valor }));
          this.setState({ resultados: tarefas });
        }
      });
  }


  render() {
    return (
      <View style={estilos.tela}>
        <Text style={estilos.titulo}>Buscar Tarefa</Text>

        <TextInput
          placeholder="Digite o nome da tarefa"
          style={estilos.input}
          value={this.state.termo}
          onChangeText={text => this.setState({ termo: text })}
        />

        <Button title="Buscar" onPress={() => this.buscarTarefa()} />

        <ScrollView style={{ marginTop: 20 }}>
          {this.state.resultados.map(tarefa => (
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
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 10, borderRadius: 5 },
  texto: { fontSize: 18 },
});

export default Buscar;