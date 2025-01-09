# Sistema de Gerenciamento de Estacionamento

## Descrição
Este projeto é um sistema de gerenciamento de estacionamento, que inclui:
- **Login para dois tipos de usuários**: Administrador e Funcionário.
- **Gerenciamento de tickets**: Registra entradas e saídas de veículos.
- **Controle de tarifas**: Somente o ADMIN pode alterar as tarifas.
- **Relatórios**: Gera relatórios diários em formato JSON com dados sobre os tickets.

## Estrutura do Projeto

estacionamento/
├── admin.html          # Página para o ADMIN
├── funcionario.html    # Página para o Funcionário
├── index.html          # Tela de login
├── README.md           # Documentação do projeto
├── css/
│   └── style.css       # Arquivo de estilos
├── js/
│   ├── auth.js         # Lógica de autenticação
│   ├── relatorios.js   # Geração de relatórios
│   ├── tarifa.js       # Gerenciamento de tarifas
│   └── ticket.js       # Gerenciamento de tickets
├── data/
│   └── convenios.json  # Dados de convênios


## Funcionalidades
1. **Login**:
   - Administrador: Acesso à gestão de tarifas e relatórios.
   - Funcionário: Acesso à gestão de tickets.

2. **Gerenciamento de Tickets**:
   - Registro de entrada e saída de veículos.
   - Cálculo do valor pago por cada ticket.

3. **Controle de Tarifas**:
   - Alteração dinâmica da tarifa pelo ADMIN.

4. **Relatórios**:
   - Relatório diário gerado em formato JSON, com opção de download.



5. Login com:
   - **ADMIN**: 
     - Usuário: `admin`
     - Senha: `1234`
   - **Funcionário**:
     - Usuário: `funcionario`
     - Senha: `abcd`



