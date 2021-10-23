# Ferramentas necessários
[x] inicializar o projeto
```bash 
    npm init -y
```

[x] Instalação do Express
```bash 
    npm install express 
    npm install -D @type/express
```
[x] Instalação do Prisma
```bash 
    npm install prisma 
```
[x] Instação do Typescript
```bash 
    npm install -D typescript ts-node-dev
```
[x] inicializar projeto typescript
```terminal 
    npx tsc --init
```

[x] Executando o projeto typescript via ts-node-dev
```terminal 
    npm run dev
```

[x] Instalando o prisma
```terminal 
    npm install -D prisma
```
[x] Inicializando projeto prisma
```terminal 
    npx prisma init
```
//github.com/settings/apps
configurar o OAuth

utilizar o axios como dependência e os @types/axios

utilizar insomnia para testar as rotas

[] Instalar jsonwebtoken para geração de tokens
    npm install jsonwebtoken
    npm install -D @types/jsonwebtoken

Criar modelo de tabela para o prisma
dentro da pasta prisma no arquivo schema.prisma
```schema
    model User{
        id @id @default(uuid())
        name String
        avatar_url String

        @@map("user")
    }
```
O campo que for utilizado como id, você deve informar o '@id', caso um campo seja opcional, informe o caracteres de interrogação após o tipo 'String?';
O '@@map' é utilizado para informar o nome da tabela no banco de dados.


após criação,executar comando para gerar migrate

npx prisma migrate dev

para resetar as migrates, 
npm prisma migrate reset

quando utiliza o prisma é necessário incluir o --exit-child
após o ts-node-dev.

para incluir no request um campo que não exista, crie um diretório @types, dentro dele a pasta express, e o arquivo index.d.ts dentro do diretório express.
No arquivo informe o seguinte código
```ts
    declare namespace Express{
        interface Request{
            campo_novo : tipo
        }
    }
```
Após efetuar as inserções no banco, voce pode checar tudo pelo prisma studio
```bash
    npx prisma studio
```
Após o comando, será iniciado um servidor do prisma. Top demais.

[] instalar socket.io
Para protocolo websocket
npm install socket.io
npm install -D @types/socket.io

Para executar o server do socket io.

Primeiro será necessário criar um server através do http, para assim inicializar a aplicação;
    import http from 'http';
    import { Server } from 'socket.io';

    const http = http.createServer(app);

A partir desse server, criar o server do socket;
const socket = new Server(http);


o server agora passa a ser inicializado pelo http;

http.listen(3001,() => console.log("Servidor inicializado"));


instalar o cors
npm install cors
npm install -D @types/cors

Agora para informar um cors para o socket, iremos modificar a instanção do new Server(http);

new Server(http, {
    cors: {
        origin: "*"
    }
})

Essa mudança permitirá aceitar requisição de qualquer origem.

Para efetuar o teste, se faz necessário criar um client html.
https://cdnjs.com/libraries/socket.io/4.0.1
No link acima você tem acesso aos cdnjs que permitirá você ter acesso ao client do socket





##

