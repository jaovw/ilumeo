# 📌 Controle de Ponto - Ilumeo (Front-End)

Este projeto é uma **Single Page Application (SPA)** desenvolvida em **React + TypeScript** utilizando Vite, TailwindCSS e Axios. Seu objetivo é permitir que colaboradores acompanhem as **horas trabalhadas no dia** e o **histórico de pontos dos dias anteriores**, além de permitir o registro do turno.

A aplicação se comunica diretamente com uma **API específica deste mesmo projeto** (back-end em Node.js + Express), e foi construída com foco em **responsividade, usabilidade e boas práticas** como SOLID, ESLint/Prettier e testes.



## ✅ Funcionalidades principais

1. **Consulta de colaborador via matrícula**
2. **Redirecionamento para tela de detalhes com horas do dia e histórico**
3. **Visualização atualizada das horas trabalhadas**
4. **Interface moderna baseada em uma releitura do Figma**
5. **Proteção de rota para evitar acesso direto à rota de detalhes**



## 🚀 Tecnologias utilizadas

- React + Vite
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Context API
- ESLint + Prettier
- Dotenv
- SPA (Single Page Application)



## 🧠 Arquitetura

- **SPA com navegação via React Router**
- **Axios com instância centralizada e configuração via `.env`**
- **Context API** para compartilhar estado entre rotas (evita memory leaks e acesso direto indevido)
- Estrutura com `pages/`, `components/`, `services/`, `context/`
- Centralização do layout com Tailwind para total responsividade



## 🧪 Testes

Os testes estão integrados à API, conforme o escopo do projeto fullstack. Os testes de integração e unidade podem ser executados diretamente pelo repositório da API.



## 📁 Estrutura simplificada

```
src/
├── assets/
├── components/
├── context/
│   └── ColaboradorContext.tsx
├── pages/
│   ├── Home.tsx
│   └── Detail.tsx
├── services/
│   └── api.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🧭 Navegação entre telas

- A tela **Home** permite digitar a matrícula e, ao encontrar o colaborador, redireciona para `/:id`.
- A tela **Detail** só é acessível caso o colaborador tenha sido previamente buscado. Caso contrário, o usuário é redirecionado para `/`.


## 🔒 Proteções implementadas

- **Memory leak resolvido:** uso de `AbortController` para cancelar requisições pendentes.
- **Rota protegida:** o componente `Detail` redireciona para `/` caso acessado diretamente sem dados no contexto.


## 🖼️ Protótipo original e releitura

Protótipo Figma original:  
[https://www.figma.com/file/fQaTM68I4Bi8YnmFzoTNFk/Ilumeo---Teste-Fullstack](https://www.figma.com/file/fQaTM68I4Bi8YnmFzoTNFk/Ilumeo---Teste-Fullstack)

A releitura pode ser encontrada no repositório ou foi anexada à entrega.


## 📦 Instalação e execução

1. Instale as dependências:

```
yarn install
```

2. Crie o arquivo `.env` na raiz com:

```
VITE_API_URL=http://localhost:3000
```

3. Execute o projeto:

```
yarn dev
```
