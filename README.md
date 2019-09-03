# API RESTFUL - NodeJs + MongoDB [v 1.0.0] #
Api desenvolvida para ser utilizada como modelo.

## Tecnologias ##
* Nodejs
* MongoDB

## Validação ##
* Json Web Token

## Internacionalização ##
* A api conta com o recurso de internacionalização. Inicialmente o projeto dispõe como default os idiomas Inglês, Português.
* Os arquivos contendo todos idiomas, estão na pasta locales na raiz do projeto.
* Para adicionar um novo idioma a api, basta adionar a chave do idioma no objeto i18n.configure{locales:['en', 'pt']}.
* Os idiomas deverão ser setados nos endpoints com o parametro /lng. Ex.: https://URL_API/users

## Pré-requisitos
- **MongoDB** versão 3.2 ou superior;
- **Node.js** versão 8 ou superior;
- **Nodemon** - `npm i -g nodemon`;

## Instalação e Execução
1. Faça o clone do repositório e no terminal e navegue até a pasta;
2. Instale as dependências do projeto com `npm install`;
4. Rode a versão de desenvolvimento com `npm run dev`;

## Endpoints (Iniciais)
- / (index)
- /users
- /login

## Configurações
A Api conta com o recurso de variáveis de ambiente. Que devem ser definadas no arquivo .env que se encontra na raiz do projeto.
Inicialmente é disponibilizado um arquivo com o nome '.env-example' com algumas váriaveis default. Esse arquivo deve ser renomenado para '.env'.

## Email templates
A Api utiliza um modulo para envio dos e-mails que deve seguir as seguintes premissas:
* Os templates de e-mail criados, devem ser inseridos dentro da pasta 'emails', que se encontra na raiz do projeto;
* As variáveis dos templates devem seguir o seguinte padrão #{nome_variavel};
* Cada template deve conter a seguinte estrutura:
    * / nome_template
        - html.pug
        - subject.pug

## Autenticação
Para os endpoints que necessitam de autenticação será necessário enviar o parâmetro <X-Access-Token> no header da requisição.

## Dependências Utilizadas em Produção ##
* "bcrypt": "^3.0.4",
* "body-parser": "^1.18.2",
* "cloudinary": "^1.13.2",
* "compression": "^1.7.3",
* "consign": "^0.1.2",
* "dotenv": "^4.0.0",
* "email-templates": "^3.1.8",
* "express": "^4.16.4",
* "file-stream-rotator": "0.0.7",
* "helmet": "^3.15.1",
* "i18n": "^0.8.3",
* "jsonwebtoken": "^8.5.0",
* "mongoose": "^4.13.18",
* "morgan": "^1.9.1",
* "nodemailer": "^2.7.2",
* "pug": "^2.0.0-rc.4",
* "simple-onesignal": "^1.0.4",
* "type-of-is": "^3.5.1",
* "xmlhttprequest": "^1.8.0"

## Dependências Opcionais ##
* cloudinary: "^1.9.1"
* node-base64-image: "^1.0.4"
* simple-onesignal: "^1.0.2"
* slug: "^0.9.1"

## Dependências Dev ##
* "eslint": "^4.13.1"

## Linter
É sempre importante seguir um padrão de escrita em nossas aplicações. Com isso, utilizamos a dependência ESLint, que nos ajuda com essa questão.
Para configurar o linter, basta seguir os passos abaixo:

* Após os comandos da instalação, execute a seguinte linha de comando: './node_modules/.bin/eslint --init'
* Selecione 'Use a popular style guide'
* Selecione 'Standard'
* E por último selecione a opção JSON (Isso irá gerar um arquivo de configuração no formato jason)
* Cole esse código no arquivo .eslintrc.json

`
{
  "extends": "standard",
  "rules": {
    "no-underscore-dangle": [0, {
      "allowAfterThis": true
    }],
    "eol-last": ["error", "never"]
  },
  "globals": {
    "__": true,
    "emailjs": true
  }
}
`

## Sugestão
Utilize o Postman para testar suas chamadas. [https://www.getpostman.com/](https://www.getpostman.com/).
