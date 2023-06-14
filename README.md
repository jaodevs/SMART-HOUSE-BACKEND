# SMART-HOUSE-BACKEND

Este repositório contém o código-fonte do backend do projeto Smart House, desenvolvido em JavaScript utilizando a tecnologia Sequelize.

## Descrição
O SMART HOUSE BACKEND é um servidor de backend que fornece uma API RESTful para gerenciar dispositivos e funções de uma casa automatizada. O backend é construído usando JavaScript como linguagem de programação principal e Sequelize como ORM (Object-Relational Mapping) para interagir com o banco de dados.

## Funcionalidades

O backend do SMART HOUSE BACKEND possui as seguintes funcionalidades principais:

. Gerenciamento de usuários: registro, autenticação e autorização de usuários.
. Gerenciamento de dispositivos: cadastro, atualização, remoção e consulta de dispositivos.
. Controle de funções: ligar/desligar dispositivos, ajustar níveis de iluminação, temperatura, etc.
. Integração com outros sistemas: possibilidade de integração com outros sistemas ou dispositivos de automação residencial.

## Tecnologias utilizadas

- JavaScript: linguagem de programação principal do projeto.
- Node.js: ambiente de execução JavaScript usado para executar o servidor backend
- Express.js: framework web para Node.js, utilizado para construir uma API RESTful.
- Sequelize: ORM usado para interagir com o banco de dados e realizar operações de CRUD.
- Mysql: sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados do projeto

## Configuração
Para configurar e executar o projeto localmente, siga as etapas abaixo
1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. Execute yarn  pasta raiz do projeto para instalar as dependências.
4. Crie um arquivo .envna raiz do projeto e configure as variáveis ​​de ambiente necessárias. Consulte o arquivo .env.examplepara obter informações sobre as variáveis ​​necessárias.
5. Certifique-se de ter um banco de dados MySQL configurado e atualize as informações de conexão no arquivo config/database.js.
6. Execute npx sequelize-cli migration:generate --name NomeDaMigration
 migratepara criar as tabelas necessárias no banco de dados.
7. Execute yarn dev para iniciar o servidor backend.

## contribuições
https://github.com/jaodevs


