# Recuperação de senha

   **RN**

      - O Link eviado por e-mail para resetar senha deve espirar em 2h;
      - O usuario precisa confirmar a nova senha ao resetar;

   **RF**

      - O usuário deve poder recuperar sua senha informando o seu e-mail;
      - O usuário deve receber um e-mail com instruçõess de recuperação de senha;
      - O usuário deve poder resetar sua senha;

   **RNF**

      - Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
      - Utilizar Amazon SES para envios em produção;
      - O envio de e-mails deve acontecer em segundo plano (background job);

# Atualização do perfil

   **RN**
      - O usuario não pode alterar seu e-mail para um email ja utilizado;
      - para atualizar sua senha, o usuario deve informar sua senha antiga;
      - para atualizar sau senha, o usaurio precisa confirmar a nova senha;

   **RF**
      - O usuario deve poder atualizar seu nome, email e senha;

# Painel do Prestador

   **RN**
      - A notificacao deve ter um status de 'Lida' ou 'Não Lida';

   **RF**
      - O usuario deve poder listar seus agendamentos de um dia especifico;
      - O prestador deve receber uma notificacao sempre que houver um novo agendamento;
      - O prestador deve poder visualizar as notificacoes não lidas;


   **RNF**
      - Os agendamentos do prestador devem ser salvos em cache;
      - As notificacoes do prestador devem ser armazenadas no MongoDB;
      - As notificacoes do prestaodor devem ser enviadas em tempo real com SOCKET.IO;


# Agendamento de serviços

   **RN**
      - Cada agendamento deve durar 1h exatamente;
      - Os agendamentos devem estar disponiveis entre 8h às 18h (Primeiro as 8h e ultimo as 17h);
      - O usuario não pode agendar em um horario ja ocupado;
      - O usuario não pode agendar em um horario que já passou;
      - O usuario não pode agendar seviços consigo mesmo;


   **RF**
      - O usaurio deve pdoer listar todos os prestadores de servico cadastrado;

      - O usuario deve poder listar os dias de um mês com pelo menos um horario disponivel de um prestador;

      - O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;

      - O usuario deve poder realizar um novo agendamento com um prestador;

   **RNF**
      - A listagem de prestadores deve ser armazenada em cache;


