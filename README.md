# Catálogo de Leite - Fullstack Web Varejo 360

## Tecnologias Utilizadas

- **Backend:** Java 17, Spring Boot 4.0.5, Spring Data JPA, Hibernate.
- **Frontend:** React (Vite), Axios, CSS3 (Identidade Visual fiel ao Figma).
- **Banco de Dados:** PostgreSQL 15 (via Docker Compose).

---

## Como Executar o Backend

### Pré-requisitos
* Java 17 instalado.
* Docker e Docker Compose instalados.
* Maven (utilize o wrapper `./mvnw` incluso).

### Passos
1. **Subir o Banco de Dados:**
   Abra o terminal na pasta catalogo-leite-back (onde está o arquivo `docker-compose.yml`) e execute:
   ```bash
   docker-compose up -d

Nota: O banco será inicializado na porta 5433 conforme configurado no application.properties.

2. **Executar a aplicação**
    Ainda na pasta do backend e execute:
    ```bash
    ./mvnw spring-boot:run

## Como Executar o Frontend

### Pré-requisitos
* Node.js (v18 ou superior).

### Passos

1. **Instalar dependências:**
    Entre na pasta do frontend
    ```bash
    npm install

2. **Executar em modo de desenvolvimento:**
    ```bash
    npm run dev

O frontend estará disponível em: http://localhost:5173

