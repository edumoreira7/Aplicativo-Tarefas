import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from "react-native";
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
    const { id, novoTitulo, tarefa } = this.state;
    const { uid } = this.props.route.params; // pega o usuário logado

    const tarefaAtualizada = {
      nome: novoTitulo,
      concluida: tarefa.concluida,
      passos: tarefa.passos,
    };

    firebase.database().ref(`tarefas/${uid}/${id}`).update(tarefaAtualizada)
      .then(() => {
        alert("Alterações salvas!");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Erro ao salvar alterações: ", error);
      });
  }


  alternarPasso(id) {
    const { tarefa } = this.state;
    const novosPassos = tarefa.passos.map(p =>
      p.id === id ? { ...p, feito: !p.feito } : p
    );

    // Se todos concluídos => tarefa concluída
    const todosConcluidos = novosPassos.every(p => p.feito);

    this.setState({
      tarefa: { ...tarefa, passos: novosPassos, concluida: todosConcluidos }
    });


    

    /*const { sound } = await Audio.Sound.createAsync(
      //require('../assets/check.mp3')
    );
    await sound.playAsync();

    
    /*if (todosConcluidos) {
      const { sound: soundFinal } = await Audio.Sound.createAsync(
        //require('../assets/completed.mp3')
      );
      await soundFinal.playAsync();
      Vibration.vibrate(1000); 
    }*/
  }

  alternarConcluidaDireto() {
    const { tarefa } = this.state;

    if (tarefa.concluida) {
      // Desmarcar tarefa (todos passos voltam a "pendente")
      const passosReset = tarefa.passos.map(p => ({ ...p, feito: false }));
      this.setState({
        tarefa: { ...tarefa, passos: passosReset, concluida: false }
      });
    } else {
      // Marcar tarefa (todos passos concluídos)
      const passosFeitos = tarefa.passos.map(p => ({ ...p, feito: true }));
      this.setState({
        tarefa: { ...tarefa, passos: passosFeitos, concluida: true }
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

        {/* Editar título */}
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Título:</Text>
        <TextInput
          value={novoTitulo}
          onChangeText={(text) => this.setState({ novoTitulo: text })}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            marginTop: 5,
            borderRadius: 6,
          }}
        />

        {/* Lista de passos */}
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Passos:</Text>
        <ScrollView style={{ maxHeight: 200, marginTop: 5 }}>
          {tarefa.passos.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => this.alternarPasso(p.id)}
            >
              <Text style={{ fontSize: 16, marginVertical: 4 }}>
                {p.feito ? '✅' : '⬜'} {p.descricao}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status geral */}
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
          Status: {tarefa.concluida ? '✅ Concluída' : '⬜ Pendente'}
        </Text>

        {/* Mensagem automática quando todos os passos forem concluídos */}
        {tarefa.passos.every((p) => p.feito) && (
          <Text style={{ marginTop: 5, color: 'green', fontWeight: 'bold' }}>
            Todos os passos concluídos ✅
          </Text>
        )}

        {/* Botão para alternar status da tarefa (marca todos os passos junto) */}
        <View style={{ marginTop: 15 }}>
          <Button
            title={tarefa.concluida ? "Desmarcar Concluída" : "Concluir Tarefa"}
            onPress={() => this.alternarConcluidaDireto()}
          />
        </View>

        {/* Remover */}
        <View style={{ marginTop: 15 }}>
          <Button
            title="Remover Tarefa"
            color="red"
            onPress={() => this.removerTarefa()}
          />
        </View>

        {/* Salvar */}
        <View style={{ marginTop: 10 }}>
          <Button title="Salvar Alterações" onPress={() => this.salvarAlteracoes()} />
        </View>
      </View>
    );

  }
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  textoDetalhe: { fontSize: 20 }
});

export default DetalhesTarefa;
