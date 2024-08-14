# Hands-on Work VII - Universidade do Vale do Itajaí (Univali)

## Visão Geral do Projeto

Este projeto foi desenvolvido como parte da disciplina Hands-on Work VII na Universidade do Vale do Itajaí (Univali). A disciplina foca nos conceitos de Engenharia de Software e explora os paradigmas de Programação Orientada a Objetos e Programação Funcional.

O principal objetivo deste projeto é criar serviços web backend que processam dados de um sistema de gestão imobiliária e os expõem através de APIs RESTful. Os dados são obtidos de um banco de dados relacional e processados na memória utilizando técnicas de programação como `map`, `filter`, `reduce` e `forEach`.

## Escopo da Atividade

Uma grande empresa no setor de gestão imobiliária contratou o desenvolvimento de módulos de serviços web para gerar dados que serão posteriormente utilizados em painéis gráficos acessíveis via interfaces web. Os gráficos necessários incluem:

- **Gráfico de Barras:** Exibe o valor acumulado de pagamentos para cada imóvel ao longo de toda a série histórica disponível.
- **Gráfico de Dispersão/Linhas:** Exibe o total de vendas ocorridas em cada mês/ano considerando todos os dados disponíveis no banco de dados.
- **Gráfico de Pizza:** Exibe o percentual de vendas de cada tipo de imóvel (e.g., terrenos, apartamentos, salas comerciais, galpões) disponível no sistema.

## Responsabilidade do Projeto

A responsabilidade do projeto não incluiu a construção dos gráficos (frontend). Em vez disso, nosso foco foi desenvolver os serviços web necessários para acessar os dados no banco de dados, processá-los com técnicas de programação funcional e disponibilizá-los para consumo via API REST.

## Requisitos do Projeto

### Parte 1: Modelagem do Banco de Dados e Consultas SQL

- **Estrutura do Banco de Dados**:
  - Criação das tabelas para imóveis, tipos de imóveis, pagamentos e outras entidades necessárias.
  - Inserção de pelo menos 30 registros de pagamentos distribuídos em 5 meses distintos.
  - Inserção de pelo menos 8 imóveis, garantindo que cada um tenha apenas uma ocorrência na tabela de pagamentos.
- **Consulta SQL**:
  - Escrita de uma consulta SQL que realiza join entre as tabelas criadas para retornar uma estrutura de dados semelhante à do exemplo fornecido no escopo da atividade.

### Parte 2: Implementação do Backend

- **Funcionalidades Implementadas**:
  1. **Soma dos Pagamentos por Imóvel**: Uma função que retorna uma lista com os IDs dos imóveis e a soma acumulada dos pagamentos de cada imóvel.
  2. **Vendas por Mês/Ano**: Uma função que retorna uma lista de cada mês/ano e o total de vendas ocorridas no período.
  3. **Percentual por Tipo de Imóvel**: Uma função que retorna uma lista com os tipos de imóveis e o respectivo percentual no total de vendas.
- **API RESTful**:
  - Desenvolvimento de serviços RESTful usando Node.js e Express para expor as funcionalidades acima como respostas em JSON.
  - Cada função é acessível através de uma requisição GET específica.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Banco de Dados**: MySQL
- **Paradigmas de Programação**: Programação Orientada a Objetos (POO), Programação Funcional (PF)

## Como Executar o Projeto

1. **Clonar o Repositório**:

   - Clone este repositório em sua máquina local:
     ```bash
     git clone git@github.com:naiaraxavier/sistema-imobiliario.git
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd sistema-imobiliario
     ```

2. **Configurar e Executar com Docker**:

   - Certifique-se de ter o Docker e Docker Compose instalados em sua máquina.
   - Execute o seguinte comando para iniciar o banco de dados e o servidor backend usando Docker Compose:
     ```bash
     docker-compose up -d
     ```
   - Este comando irá iniciar os contêineres do banco de dados e do servidor backend. O script de inicialização no contêiner do banco de dados criará automaticamente o banco de dados e as tabelas necessárias.

3. **Verificar a Execução**:

   - Após a execução do comando anterior, o servidor backend estará rodando e poderá ser acessado via `http://localhost:3001`.
   - Certifique-se de que os contêineres estão em execução:
     ```bash
     docker-compose ps
     ```

4. **Instalar Dependências (Opcional)**:

   - Caso precise modificar ou atualizar o código, você pode instalar as dependências localmente:
     ```bash
     npm install
     ```
   - Para iniciar o servidor localmente (fora do contêiner Docker):
     ```bash
     npm run dev
     ```

5. **Endpoints da API**:
   - **GET /api/payments-summary**: Retorna um objeto JSON com a soma dos pagamentos para cada imóvel.
   - **GET /api/sales-by-month**: Retorna um objeto JSON com o total de vendas por mês/ano.
   - **GET /api/property-type-percentage**: Retorna um objeto JSON com o percentual de cada tipo de imóvel no total de vendas.

## Entregáveis do Projeto

- **Documento PDF**: Inclui scripts SQL, trechos de código e resultados dos testes realizados nos serviços REST.
- **Vídeo de Apresentação**: Um vídeo de 3 minutos demonstrando as requisições e respostas da API, o código-fonte e a estrutura do banco de dados.
