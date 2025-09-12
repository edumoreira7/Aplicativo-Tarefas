import React, { Component } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import firebase from "firebase"; 

class DetalhesTarefa extends Component {
  state = {
    id: null,
    tarefa: null,
    novoTitulo: ""
  };

  carregarTarefa() {
    const tarefa = this.props.route.params?.tarefa;

    if (tarefa) {
      this.setState({ tarefa, id: tarefa.id, novoTitulo: tarefa.nome });
    } else {
      firebase.database().ref('tarefas').once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const primeira = Object.entries(data)[0];
          const [id, tarefaObj] = primeira;
          this.setState({ tarefa: tarefaObj, id, novoTitulo: tarefaObj.nome });
        } else {
          this.setState({ tarefa: null, id: null });
        }
      });
    }
  }

  componentDidMount() {
    this.carregarTarefa();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params?.tarefa !== this.props.route.params?.tarefa) {
      this.carregarTarefa();
    }
  }

  salvarAlteracoes() {
    const { id, tarefa, novoTitulo } = this.state;

    if (id && tarefa) {
      firebase.database().ref('tarefas').child(id).update({
        nome: novoTitulo,
        concluida: tarefa.concluida
      })
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Erro", "Erro ao salvar alterações: " + error.message);
      });
    } else {
      this.props.navigation.navigate('Home');
    }
  }

  alternarConcluida() {
    const { id, tarefa } = this.state;

    if (id && tarefa) {
      const novoStatus = !tarefa.concluida;
      firebase.database().ref('tarefas').child(id).update({
        concluida: novoStatus
      })
      .then(() => {
        this.setState({ tarefa: { ...tarefa, concluida: novoStatus } });
      })
      .catch(error => {
        Alert.alert("Erro", "Erro ao atualizar status: " + error.message);
      });
    }
  }

  removerTarefa() {
    if (this.state.id) {
      firebase.database().ref('tarefas').child(this.state.id).remove()
        .then(() => {
          Alert.alert("Sucesso", "Tarefa removida!");
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          Alert.alert("Erro", "Erro ao remover: " + error.message);
        });
    }
  }

  render() {
    const { tarefa, novoTitulo } = this.state;

    if (!tarefa) {
      return (
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Detalhes da Tarefa</Text>
          <Text>Sem tarefas</Text>
        </View>
      );
    }

    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Detalhes da Tarefa</Text>

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Título:</Text>
        <TextInput
          value={novoTitulo}
          onChangeText={(text) => this.setState({ novoTitulo: text })}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 5 }}
        />

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
          Status: {tarefa.concluida ? '✅ Concluída' : '⬜ Pendente'}
        </Text>

        <View style={{ marginTop: 15 }}>
          <Button
            title={tarefa.concluida ? "Desmarcar Concluída" : "Marcar Concluída"}
            onPress={() => this.alternarConcluida()}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Button title="Remover Tarefa" color="red" onPress={() => this.removerTarefa()} />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button title="Salvar Alterações" onPress={() => this.salvarAlteracoes()} />
        </View>
      </View>
    );
  }
}

export default DetalhesTarefa;
