const DiagramTypes = {
    flowchart: {
        title: "Arquitetura Completa do Sistema",
        icon: "🔧",
        content: `
        flowchart TD
            %% Estilos para Subgraphs Principais
            classDef sistemaPrincipalStyle fill:#E8F5E9,stroke:#2E7D32,color:#1B5E20,stroke-width:4px,rx:20px
            classDef frontendStyle fill:#E3F2FD,stroke:#1976D2,color:#0D47A1,stroke-width:4px,rx:20px
            classDef backendStyle fill:#F3E5F5,stroke:#7B1FA2,color:#4A148C,stroke-width:4px,rx:20px
            classDef databaseStyle fill:#FFF3E0,stroke:#F57C00,color:#E65100,stroke-width:4px,rx:20px
            classDef securityStyle fill:#FFEBEE,stroke:#C62828,color:#B71C1C,stroke-width:4px,rx:20px
            classDef monitorStyle fill:#E0F2F1,stroke:#00897B,color:#004D40,stroke-width:4px,rx:20px
            classDef integrationStyle fill:#F3E5F5,stroke:#8E24AA,color:#4A148C,stroke-width:4px,rx:20px

            %% SISTEMA PRINCIPAL
            subgraph SistemaPrincipal["🏢 SISTEMA PRINCIPAL"]
                %% FRONTEND
                subgraph Frontend["🎨 INTERFACE DO USUÁRIO"]
                    subgraph InterfaceUsuario["📱 Área do Usuário"]
                        Dashboard["📊 Painel de Controle"]
                        Chat["💬 Conversas"]
                        Configuracoes["⚙️ Configurações"]
                    end

                    subgraph GerenciamentoUI["🎯 Gestão de Interface"]
                        Temas["🎨 Temas"]
                        Idiomas["🌐 Idiomas"]
                        Layouts["📐 Layouts"]
                    end

                    subgraph ComponentesUI["🧩 Componentes"]
                        Formularios["📝 Formulários"]
                        Tabelas["📊 Tabelas"]
                        Graficos["📈 Gráficos"]
                    end
                end

                %% BACKEND
                subgraph Backend["⚙️ NÚCLEO DO SISTEMA"]
                    subgraph ServidorPrincipal["🖥️ Servidor Principal"]
                        API["🔌 API"]
                        Autenticacao["🔐 Autenticação"]
                        ProcessamentoMensagens["📨 Processamento"]
                    end

                    subgraph GerenciamentoTarefas["📋 Gestão de Tarefas"]
                        Agendador["⏰ Agendador"]
                        FilaProcessamento["📥 Fila"]
                        Trabalhadores["👥 Workers"]
                    end

                    subgraph ServicosCore["🛠️ Serviços Core"]
                        GerenciadorUsuarios["👥 Usuários"]
                        GerenciadorConteudo["📄 Conteúdo"]
                        GerenciadorArquivos["📁 Arquivos"]
                    end
                end

                %% BANCO DE DADOS
                subgraph BancoDados["💾 ARMAZENAMENTO DE DADOS"]
                    subgraph Armazenamento["📦 Sistema de Armazenamento"]
                        PostgreSQL["🐘 PostgreSQL"]
                        Redis["⚡ Cache"]
                        RabbitMQ["🐰 Filas"]
                    end

                    subgraph GerenciamentoDados["🗄️ Gestão de Dados"]
                        Backup["📦 Backup"]
                        Replicacao["🔄 Replicação"]
                        Migracao["📤 Migração"]
                    end

                    subgraph Cache["⚡ Sistema de Cache"]
                        CacheAplicacao["💾 Cache App"]
                        CacheAPI["🔌 Cache API"]
                        CacheConsultas["🔍 Cache Queries"]
                    end
                end

                %% SEGURANÇA
                subgraph Seguranca["🔒 SISTEMA DE SEGURANÇA"]
                    subgraph ControleAcesso["🛡️ Controle de Acesso"]
                        Autenticacao["🔐 Autenticação"]
                        Autorizacao["🔑 Autorização"]
                        Criptografia["🔒 Criptografia"]
                    end

                    subgraph Protecao["🛡️ Proteção"]
                        Firewall["🔥 Firewall"]
                        AntiDDoS["🛡️ Anti-DDoS"]
                        WAF["🔒 WAF"]
                    end

                    subgraph Auditoria["📋 Auditoria"]
                        LogsSeguranca["📝 Logs"]
                        Alertas["🚨 Alertas"]
                        Relatorios["📊 Relatórios"]
                    end
                end

                %% MONITORAMENTO
                subgraph Monitoramento["📊 SISTEMA DE MONITORAMENTO"]
                    subgraph MonitoramentoSistema["📈 Monitoramento Geral"]
                        Metricas["📊 Métricas"]
                        Registros["📝 Registros"]
                        Alertas["🚨 Alertas"]
                    end

                    subgraph AnaliseDesempenho["📊 Análise de Desempenho"]
                        Desempenho["⚡ Performance"]
                        Disponibilidade["✅ Uptime"]
                        Latencia["⏱️ Latência"]
                    end

                    subgraph Visualizacao["👁️ Visualização"]
                        Dashboards["📊 Dashboards"]
                        Graficos["📈 Gráficos"]
                        Relatorios["📑 Relatórios"]
                    end
                end

                %% INTEGRAÇÕES
                subgraph Integracoes["🔌 SISTEMA DE INTEGRAÇÕES"]
                    subgraph ServicosExternos["🌐 Serviços Externos"]
                        WhatsApp["📱 WhatsApp"]
                        Email["📧 Email"]
                        API["🔌 API"]
                    end

                    subgraph GerenciamentoAPI["🔌 Gestão de API"]
                        Gateway["🚪 Gateway"]
                        Documentacao["📚 Docs"]
                        Versionamento["🔢 Versões"]
                    end

                    subgraph Webhooks["🔗 Webhooks"]
                        Eventos["⚡ Eventos"]
                        Callbacks["🔄 Callbacks"]
                        Retentativas["🔁 Retry"]
                    end
                end
            end

            %% Conexões Expandidas
            %% Fluxo de Autenticação
            JWT --> GerenciadorToken
            GerenciadorToken --> ArmazenamentoSessao
            ArmazenamentoSessao --> TokenAtualizacao
            TokenAtualizacao --> JWT

            Criptografia --> GerenciadorToken
            LimiteRequisicoes --> MetodosAutenticacao
            BloqueioIP --> MetodosAutenticacao

            Funcoes --> ACL
            ACL --> Politicas
            Politicas --> PermissoesUsuario

            %% Fluxo de Usuário
            GerenciadorUsuarios --> GruposUsuarios
            GruposUsuarios --> FuncoesUsuarios
            FuncoesUsuarios --> PermissoesUsuarios
            PermissoesUsuarios --> AuditoriaUsuarios

            %% Fluxo de Tickets
            GerenciadorTickets --> FilaTickets
            FilaTickets --> RoteamentoTickets
            RoteamentoTickets --> AutomacaoTickets
            AutomacaoTickets --> MetricasTickets

            %% Fluxo WhatsApp
            Conexao --> QRCode
            QRCode --> Status
            Status --> ManipuladorMensagens
            ManipuladorMensagens --> ManipuladorMidia

            %% Queue Flow
            BullQueue --> Workers
            Workers --> JobScheduler
            JobScheduler --> RetryMechanism
            RetryMechanism --> QueueMonitor

            %% API Flow
            APIGateway --> REST
            APIGateway --> GraphQL
            APIGateway --> WebSocket
            APIGateway --> Webhooks

            %% Frontend Expandido
            subgraph Frontend["🎨 Frontend"]
                subgraph Dashboard["📊 Dashboard"]
                    subgraph Metricas["📈 Métricas"]
                        Atendimentos["📊 Atendimentos"]
                        Conversas["💬 Conversas"]
                        Tickets["🎫 Tickets"]
                        Agentes["👥 Agentes"]
                    end

                    subgraph Graficos["📊 Visualização"]
                        GraficoTempo["⏱️ Tempo Médio"]
                        GraficoVolume["📈 Volume"]
                        GraficoSatisfacao["😊 Satisfação"]
                        GraficoDesempenho["⚡ Desempenho"]
                    end

                    subgraph Filtros["🔍 Filtros"]
                        Periodo["📅 Período"]
                        Departamento["🏢 Departamento"]
                        Equipe["👥 Equipe"]
                        Canal["📱 Canal"]
                    end

                    subgraph DashActions["⚡ Ações"]
                        Exportar["📤 Exportar"]
                        Compartilhar["🔗 Compartilhar"]
                        Configurar["⚙️ Configurações"]
                        Atualizar["🔄 Atualizar"]
                    end
                end

                subgraph Chat["💬 Conversas"]
                    subgraph ChatInterface["🖥️ Área de Trabalho"]
                        ListaContatos["👥 Lista Contatos"]
                        ListaConversas["💬 Lista Conversas"]
                        AreaMensagens["📝 Área Mensagens"]
                        BarraStatus["📊 Barra Status"]
                    end

                    subgraph ChatActions["📤 Ações"]
                        EnviarMensagem["📤 Enviar"]
                        ReceberMensagem["📥 Receber"]
                        AnexarArquivo["📎 Anexar"]
                        GravarAudio["🎤 Gravar"]
                    end

                    subgraph ChatTools["🛠️ Ferramentas"]
                        RespostasRapidas["⚡ Respostas Rápidas"]
                        Modelos["📋 Modelos"]
                        Etiquetas["🏷️ Etiquetas"]
                        Transferencia["🔄 Transferir"]
                    end
                end

                subgraph Contacts["📞 Contatos"]
                    subgraph ContactUI["👥 Interface"]
                        ContactList["📋 Lista"]
                        ContactForm["📝 Formulário"]
                        ContactDetails["📋 Detalhes"]
                        ImportExport["📤 Import/Export"]
                    end

                    subgraph ContactData["💾 Dados"]
                        ContactDB["💾 Banco"]
                        ContactTags["🏷️ Tags"]
                        ContactGroups["👥 Grupos"]
                        ContactHistory["📅 Histórico"]
                    end

                    subgraph ContactActions["⚡ Ações"]
                        AddContact["➕ Adicionar"]
                        EditContact["✏️ Editar"]
                        DeleteContact["❌ Deletar"]
                        ImportContacts["📥 Importar"]
                    end
                end

                subgraph Settings["⚙️ Configurações"]
                    subgraph General["🔧 Geral"]
                        Language["🌐 Idioma"]
                        Theme["🎨 Tema"]
                        Timezone["🕒 Fuso Horário"]
                        Sound["🔊 Som"]
                    end

                    subgraph UserPrefs["👤 Preferências"]
                        Notifications["🔔 Notificações"]
                        Privacy["🔒 Privacidade"]
                        Shortcuts["⌨️ Atalhos"]
                        Display["🖥️ Visualização"]
                    end

                    subgraph Integration["🔌 Integrações"]
                        APIKeys["🔑 Chaves API"]
                        Webhooks["🔌 Webhooks"]
                        OAuth["🔐 Autenticação OAuth"]
                        Sync["🔄 Sincronização"]
                    end
                end

                subgraph Profile["👤 Perfil"]
                    subgraph PersonalInfo["📝 Informações Pessoais"]
                        UserData["👤 Dados do Usuário"]
                        UserPreferences["⚙️ Preferências"]
                        UserActivity["📊 Atividade"]
                        UserSecurity["🔒 Segurança"]
                    end

                    subgraph Security["🔐 Segurança"]
                        Password["🔑 Senha"]
                        TwoFactor["🔐 Autenticação em Dois Fatores"]
                        Sessions["📱 Sessões"]
                        Logs["📝 Registros"]
                    end
                end

                subgraph Reports["📈 Relatórios"]
                    subgraph ReportTypes["📊 Tipos de Relatórios"]
                        Performance["📈 Desempenho"]
                        Analytics["📉 Análises"]
                        Metrics["📏 Métricas"]
                        KPIs["🎯 Indicadores"]
                    end

                    subgraph ReportData["💾 Dados"]
                        Messages["💬 Mensagens"]
                        Users["👥 Usuários"]
                        TicketData["🎫 Tickets"]
                        Campaigns["📢 Campanhas"]
                    end

                    subgraph ReportVisuals["📊 Visualizações"]
                        Charts["📊 Gráficos"]
                        Tables["📋 Tabelas"]
                        Timeline["📅 Linha do Tempo"]
                        Heatmaps["🗺️ Mapas de Calor"]
                    end
                end
            end

            %% Conexões Frontend Detalhadas
            %% Dashboard Connections
            Atendimentos -->|"Atualiza"| GraficoTempo
            Conversas -->|"Alimenta"| GraficoVolume
            Tickets -->|"Gera"| GraficoSatisfacao
            Agentes -->|"Mede"| GraficoDesempenho

            GraficoTempo -->|"Filtra por"| Periodo
            GraficoVolume -->|"Segmenta por"| Departamento
            GraficoSatisfacao -->|"Agrupa por"| Equipe
            GraficoDesempenho -->|"Divide por"| Canal

            Periodo -->|"Gera"| Exportar
            Departamento -->|"Envia"| Compartilhar
            Equipe -->|"Ajusta"| Configurar
            Canal -->|"Dispara"| Atualizar

            %% Chat Connections Detalhadas
            ListaContatos -->|"Seleciona"| AreaMensagens
            ListaConversas -->|"Mostra"| AreaMensagens
            AreaMensagens -->|"Atualiza"| BarraStatus

            EnviarMensagem -->|"Usa"| RespostasRapidas
            ReceberMensagem -->|"Aplica"| Modelos
            AnexarArquivo -->|"Associa"| Etiquetas
            GravarAudio -->|"Inicia"| Transferencia

            RespostasRapidas -->|"Insere em"| AreaMensagens
            Modelos -->|"Preenche"| AreaMensagens
            Etiquetas -->|"Marca em"| ListaConversas
            Transferencia -->|"Atualiza"| ListaContatos

            %% Contacts Connections Detalhadas
            ContactList -->|"Abre"| ContactDetails
            ContactForm -->|"Cria em"| ContactDB
            ContactDetails -->|"Atualiza"| ContactDB
            ImportExport -->|"Processa"| ContactDB

            ContactDB -->|"Organiza"| ContactTags
            ContactTags -->|"Agrupa em"| ContactGroups
            ContactGroups -->|"Registra em"| ContactHistory

            AddContact -->|"Valida"| ContactForm
            EditContact -->|"Modifica"| ContactDetails
            DeleteContact -->|"Remove de"| ContactDB
            ImportContacts -->|"Adiciona a"| ContactDB

            %% Settings Connections Detalhadas
            Language -->|"Afeta"| Display
            Theme -->|"Customiza"| Display
            Timezone -->|"Configura"| Notifications
            Sound -->|"Ajusta"| Notifications

            Notifications -->|"Usa"| APIKeys
            Privacy -->|"Configura"| OAuth
            Shortcuts -->|"Aciona"| Webhooks
            Display -->|"Ativa"| Sync

            %% Profile Connections Detalhadas
            UserData -->|"Protegido por"| Password
            UserPreferences -->|"Verificado por"| TwoFactor
            UserActivity -->|"Registrado em"| Sessions
            UserSecurity -->|"Monitorado em"| Logs

            %% Reports Connections Detalhadas
            Performance -->|"Analisa"| Messages
            Analytics -->|"Processa"| Users
            Metrics -->|"Calcula"| TicketData
            KPIs -->|"Avalia"| Campaigns

            Messages -->|"Visualiza em"| Charts
            Users -->|"Lista em"| Tables
            TicketData -->|"Organiza em"| Timeline
            Campaigns -->|"Mapeia em"| Heatmaps

            %% Conexões Cross-Component
            ChatInterface -->|"Atualiza"| Metricas
            ContactDB -->|"Alimenta"| ReportData
            Settings -->|"Configura"| Dashboard
            Profile -->|"Personaliza"| Chat
            Reports -->|"Analisa"| Contacts

            %% Conexões com Backend
            ChatActions -->|"API Request"| REST
            ContactData -->|"Sync"| WebSocket
            UserPrefs -->|"Update"| APIGateway
            ReportData -->|"Query"| GraphQL

            %% Sistema de Autenticação Detalhado
            subgraph AuthSystem["🔐 Sistema de Autenticação"]
                subgraph AuthFlow["Fluxo de Autenticação"]
                    Login["🔑 Login"]
                    Registro["📝 Registro"]
                    RecuperarSenha["🔄 Recuperar Senha"]
                    ValidarEmail["✉️ Validar Email"]
                end

                subgraph AuthMethods["Métodos de Autenticação"]
                    JWT["🎫 JWT"]
                    OAuth2["🔐 OAuth2"]
                    BasicAuth["🔒 Basic Auth"]
                    APIKey["🔑 API Key"]
                end

                subgraph SessionControl["Controle de Sessão"]
                    TokenGen["🎫 Geração Token"]
                    TokenValid["✅ Validação Token"]
                    TokenRefresh["🔄 Refresh Token"]
                    TokenRevoke["❌ Revogação Token"]
                end

                subgraph SecurityLayer["Camada de Segurança"]
                    Encryption["🔐 Criptografia"]
                    ServicoHash["#️⃣ Serviço de Hash"]
                    SaltGen["🎲 Gerador de Salt"]
                    ArmazenamentoSeguro["💾 Armazenamento Seguro"]
                end
            end

            %% Conexões de Autenticação
            %% Fluxo de Login
            Login -->|"Credenciais"| AuthMethods
            AuthMethods -->|"Valida"| SecurityLayer
            SecurityLayer -->|"Gera"| SessionControl
            SessionControl -->|"Retorna"| TokenGen

            %% Fluxo de Registro
            Registro -->|"Dados"| ValidarEmail
            ValidarEmail -->|"Confirma"| SecurityLayer
            SecurityLayer -->|"Cria"| ServicoHash
            ServicoHash -->|"Salva"| ArmazenamentoSeguro

            %% Fluxo de Recuperação
            RecuperarSenha -->|"Solicita"| ValidarEmail
            ValidarEmail -->|"Confirma"| TokenGen
            TokenGen -->|"Temporário"| SecurityLayer
            SecurityLayer -->|"Reset"| HashingService

            %% Conexões de Segurança
            JWT -->|"Assina"| Encryption
            OAuth2 -->|"Autoriza"| TokenGen
            BasicAuth -->|"Valida"| HashingService
            APIKey -->|"Verifica"| TokenValid

            %% Sistema de Permissões Detalhado
            subgraph Permissions["👥 Sistema de Permissões"]
                subgraph RoleSystem["Sistema de Papéis"]
                    RoleDefinition["📋 Definição"]
                    RoleHierarchy["📊 Hierarquia"]
                    RoleInheritance["🔄 Herança"]
                    RoleConstraints["⛔ Restrições"]
                end

                subgraph AccessControl["Controle de Acesso"]
                    ACLRules["📜 Regras ACL"]
                    ResourceAccess["🎯 Recursos"]
                    ActionControl["⚡ Ações"]
                    AccessAudit["📝 Auditoria"]
                end

                subgraph PolicyEngine["Motor de Políticas"]
                    PolicyRules["📋 Regras"]
                    PolicyEval["✅ Avaliação"]
                    PolicyEnforce["🛡️ Aplicação"]
                    PolicyAudit["📊 Auditoria"]
                end
            end

            %% Conexões de Permissões
            RoleSystem -->|"Define"| AccessControl
            AccessControl -->|"Aplica"| PolicyEngine
            PolicyEngine -->|"Registra"| AccessAudit

            %% Monitoramento e Logs
            subgraph Monitoring["📊 Monitoramento"]
                subgraph MetricasColeta["📈 Coleta de Métricas"]
                    ColetorSistema["⚙️ Sistema"]
                    ColetorAplicacao["📱 Aplicação"]
                    ColetorBanco["💾 Banco de Dados"]
                    ColetorRede["🌐 Rede"]
                end

                subgraph Processamento["⚙️ Processamento"]
                    AgregadorDados["📊 Agregador"]
                    AnalisadorDados["🔍 Analisador"]
                    DetectorPadroes["🎯 Detector de Padrões"]
                    DetectorAnomalias["⚠️ Detector de Anomalias"]
                end

                subgraph Alertas["🚨 Sistema de Alertas"]
                    GerenciadorAlertas["🔔 Gerenciador"]
                    NotificadorAlertas["📢 Notificador"]
                    EscalonadorAlertas["⬆��� Escalonador"]
                    HistoricoAlertas["📝 Histórico"]
                end

                subgraph Visualizacao["👁️ Visualização"]
                    PainelControle["📊 Painel de Controle"]
                    Relatorios["📑 Relatórios"]
                    GraficosTempoReal["⚡ Tempo Real"]
                    MapasCalor["🗺️ Mapas de Calor"]
                end
            end

            %% Conexões de Monitoramento
            SecurityLayer -->|"Registra"| AccessLogs
            AccessLogs -->|"Analisa"| DetectThreats
            DetectThreats -->|"Gera"| SecurityAlerts
            SecurityAlerts -->|"Aciona"| ResponseActions

            %% Integrações Externas
            subgraph ExternalServices["🌐 Serviços Externos"]
                subgraph AuthProviders["Provedores de Auth"]
                    Google["Google"]
                    Facebook["Facebook"]
                    Apple["Apple"]
                    Microsoft["Microsoft"]
                end

                subgraph SecurityServices["Serviços de Segurança"]
                    CloudFlare["CloudFlare"]
                    reCAPTCHA["reCAPTCHA"]
                    WAF["WAF"]
                    DDoSProtection["DDoS Protection"]
                end
            end

            %% Conexões com Serviços Externos
            OAuth2 -->|"Integra"| AuthProviders
            SecurityLayer -->|"Protege"| SecurityServices
            SecurityServices -->|"Notifica"| SecurityMonitor

            %% Conexões Integradas entre Sistemas

            %% Frontend -> Auth
            Dashboard -->|"Verifica Sessão"| SessionControl
            Chat -->|"Valida Token"| TokenValid
            Profile -->|"Atualiza Credenciais"| SecurityLayer
            Settings -->|"Configura 2FA"| AuthMethods

            %% Auth -> Backend
            TokenGen -->|"Distribui"| APIGateway
            SecurityLayer -->|"Protege"| REST
            SessionControl -->|"Mantém"| WebSocket
            AuthMethods -->|"Autentica"| GraphQL

            %% Backend -> Database
            APIGateway -->|"Persiste"| PostgreSQL
            WebSocket -->|"Cache"| Redis
            GraphQL -->|"Logs"| MongoDB

            %% Monitoramento Integrado
            SecurityMonitor -->|"Alerta"| Dashboard
            AccessLogs -->|"Exibe em"| Reports
            AuditTrail -->|"Notifica"| Notifications
            SecurityMetrics -->|"Atualiza"| KPIs

            %% Integrações de Permissões
            RoleSystem -->|"Controla"| ChatActions
            AccessControl -->|"Limita"| ContactActions
            PolicyEngine -->|"Gerencia"| ReportAccess

            %% Fluxo de Dados Cross-System
            subgraph DataFlow["🔄 Fluxo de Dados"]
                %% Frontend -> Backend
                ChatInterface -->|"Envia Mensagem"| MessageHandler
                ContactForm -->|"Salva Contato"| UserService
                ReportFilters -->|"Consulta"| AnalyticsService

                %% Backend -> Frontend
                WebSocket -->|"Atualização Real-time"| ChatInterface
                NotificationService -->|"Push"| Dashboard
                QueueStatus -->|"Status Fila"| TicketList

                %% Auth -> Todos
                TokenValidator -->|"Valida Requests"| APIGateway
                PermissionCheck -->|"Autoriza Ações"| UserActions
                SessionManager -->|"Gerencia Estados"| UserInterface
            end

            %% Integrações Externas Expandidas
            subgraph ExternalIntegrations["🌐 Integrações"]
                %% WhatsApp
                WhatsAppHandler -->|"Mensagens"| ChatInterface
                WhatsAppStatus -->|"Conexão"| Dashboard
                WhatsAppMedia -->|"Arquivos"| MediaStorage

                %% Outros Canais
                FacebookMessenger -->|"Chat"| MessageHandler
                InstagramDM -->|"Mensagens"| UnifiedChat
                TelegramBot -->|"Comandos"| AutomationEngine
            end

            %% Sistema de Cache
            subgraph CacheSystem["⚡ Cache"]
                %% Camadas
                ClientCache -->|"Browser"| Frontend
                APICache -->|"Requests"| Backend
                DataCache -->|"Queries"| Database

                %% Invalidação
                CacheInvalidator -->|"Limpa"| ClientCache
                CacheUpdater -->|"Atualiza"| APICache
                CacheManager -->|"Gerencia"| DataCache
            end

            %% Logs e Métricas
            subgraph MetricsSystem["📊 Métricas"]
                %% Coleta
                PerformanceMetrics -->|"Frontend"| Dashboard
                APIMetrics -->|"Backend"| Reports
                DatabaseMetrics -->|"Storage"| Analytics

                %% Análise
                MetricsAggregator -->|"Consolida"| Reports
                MetricsAnalyzer -->|"Processa"| Alerts
                MetricsVisualizer -->|"Exibe"| Dashboard
            end

            %% Conexões de Segurança Expandidas
            SecurityLayer -->|"Protege"| APIGateway
            SecurityLayer -->|"Monitora"| WebSocket
            SecurityLayer -->|"Audita"| Database

            %% Conexões de Cache
            Redis -->|"Acelera"| APIGateway
            Redis -->|"Armazena"| SessionControl
            Redis -->|"Cache"| DataQueries

            %% Conexões de Filas
            RabbitMQ -->|"Processa"| MessageHandler
            RabbitMQ -->|"Agenda"| NotificationService
            RabbitMQ -->|"Distribui"| WorkerTasks

            %% Features
            subgraph Features["🛠️ Funcionalidades"]
                %% Campanhas
                subgraph CampaignSystem["📢 Sistema de Campanhas"]
                    CampaignCreate["➕ Criar Campanha"]
                    CampaignTemplate["📝 Template"]
                    CampaignSchedule["⏰ Agendamento"]
                    CampaignTargets["🎯 Público-alvo"]
                    CampaignQueue["📋 Fila"]
                    CampaignWorker["⚙️ Processamento"]
                    CampaignStatus["📊 Status"]
                    CampaignMetrics["📈 Métricas"]
                end

                %% Automação
                subgraph AutomationSystem["🤖 Sistema de Automação"]
                    FlowDesigner["✏️ Flow Designer"]
                    FlowTriggers["⚡ Gatilhos"]
                    FlowActions["🎯 Ações"]
                    FlowConditions["🔄 Condições"]
                    RuleEngine["⚙️ Motor de Regras"]
                    WorkflowEngine["🔄 Motor de Workflow"]
                    TaskQueue["📋 Fila de Tarefas"]
                    EventProcessor["⚡ Processador"]
                end

                %% Templates
                subgraph TemplateSystem["📝 Sistema de Templates"]
                    TextTemplate["📝 Template Texto"]
                    MediaTemplate["🖼️ Template Mídia"]
                    ButtonTemplate["🔘 Template Botões"]
                    ListTemplate["📋 Template Lista"]
                    TemplateVars["👤 Variáveis"]
                    TemplateValidation["✅ Validação"]
                    MediaHandler["🖼️ Handler Mídia"]
                    ButtonHandler["🔘 Handler Botões"]
                end

                %% Tags
                subgraph TagSystem["🏷️ Sistema de Tags"]
                    TagManager["🔧 Gerenciador"]
                    TagCreator["➕ Criador"]
                    TagEditor["✏️ Editor"]
                    TagGroups["👥 Grupos"]
                    AutoTagger["🤖 Auto Tag"]
                    ManualTagger["👤 Tag Manual"]
                    TagAnalytics["📊 Analytics"]
                    TagReports["📈 Relatórios"]
                end

                %% Respostas Rápidas
                subgraph QuickReplySystem["⚡ Sistema de Respostas"]
                    ReplyManager["🔧 Gerenciador"]
                    ReplyCreator["➕ Criador"]
                    ReplyCategories["📁 Categorias"]
                    ReplyShortcuts["⌨️ Atalhos"]
                    ShortcutEngine["⚙️ Motor"]
                    ShortcutSuggestion["💡 Sugestões"]
                    ReplyAnalytics["📊 Analytics"]
                    ReplyOptimizer["🔄 Otimizador"]
                end
            end

            %% Conexões entre Sistemas
            CampaignSystem --> AutomationSystem
            AutomationSystem --> TemplateSystem
            TemplateSystem --> TagSystem
            TagSystem --> QuickReplySystem

            %% Conexões Campanhas
            CampaignCreate --> CampaignTemplate
            CampaignTemplate --> CampaignSchedule
            CampaignSchedule --> CampaignTargets
            CampaignTargets --> CampaignQueue
            CampaignQueue --> CampaignWorker
            CampaignWorker --> CampaignStatus
            CampaignStatus --> CampaignMetrics

            %% Conexões Automação
            FlowDesigner --> FlowTriggers
            FlowTriggers --> FlowActions
            FlowActions --> FlowConditions
            RuleEngine --> WorkflowEngine
            WorkflowEngine --> TaskQueue
            TaskQueue --> EventProcessor

            %% Conexões Templates
            TextTemplate --> TemplateVars
            MediaTemplate --> MediaHandler
            ButtonTemplate --> ButtonHandler
            ListTemplate --> TemplateValidation

            %% Conexões Tags
            TagManager --> TagCreator
            TagCreator --> TagGroups
            AutoTagger --> TagAnalytics
            ManualTagger --> TagReports

            %% Conexões Respostas Rápidas
            ReplyManager --> ReplyCreator
            ReplyCreator --> ReplyCategories
            ShortcutEngine --> ShortcutSuggestion
            ReplyAnalytics --> ReplyOptimizer

            %% Estilos
            classDef campaign fill:#4CAF50,stroke:#388E3C,color:#fff,rx:15px
            classDef automation fill:#2196F3,stroke:#1976D2,color:#fff,rx:15px
            classDef template fill:#FF9800,stroke:#F57C00,color:#fff,rx:15px
            classDef tag fill:#9C27B0,stroke:#7B1FA2,color:#fff,rx:15px
            classDef reply fill:#F44336,stroke:#D32F2F,color:#fff,rx:15px

            %% Aplicação dos Estilos
            class CampaignCreate,CampaignTemplate,CampaignSchedule,CampaignTargets,CampaignQueue,CampaignWorker,CampaignStatus,CampaignMetrics campaign
            class FlowDesigner,FlowTriggers,FlowActions,FlowConditions,RuleEngine,WorkflowEngine,TaskQueue,EventProcessor automation
            class TextTemplate,MediaTemplate,ButtonTemplate,ListTemplate,TemplateVars,TemplateValidation,MediaHandler,ButtonHandler template
            class TagManager,TagCreator,TagEditor,TagGroups,AutoTagger,ManualTagger,TagAnalytics,TagReports tag
            class ReplyManager,ReplyCreator,ReplyCategories,ReplyShortcuts,ShortcutEngine,ShortcutSuggestion,ReplyAnalytics,ReplyOptimizer reply

            %% Database e Storage Expandido
            subgraph Storage["💾 Armazenamento"]
                %% Banco Principal
                subgraph Database["🗄️ Database"]
                    DB_Main["💾 PostgreSQL"]
                    DB_Tables["📋 Tabelas"]
                    DB_Views["👁️ Views"]
                    DB_Functions["⚙️ Functions"]
                    DB_Triggers["⚡ Triggers"]
                    DB_Indexes["🔍 Indexes"]
                    DB_Backup["📦 Backup"]
                    DB_Replication["🔄 Replication"]
                end

                %% Cache Expandido
                subgraph Cache["⚡ Cache"]
                    Redis["⚡ Redis"]
                    Cache_Data["💨 Data"]
                    Cache_Session["👤 Sessions"]
                    Cache_Queue["📋 Queue"]
                    Cache_Search["🔍 Search"]
                    Cache_Lock["🔒 Lock"]
                    Cache_Stream["📊 Stream"]
                    Cache_Pub_Sub["📢 Pub/Sub"]
                end

                %% Filas Expandido
                subgraph Queue["📨 Filas"]
                    RabbitMQ["🐰 RabbitMQ"]
                    Queue_Messages["📨 Messages"]
                    Queue_Tasks["📋 Tasks"]
                    Queue_Events["⚡ Events"]
                    Queue_DLX["💀 Dead Letter"]
                    Queue_Retry["🔄 Retry"]
                    Queue_Priority["⭐ Priority"]
                    Queue_Delayed["⏰ Delayed"]
                end

                %% Arquivos Expandido
                subgraph Files["📁 Files"]
                    S3["📦 S3"]
                    CDN["🌐 CDN"]
                    Local["💾 Local"]
                    Media["🖼️ Media"]
                    Backup["📦 Backup"]
                    Temp["⏳ Temp"]
                    Archive["📚 Archive"]
                    Compression["🗜️ Compress"]
                end
            end

            %% Monitoramento Expandido
            subgraph Monitor["📊 Monitoramento"]
                %% Logs Expandido
                subgraph Logs["📝 Logs"]
                    App_Logs["📱 App"]
                    Error_Logs["❌ Errors"]
                    Access_Logs["🚪 Access"]
                    Security_Logs["🔒 Security"]
                    Audit_Logs["📋 Audit"]
                    Debug_Logs["🔍 Debug"]
                    Performance_Logs["⚡ Performance"]
                    Integration_Logs["🔌 Integration"]
                end

                %% Métricas Expandido
                subgraph Metrics["📊 Métricas"]
                    System_Metrics["⚙️ System"]
                    App_Metrics["📱 App"]
                    User_Metrics["👥 Users"]
                    API_Metrics["🔌 API"]
                    DB_Metrics["💾 DB"]
                    Cache_Metrics["⚡ Cache"]
                    Queue_Metrics["📋 Queue"]
                    Business_Metrics["💼 Business"]
                end

                %% Alertas Expandido
                subgraph Alerts["🚨 Alertas"]
                    Error_Alerts["❌ Errors"]
                    Performance_Alerts["⚡ Performance"]
                    Security_Alerts["🔒 Security"]
                    Custom_Alerts["🎯 Custom"]
                    Threshold_Alerts["📊 Threshold"]
                    Anomaly_Alerts["🔍 Anomaly"]
                    System_Alerts["⚙️ System"]
                    Business_Alerts["💼 Business"]
                end
            end

            %% Segurança Expandido
            subgraph Security["🔒 Segurança"]
                %% Proteção Expandido
                subgraph Protection["🛡️ Proteção"]
                    Firewall["🛡️ Firewall"]
                    WAF["🔒 WAF"]
                    DDoS["🛡️ DDoS"]
                    RateLimit["⚡ Rate Limit"]
                    IPBlock["🚫 IP Block"]
                    Encryption["🔐 Encryption"]
                    SSL["🔒 SSL/TLS"]
                    VPN["🔒 VPN"]
                end

                %% Controle Expandido
                subgraph Control["🔐 Controle"]
                    Auth["🔑 Auth"]
                    ACL["🔒 ACL"]
                    Roles["👥 Roles"]
                    Permissions["📋 Permissions"]
                    MFA["🔐 2FA"]
                    SSO["🔑 SSO"]
                    OAuth["🔐 OAuth"]
                    RBAC["👥 RBAC"]
                end
            end

            %% Conexões Expandidas
            %% Database Connections
            DB_Main -->|"Replica"| DB_Replication
            DB_Main -->|"Backup"| DB_Backup
            DB_Tables -->|"Index"| DB_Indexes
            DB_Functions -->|"Trigger"| DB_Triggers

            %% Cache Connections
            Redis -->|"Store"| Cache_Data
            Cache_Data -->|"Lock"| Cache_Lock
            Cache_Stream -->|"Publish"| Cache_Pub_Sub
            Cache_Search -->|"Query"| Cache_Data

            %% Queue Connections
            RabbitMQ -->|"Route"| Queue_Messages
            Queue_Messages -->|"Retry"| Queue_Retry
            Queue_Tasks -->|"Delay"| Queue_Delayed
            Queue_Events -->|"Dead"| Queue_DLX

            %% Files Connections
            S3 -->|"Serve"| CDN
            Media -->|"Compress"| Compression
            Temp -->|"Archive"| Archive
            Local -->|"Backup"| Backup

            %% Monitor Connections
            App_Logs -->|"Debug"| Debug_Logs
            Error_Logs -->|"Alert"| Error_Alerts
            Performance_Logs -->|"Metric"| Performance_Alerts
            Security_Logs -->|"Audit"| Audit_Logs

            %% Security Connections
            Firewall -->|"Block"| IPBlock
            WAF -->|"Protect"| SSL
            Auth -->|"Verify"| MFA
            ACL -->|"Control"| RBAC

            %% Cross-System Connections
            DB_Main -->|"Cache"| Redis
            Redis -->|"Queue"| RabbitMQ
            S3 -->|"Log"| App_Logs
            Security_Logs -->|"Alert"| Security_Alerts
            Cache_Metrics -->|"Monitor"| System_Metrics
            Queue_Metrics -->|"Alert"| Performance_Alerts

            %% Estilos
            classDef database fill:#2196F3,stroke:#1976D2,color:#fff,rx:15px
            classDef cache fill:#00BCD4,stroke:#0097A7,color:#fff,rx:15px
            classDef queue fill:#9C27B0,stroke:#7B1FA2,color:#fff,rx:15px
            classDef files fill:#FF9800,stroke:#F57C00,color:#fff,rx:15px
            classDef monitor fill:#4CAF50,stroke:#388E3C,color:#fff,rx:15px
            classDef security fill:#F44336,stroke:#D32F2F,color:#fff,rx:15px

            %% Aplicação dos Estilos
            class DB_Main,DB_Tables,DB_Views,DB_Functions,DB_Triggers,DB_Indexes database
            class Redis,Cache_Data,Cache_Session,Cache_Queue cache
            class RabbitMQ,Queue_Messages,Queue_Tasks,Queue_Events queue
            class S3,CDN,Local,Media files
            class App_Logs,Error_Logs,Access_Logs,Security_Logs,System_Metrics,App_Metrics,User_Metrics,API_Metrics monitor
            class Firewall,WAF,DDoS,RateLimit,Auth,ACL,Roles,Permissions security

            %% Segurança Super Expandido
            subgraph Security["🔒 Sistema de Segurança"]
                %% Autenticação
                subgraph Authentication["🔐 Autenticação"]
                    JWT["🎫 JWT"]
                    OAuth2["🔑 OAuth2"]
                    SAML["🔐 SAML"]
                    BasicAuth["🔒 Autenticação Básica"]
                    ApiKey["🔑 Chave API"]
                    BearerToken["🎟️ Token Bearer"]
                    Biometria["👆 Biometria"]
                    Hardware2FA["🔑 2FA por Hardware"]
                end

                %% Autorização
                subgraph Authorization["🛡️ Autorização"]
                    RBAC["👥 RBAC"]
                    ABAC["🎯 ABAC"]
                    ACL["🔒 ACL"]
                    MotorPoliticas["⚙️ Motor de Políticas"]
                    GerenciadorFuncoes["👔 Gerenciador de Funções"]
                    VerificadorPermissoes["✅ Verificador de Permissões"]
                    ControleAcesso["🚪 Controle de Acesso"]
                    GerenciadorEscopos["🎯 Gerenciador de Escopos"]
                end

                %% Proteção
                subgraph Protection["🛡️ Proteção"]
                    WAF["🛡️ WAF"]
                    AntiDDoS["🛑 Anti-DDoS"]
                    LimiteRequisicoes["⚡ Limite de Requisições"]
                    BloqueioIP["🚫 Bloqueio de IP"]
                    BloqueioGeo["🌍 Bloqueio Geográfico"]
                    ProtecaoBot["🤖 Proteção contra Bots"]
                    SegurancaConteudo["🔒 CSP"]
                    ProtecaoXSS["🛡️ Proteção XSS"]
                end

                %% Criptografia
                subgraph Encryption["🔐 Criptografia"]
                    SSL_TLS["🔒 SSL/TLS"]
                    CriptografiaDados["💾 Criptografia de Dados"]
                    GerenciadorChaves["🔑 Gerenciador de Chaves"]
                    ServicoHash["#️⃣ Serviço de Hash"]
                    GeradorSalt["🎲 Gerador de Salt"]
                    GerenciadorCertificados["📜 Gerenciador de Certificados"]
                    ServicoVault["🔐 Serviço Vault"]
                    ServicoAssinatura["✍️ Serviço de Assinatura"]
                end
            end

            %% Monitoramento Super Expandido
            subgraph Monitoring["📊 Sistema de Monitoramento"]
                %% Coleta de Dados
                subgraph DataCollection["📥 Coleta de Dados"]
                    ColetorMetricas["📊 Coletor de Métricas"]
                    ColetorLogs["📝 Coletor de Logs"]
                    ColetorRastreamento["🔍 Coletor de Rastreamento"]
                    ColetorEventos["⚡ Coletor de Eventos"]
                    ColetorErros["❌ Coletor de Erros"]
                    ColetorDesempenho["⚡ Coletor de Desempenho"]
                    ColetorSeguranca["🔒 Coletor de Segurança"]
                    ColetorAuditoria["📋 Coletor de Auditoria"]
                end

                %% Processamento
                subgraph Processing["⚙️ Processamento"]
                    AgregadorDados["📊 Agregação de Dados"]
                    AnalisadorDados["🔍 Análise de Dados"]
                    DetectorPadroes["🎯 Detector de Padrões"]
                    DetectorAnomalias["⚠️ Detector de Anomalias"]
                    AnalisadorTendencias["📈 Analisador de Tendências"]
                    Correlacionador["🔗 Correlacionador"]
                    Preditor["🔮 Preditor"]
                    AprendizadoMaquina["🤖 Machine Learning"]
                end

                %% Alertas
                subgraph AlertSystem["🚨 Sistema de Alertas"]
                    GerenciadorAlertas["🔔 Gerenciador"]
                    ServicoNotificacoes["📢 Serviço de Notificações"]
                    ServicoEscalonamento["⬆️ Serviço de Escalonamento"]
                    GerenciadorIncidentes["🚨 Gerenciador de Incidentes"]
                    RegrasAlertas["📋 Regras de Alertas"]
                    AcoesAlertas["⚡ Ações de Alertas"]
                    HistoricoAlertas["📜 Histórico de Alertas"]
                    PlantaoTecnico["👥 Plantão"]
                end

                %% Visualização
                subgraph Visualization["👁️ Visualização"]
                    Dashboards["📊 Dashboards"]
                    Relatorios["📑 Relatórios"]
                    TempoReal["⚡ Tempo Real"]
                    Graficos["📈 Gráficos"]
                    MapasCalor["🗺️ Mapas de Calor"]
                    LinhaDoTempo["📅 Linha do Tempo"]
                    Alertas["🚨 Alertas"]
                    Indicadores["🎯 Indicadores"]
                end
            end

            %% Conexões de Segurança Expandidas
            %% Autenticação
            JWT -->|"Valida"| TokenValidator
            OAuth2 -->|"Autoriza"| AuthProvider
            SAML -->|"SSO"| IdentityProvider
            Biometria -->|"Verifica"| Hardware2FA

            %% Autorização
            RBAC -->|"Aplica"| PolicyEngine
            ABAC -->|"Avalia"| AccessControl
            ACL -->|"Controla"| PermissionCheck
            RoleManager -->|"Gerencia"| ScopeManager

            %% Proteção
            WAF -->|"Protege"| AntiDDoS
            RateLimit -->|"Controla"| IPBlock
            BloqueioGeo -->|"Filtra"| ProtecaoBot
            SegurancaConteudo -->|"Previne"| ProtecaoXSS

            %% Criptografia
            SSL_TLS -->|"Protege"| CriptografiaDados
            GerenciadorChaves -->|"Gerencia"| ServicoVault
            ServicoHash -->|"Gera"| GeradorSalt
            ServicoAssinatura -->|"Valida"| VerificadorPermissoes

            %% Conexões de Monitoramento Expandidas
            %% Coleta
            ColetorMetricas -->|"Agrega"| AgregadorDados
            ColetorLogs -->|"Analisa"| AnalisadorDados
            ColetorRastreamento -->|"Detecta"| DetectorPadroes
            ColetorEventos -->|"Identifica"| DetectorAnomalias

            %% Processamento
            AgregadorDados -->|"Tendências"| AnalisadorTendencias
            AnalisadorDados -->|"Correlaciona"| Correlacionador
            DetectorPadroes -->|"Prediz"| Preditor
            DetectorAnomalias -->|"Aprende"| AprendizadoMaquina

            %% Alertas
            GerenciadorAlertas -->|"Notifica"| ServicoNotificacoes
            ServicoEscalonamento -->|"Gerencia"| GerenciadorIncidentes
            RegrasAlertas -->|"Executa"| AcoesAlertas
            HistoricoAlertas -->|"Escalona"| PlantaoTecnico

            %% Visualização
            Dashboards -->|"Mostra"| TempoReal
            Relatorios -->|"Gera"| Graficos
            MapasCalor -->|"Exibe"| LinhaDoTempo
            KPIs -->|"Alerta"| Alertas
        `
    }
};

// Inicializa o DiagramDirection
document.addEventListener('DOMContentLoaded', () => {
    DiagramDirection.init();
}); 