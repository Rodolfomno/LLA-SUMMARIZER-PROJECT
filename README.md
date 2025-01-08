# LLM Summarizer API

Este projeto é uma API Node.js desenvolvida com TypeScript e Express, que permite aos usuários submeter textos e receber resumos gerados por um serviço Python utilizando LangChain.
O resumo gerado é salvo com o texto original e a versao resumida e traduzido conforme o idioma solicitado pelo usuário.

## Estrutura do Projeto

- **node-api/**: Contém a implementação da API Node.js.
 - [x] - **data/data.json**: contém as informações das tasks.
  - **src/**: Contém o código-fonte da API.
    - **app.ts**: Ponto de entrada da aplicação.
    - **index.ts**: Inicia o servidor.
    - **routes/**: Define as rotas da API.
      - **tasksRoutes.ts**: Gerencia as rotas relacionadas a tarefas.
    - **repositories/**: Gerencia as tarefas em memória.
      - **tasksRepository.ts**: Implementa a lógica de armazenamento de tarefas.
- **python-llm/**: Contém a implementação do serviço Python.
  - **app/**: Contém o código-fonte do serviço Python.
    - **main.py**: Ponto de entrada da aplicação FastAPI.
    - **services/**: Implementa a lógica de resumo de texto.
      - **llm_service.py**: Interage com LangChain para gerar resumos.

## Environment

**HF_TOKEN**: Token de acesso ao Hugging Face(https://huggingface.co/settings/tokens). Caso não tenha, crie uma conta e gere um token(gratuito).

## Como Executar

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências dos projetos Node.js e Python:
   ```bash
   ./setup.sh install-node
   ./setup.sh install-python
   ```
4. Inicie a API Node.js e o serviço Python:
   ```bash
   ./setup.sh start-node
   ./setup.sh start-python
   ```
5. A API estará disponível em `http://localhost:3005`.

## Endpoints

- POST **/tasks**: Cria uma nova tarefa com o texto a ser resumido.
- GET **/tasks**: Lista todas as tarefas criadas.

# Tarefas realizadas

### No projeto Node.js

- [x] - No POST **/tasks**, a API recebe um texto e um idioma e enviar para o serviço Python para gerar o resumo no idioma solicitado.

  - [x] #### Parâmetros a ser recebidos pela API:

  - `text`: Texto a ser resumido.
  - `lang`: Idioma para qual o texto original deve ser traduzido.

  - [x] #### Idiomas suportados:

  - `pt`: Português.
  - `en`: Inglês.
  - `es`: Espanhol.
  - [x] - Caso o idioma não seja suportado, retornar um erro com status 400 e a mensagem "Language not supported".

- [x] - É ser possível acessar o resumo de uma tarefa através do endpoint GET **/tasks/:id**.

  - [x] ###  Retornar um JSON com as propriedades:

  - `id`: Identificador da tarefa.
  - `text`: Texto original.
  - `summary`: Resumo gerado pelo serviço Python.
  - `lang`: Idioma para qual o texto foi traduzido(solicitado pelo usuário).

- [x] - É ser possível remover uma tarefa através do endpoint DELETE **/tasks/:id**.
- [x] - Persistir as informações das tarefas em um arquivo JSON.

### No projeto Python

- [x] - Logica implementada de resumo de texto utilizando LangChain(Prompt) no idioma solicitado.
  ### O resumo é retornado em formato JSON, com a propriedades:
  - `summary`: Resumo gerado.

## Em ambos os projetos

- [x] - Possui uma rota inicial(/) que retorne um JSON com a propriedade `message` contendo a mensagem "API is running".

