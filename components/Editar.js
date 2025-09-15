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
    const { tarefa, uid } = this.props.route.params; // ✅ uid vem da navegação

    if (tarefa) {
      this.setState({ tarefa, id: tarefa.id, novoTitulo: tarefa.nome });
    } else {
      firebase.database().ref(`tarefas/${uid}`).once('value', snapshot => {
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
    const { uid } = this.props.route.params; // ✅

    if (id && tarefa) {
      firebase.database().ref(`tarefas/${uid}`).child(id).update({
        nome: novoTitulo,
        concluida: tarefa.concluida
      })
      .then(() => {
        this.props.navigation.navigate('Home', { uid }); // mantém uid
      })
      .catch(error => {
        alert("Erro ao salvar alterações: " + error.message);
      });
    } else {
      this.props.navigation.navigate('Home', { uid });
    }
  }

  alternarConcluida() {
    const { id, tarefa } = this.state;
    const { uid } = this.props.route.params; // ✅

    if (id && tarefa) {
      const novoStatus = !tarefa.concluida;
      firebase.database().ref(`tarefas/${uid}`).child(id).update({
        concluida: novoStatus
      })
      .then(() => {
        this.setState({ tarefa: { ...tarefa, concluida: novoStatus } });
      })
      .catch(error => {
        alert("Erro ao atualizar status: " + error.message);
      });
    }
  }

  removerTarefa() {
    const { id } = this.state;
    const { uid } = this.props.route.params; // ✅

    if (id) {
      firebase.database().ref(`tarefas/${uid}`).child(id).remove()
        .then(() => {
          alert("Tarefa removida!");
          this.props.navigation.navigate('Home', { uid }); // mantém uid
        })
        .catch(error => {
          alert("Erro ao remover: " + error.message);
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
