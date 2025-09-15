# 📋 App de Tarefas com Firebase

Aplicativo de tarefas desenvolvido em React Native com Expo, utilizando Firebase Authentication para login/cadastro e Realtime Database para salvar as tarefas de cada usuário.

## Funcionalidades

🔑 Cadastro e login de usuários com Firebase Authentication

📝 Adicionar novas tarefas (cada usuário só vê as suas próprias)

✅ Marcar tarefas como concluídas ou desmarcar

✏️ Editar título da tarefa

🗑️ Excluir tarefas

🔍 Buscar tarefas pelo nome

📌 Suporte a passos dentro de uma tarefa (subtarefas)

## Tecnologias Utilizadas

React Native
 com Expo

Firebase Authentication

Firebase Realtime Database

React Navigation

📂 Estrutura do Projeto  
📦 meu-app  
 ┣ 📂 components  
 ┃ ┣ 📜 Home.js        → Lista de tarefas do usuário  
 ┃ ┣ 📜 Adicionar.js   → Tela para adicionar nova tarefa  
 ┃ ┣ 📜 Buscar.js      → Buscar tarefas pelo nome  
 ┃ ┣ 📜 Detalhes.js    → Detalhes da tarefa (editar, concluir, excluir)  
 ┣ 📂 config  
 ┃ ┗ 📜 config.js      → Configuração do Firebase  
 ┣ 📜 App.js           → Estrutura principal de navegação, e páginas Login e Cadastrar  
 ┗ 📜 README.md  

## Como rodar o projeto

Clone este repositório:

git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo


Instale as dependências:

npm install


Configure o Firebase:

Crie um projeto no Firebase Console

Ative Authentication (Email/Password) e Realtime Database

Copie suas credenciais e substitua no arquivo config/config.js

Exemplo:
<pre>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-app.firebaseapp.com",
  databaseURL: "https://seu-app.firebaseio.com",
  projectId: "seu-app",
  storageBucket: "seu-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
</pre>

Rode o app:

npx expo start

Abra no celular com o aplicativo Expo Go ou gere um APK com:

eas build -p android

## Screenshots
<img width="402" height="511" alt="Captura de tela 2025-09-15 164119" src="https://github.com/user-attachments/assets/e941fb62-2994-46a4-bef5-19b34235d855" />
<img width="402" height="511" alt="Captura de tela 2025-09-15 164110" src="https://github.com/user-attachments/assets/6997bff5-bb93-4661-b8f0-3bb307d0710b" />
<img width="405" height="739" alt="Captura de tela 2025-09-15 164209" src="https://github.com/user-attachments/assets/53bbf8bf-7693-4a10-83f7-ed83ec1e45b2" />
<img width="405" height="739" alt="Captura de tela 2025-09-15 164225" src="https://github.com/user-attachments/assets/c3172792-1aec-4e1e-afc0-daf2624d3c43" />
<img width="408" height="747" alt="Captura de tela 2025-09-15 164306" src="https://github.com/user-attachments/assets/83b8055c-6114-4543-b221-eb6de3ecc219" />


