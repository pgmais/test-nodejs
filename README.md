# Descrição do Teste

## Introdução

A PGmais, está desenvolvendo uma solução para receber arquivos com informações de sues clientes e para efetuar uma análise de dados dos mesmos.


## 1. Especificação

O usuário utilizará uma API REST HTTP para postar vários arquivo **\*.csv** de tamanhos variados, constando informações de clientes. Dito isso, não é seguro acreditar na exatidão dos dados recebidos, precisando avaliar o tipo do arquivo e as informações enviadas. Um dos dados será o CEP do cliente, onde deve-se efetuar uma consulta externa para cadastrar o endereço residencial, podendo utilizar a API [ViaCEP](https://viacep.com.br) ou alguma outra de sua preferência.


## 2. Arquivos

Os arquivos postados serão sempre no formato **\*.csv**, separados por colunas, utilizando o delimitador **";"**. Onde o nome do arquivo será sempre **NOME-USUARIO_CODIGO-USUARIO.csv**, constando o nome e o código de identificação do usuário do qual pertence as informações postadas.

Quando um usuário postar um arquivo, deve-se avaliar seu nome e código de identificação para verificação de sua existência, para assim determinar a necessidade da criação de um novo usuário ou apenas adicionar as informações postadas ao seu registro no banco de dados. Por via de regra, o usuário define seu código de identificação, não deverá ter códigos repetidos no banco. Devido a isto, não deixe de reportar o usuário quando o mesmo tentar se registrar informando um código já em uso por um outro usuário.

##### Exemplo de nomes de arquivos:

```
DonaldTrump_xpto123.csv
Donald-Trump_xpto123.csv
```

##### Exemplo de linhas do arquivo:
```csv
Nome;CEP;CPF;
James Bond;000009;000008;
Chuck Norris;000010;000011;
...
```

**Obs**: O processo deve ser assíncrono e ao final do upload é necessario retornar o código de identificação do usuário criado ou já existente.

##### Exemplo de retorno do upload:

```json
{
    "_id": "xpto123",
    "name": "Donald Trump",
    "date_sent": "2019-10-11 13:30:20",
    "file_name": "DonaldTrump_xpto123.csv",
    "status": "upload_complete"
}
```

## 3. Consulta das informações.

O usuário deverá consultar as informações carregadas, enviando uma requisição com o seu código de identificação registrado. Na qual a resposta da requisição deverá ser a lista total de dados já carregados na aplicação.


##### Exemplo do retorno:
```json
[{
    "_id": 007,
    "name": "James Bond",
    "CEP": 000008,
    "CPF": 000009,
    "date_sent": "2019-10-11 13:30:20",
    "address": {
        "district": "Centro",
        "street": "Alameda Doutor Carlos de Carvalho",
        "state": "Curitiba"
    }
},
{
    "_id": 008
    ...
},{
    "_id": 009
    ...
}]
```

## 4. Remover clientes.

O usuário poderá remover as informações já carregadas na aplicação. Informe o código do cliente na requisição, a resposta deve ser as informações do cliente removido. Caso o código de identificação do cliente não exista ou já tenha sido removido, deve-se retornar uma mensagem de erro no formado JSON.

Outra operação de remoção que pode ser efetuada, é a de remoção de um usuário do sistema, está operação deverá remover **todos** os registros vinculados ao usuario removido.

##### Exemplo do retorno:

```json
{
    "_id": 007
    "date_sent": "2019-10-11 13:30:20"
    "name": "James Bond",
    "status": "deleted"
}
```

## 5. Atualizar clientes.

O usuário poderá fazer a atualização dos clientes já cadastrados na aplicação através de uma requisição com o código de identificação do cliente e as novas informações a serem atualizadas no formato JSON.

##### Exemplo do retorno:

```json
{
    "_id": 007
    "date_sent": "2019-10-11 13:30:20"
    "name": "James Bond",
    "status": "update_info"
}
```

&nbsp;

## Requisitos do Projeto:

* Fornecer os códigos fonte para avaliação.
* O desenvolvimento deve ser escrito utilizando ECMAScript com Nodejs
* Nodejs
    * Use Nodejs >= 8.
    * Utilize ExpressJS para estrutura da API.
    * Utilize qualquer outro pacote ou lib para codificação, exemplo: [Lodash](https://lodash.com/),  [Ramda](https://ramdajs.com/) etc.
* Escreva a documentação do projeto contendo:
    * Descrição;
    * Instruções de como instalar e testar;
    * Breve descrição de como foi desenvolvido (sistema operacional, editor de texto/IDE, bibliotecas, etc) .
    * Fornecer uma documentação da API, sugerimos utilizar o Swagger [OAS 2.0](https://swagger.io/specification/v2/) ou [OAS 3.0](https://swagger.io/specification/)
* Variáveis, código e strings devem estar todos em inglês.
* Utilize banco de dados relacional, sugerimos MySLQ, PostgreSQL e SQLite.

## Recomendações

* Utilize docker;
* Siga as boas práticas de API REST;
* Desenvolva testes unitários;
* Utilize boas práticas de programação [(clean code)](https://de.wikipedia.org/wiki/Clean_Code);
* Utilize boas práticas do git <span style="color:red">**(Nada de dar commits na master!!!)**</span>.
