class DiagramManager {
    static diagrams = {
        flowchart: `
            graph LR
                %% Seu diagrama atual de fluxograma aqui
        `,
        er: `
            erDiagram
                CLIENTE ||--o{ PEDIDO : faz
                PEDIDO ||--|{ ITEM : contém
                CLIENTE {
                    string nome
                    string email
                    string telefone
                }
                PEDIDO {
                    int id
                    date data
                    float total
                }
                ITEM {
                    string produto
                    int quantidade
                    float preco
                }
        `,
        git: `
            gitGraph
                commit
                branch develop
                checkout develop
                commit
                commit
                checkout main
                merge develop
                commit
                branch feature
                checkout feature
                commit
                commit
                checkout develop
                merge feature
                commit
        `,
        class: `
            classDiagram
                class Cliente {
                    +String nome
                    +String email
                    +fazerPedido()
                }
                class Pedido {
                    +int id
                    +float total
                    +calcularTotal()
                }
                Cliente "1" --> "*" Pedido
        `,
        gantt: `
            gantt
                title Cronograma do Projeto
                dateFormat  YYYY-MM-DD
                section Fase 1
                Planejamento     :a1, 2024-01-01, 30d
                Desenvolvimento  :after a1, 45d
                section Fase 2
                Testes          :2024-03-15, 30d
                Deploy          :2024-04-15, 10d
        `,
        sequence: `
            sequenceDiagram
                Cliente->>+Servidor: Login Request
                Servidor->>+DB: Verificar Credenciais
                DB-->>-Servidor: Credenciais OK
                Servidor-->>-Cliente: Login Success
        `
    };

    static init() {
        const buttons = document.querySelectorAll('.diagram-type');
        const mermaidDiv = document.querySelector('.mermaid');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active de todos os botões
                buttons.forEach(b => b.classList.remove('active'));
                // Adiciona active ao botão clicado
                button.classList.add('active');

                // Atualiza o diagrama
                const type = button.dataset.type;
                mermaidDiv.innerHTML = this.diagrams[type];
                mermaid.init(undefined, mermaidDiv);
            });
        });
    }
}

// Inicializa quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    DiagramManager.init();
}); 