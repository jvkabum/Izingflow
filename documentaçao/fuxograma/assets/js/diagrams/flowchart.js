const FlowchartDiagram = `
    flowchart LR
        %% Configurações de estilo modernas
        classDef default fill:#fff,stroke:#333,stroke-width:2px;
        classDef highlight fill:#f5f5f5,stroke:#1976D2,stroke-width:2px,color:#1976D2;
        
        %% Nós com ícones e descrições claras
        A(" Início") --> B("📝 Processo")
        B --> C("📊 Decisão")
        C -->|"Sim"| D("✅ Sucesso")
        C -->|"Não"| E("❌ Erro")
        
        %% Aplicar estilos
        class A,D highlight
        class B,C,E default
`; 