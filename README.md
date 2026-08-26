# 🏥 MARCÁ - Sistema de Agendamento Médico - CITEC
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/status-completo-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-Acadêmico-blue?style=for-the-badge)

---

## 📌 Sobre o Projeto

O **marca** é uma aplicação web full stack desenvolvida com **Spring Boot** (back-end) e **React + Vite** (front-end), voltada para o **agendamento de consultas médicas** em clínicas conveniadas.

O sistema permite que pacientes marquem consultas de acordo com as especialidades e clínicas disponíveis, enquanto funcionários (atendentes e responsáveis) gerenciam a agenda, liberam dias de atendimento, encaixam consultas extras e controlam encaminhamentos.

Este projeto foi desenvolvido com foco acadêmico, aplicando conceitos modernos de desenvolvimento backend com Java e integração com uma interface web dinâmica em React.

---

## 🚀 Funcionalidades

* 👤 Cadastro e autenticação de pacientes, funcionários e usuários
* 📅 Agendamento de consultas por especialidade e clínica
* 🗓️ Gerenciamento de dias de consultório (liberação/bloqueio de datas e turnos)
* 🔁 Encaixe de consultas extras na agenda
* 📨 Encaminhamentos médicos, com aprovação/reprovação e anexo de arquivos
* 🔄 Atualização de status de agendamento (aguardando, confirmado, cancelado)
* 🏢 Suporte a múltiplas clínicas e especialidades médicas
* ⏰ Rotina agendada (scheduler) para atualização automática de agendamentos
* 🔐 Autenticação e autorização com Spring Security

---

## 🧠 Como o sistema funciona

O fluxo principal do sistema é:

1. O paciente se cadastra e escolhe a especialidade/clínica desejada
2. O sistema exibe os dias e turnos liberados para atendimento
3. O paciente agenda a consulta em um horário disponível
4. Funcionários (atendentes/responsáveis) gerenciam a agenda:
   * Liberam ou bloqueiam dias de consultório
   * Encaixam consultas extras quando necessário
   * Avaliam encaminhamentos médicos (aprovar/reprovar)
   * Atualizam o status das consultas
5. Um scheduler interno mantém os agendamentos e status sempre atualizados automaticamente

---

## 🛠️ Tecnologias Utilizadas

**Back-end**
* ☕ Java 25
* 🚀 Spring Boot
* 🔐 Spring Security
* 🗄️ Spring Data JPA / Hibernate
* 🐘 PostgreSQL
* 📦 Maven
* 🔧 Lombok

**Front-end**
* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS
* 🧭 React Router DOM

---

## 📁 Estrutura do Projeto

```bash
marca/
│-- src/
│   ├── main/java/citec/marca/
│   │   ├── controllers/       # Endpoints REST (agendamento, paciente, funcionário, usuário...)
│   │   ├── services/          # Regras de negócio
│   │   ├── repositories/      # Acesso a dados (tabelas principais e auxiliares)
│   │   ├── entities/          # Entidades JPA e enums do domínio
│   │   ├── dtos/              # Records/DTOs de entrada e saída
│   │   ├── specifications/    # Consultas dinâmicas (Specification API)
│   │   └── config/            # Segurança, CORS, scheduler e tratamento de exceções
│   │
│   ├── marca-front/           # Aplicação React (Vite)
│   │   └── src/
│   │       ├── components/    # Componentes reutilizáveis (Agenda, Tabela, Cards...)
│   │       ├── telas/         # Telas: Home, Entrar, Cadastro, Agendar, Recepção...
│   │       └── config/        # Contexto de usuário logado e rotas privadas
│   │
│   └── main/resources/
│       └── application.properties
│
│-- pom.xml                    # Configuração Maven
```

---

## ⚙️ Como Executar o Projeto

### 🔽 1. Clonar o repositório
```bash
git clone https://github.com/PedroFernando04/marca.git
```

---

### 🐘 2. Configurar o banco de dados
Crie um banco PostgreSQL chamado `marca` e ajuste, se necessário, as credenciais em `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/marca
spring.datasource.username=postgres
spring.datasource.password=123456
```

---

### ▶️ 3. Executar o back-end
Se estiver usando Maven:
```bash
cd marca
mvn spring-boot:run
```
Ou execute diretamente pela sua IDE (IntelliJ ou Eclipse).

O back-end sobe em:
```bash
http://localhost:8080
```

---

### 🎨 4. Executar o front-end
```bash
cd src/marca-front
npm install
npm run dev
```

O front-end estará disponível em:
```bash
http://localhost:5173
```

---

## 📷 Demonstração
> 💡 Recomenda-se adicionar prints ou GIFs do sistema para enriquecer o projeto

---

## 🎯 Objetivo

O objetivo deste projeto é aplicar na prática conceitos de:

* Desenvolvimento web full stack com Java e React
* Arquitetura MVC e organização em camadas
* Separação de responsabilidades (controllers, services, repositories)
* Autenticação e autorização com Spring Security
* Modelagem de domínio para agendamento de consultas médicas
* Integração entre backend (API REST) e frontend (SPA)

---

## 🚧 Melhorias Futuras

* 📱 Interface responsiva para dispositivos móveis
* 🔔 Notificações de lembrete de consulta (e-mail/SMS)
* 📊 Dashboard com indicadores de atendimento
* 🔎 Filtros avançados de busca de agendamentos
* 🗂️ Histórico completo de atendimentos por paciente
* ☁️ Deploy em ambiente de nuvem

---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas alterações
4. Push para a branch
5. Abra um Pull Request

---

## 👨‍💻 Autor

Pedro Fernando
🔗 https://github.com/PedroFernando04

---

## 📄 Licença

Este projeto é de uso acadêmico e livre para estudos.
