# Projeto Cypress Integração
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)![Udemy](https://img.shields.io/badge/Udemy-A435F0?style=for-the-badge&logo=Udemy&logoColor=white) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)


## Projeto Cypress Integração com Testes funcionais, Testes de backend, Testes de frontend

**Neste projeto, foi aplicada a ferramenta Cypress para automatizar testes de uma aplicação web, cobrindo testes funcionais, de API e de interface. Através da prática, foi possível aprofundar conhecimentos em automação de testes, gerenciamento de dados e virtualização de requisições, garantindo a qualidade e a confiabilidade da aplicação.**

**BarrigaReact**: https://barrigareact.wcaquino.me/ e http://barrigarest.wcaquino.me (API Rest)
**Conhecimento adquirido neste curso: https://www.udemy.com/course/testes-cypress**

## Frameworks e Bibliotecas utilizados
- **Cypress:** Ferramenta principal para automação de testes.
- **XPath:** XPath é uma ferramenta que permite navegar e consultar o DOM.
- **Node.js:** Ambiente de execução para JavaScript no lado do servidor.
- **JavaScript:** Linguagem de programação usada para desenvolver os testes.
- **Node.js:** Ambiente de execução para JavaScript no lado do servidor.
- **GitHub Actions:** Utilizado para configurar pipelines de integração contínua (CI), executando os testes automaticamente a cada novo commit.
- **Mochawesome:** Biblioteca de geração de relatórios em HTML para os testes automatizados.

## Cenários Testados 
**Os cenários foram organizados em três categorias: Caminho feliz, fluxos alternativos e negativos, garantindo uma cobertura de testes ampla para diferentes situações de uso.**

## Funcionalidades: Backend, Frontend, Funcional.

**1. Gerenciamento de Contas:**
- Inserção de novas contas.
- Alteração do nome de contas existentes.
- Exclusão de contas.

**2. Movimentações Financeiras:**

- Inserção de novas movimentações (despesas/receitas).
- Atualização do status de movimentações.
- Remoção de movimentações.

**3. Verificação de Saldo:**

- Consulta de saldo atualizado das contas.
- Ajuste do saldo após alteração em movimentações.

**4. Autenticação de Usuário:**

- Login de usuário com credenciais válidas.
- Validação de erros em tentativas de login.

**5. Validação de Restrições:**

- Erro ao tentar criar contas duplicadas.
- Erro ao tentar salvar movimentações ou contas com dados inválidos.

**6. Testes de Responsividade:**

- Verificação da visibilidade de elementos em diferentes tamanhos de tela (dispositivos móveis e tablets).


## Instalação e Configuração

1. Clone o repositório:
``` bash
git clone https://github.com/AndersoonDev/Projeto-CypressIntegracao.git
```
2. Acesse a pasta do projeto:
``` bash
cd seu-projeto
```
3. Instale as dependências:
``` bash
npm install
```
## Como Executar os Testes
1. Para rodar os testes em modo interativo:
``` bash
npx cypress open
```
2. Para rodar os testes em modo headless (no terminal):
``` bash
npx cypress run
```

## Arquivos de Suporte e Fixação

- **fixtures/:**  Armazena dados fixos em arquivos JSON, que são usados para simular inputs e facilitar testes com dados repetitivos.

- **support/commands.js:**  Define comandos customizados do Cypress, como **cy.getToken()** para simplificar a autenticação em múltiplos testes.

- **support/locators.js:**  Define comandos customizados do Cypress, como **cy.get(loc.MENU.HOME)** ,ajudam a manter o código mais limpo e legível e reutilizar em múltiplos testes.

## Relatórios de Teste
Os relatórios dos testes são gerados utilizando Mochawesome e estão disponíveis na pasta **reports/html/index.html**. Esses relatórios incluem uma visão detalhada de cada execução, com status de sucesso ou falha para cada teste.

## CI/CD com GitHub Actions
Este projeto utiliza **GitHub Actions** para executar os testes automaticamente a cada novo push. O arquivo de configuração **(.github/workflows/cypress-ci.yml)** define as etapas para instalação das dependências, execução dos testes e geração dos relatórios.

## Licença
Este projeto está licenciado sob a MIT License.