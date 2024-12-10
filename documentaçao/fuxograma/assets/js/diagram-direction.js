class DiagramDirection {
    static init() {
        // Função para ajustar a direção do fluxograma
        const adjustFlowchartDirection = () => {
            const containers = document.querySelectorAll('.mermaid');
            containers.forEach(container => {
                const isWider = container.offsetWidth > container.offsetHeight;
                
                // Redefine a configuração do Mermaid baseado nas dimensões
                mermaid.initialize({
                    ...mermaid.mermaidAPI.getConfig(),
                    flowchart: {
                        ...mermaid.mermaidAPI.getConfig().flowchart,
                        rankDir: isWider ? 'LR' : 'TB'
                    }
                });

                // Renderiza novamente o diagrama
                const content = container.innerHTML;
                container.innerHTML = content.replace(
                    /graph (TB|LR)/,
                    `graph ${isWider ? 'LR' : 'TB'}`
                );
                mermaid.init(undefined, container);
            });
        };

        // Executa quando o documento carrega
        document.addEventListener('DOMContentLoaded', adjustFlowchartDirection);

        // Executa quando a janela é redimensionada
        window.addEventListener('resize', adjustFlowchartDirection);

        // Exporta a função para uso global
        window.adjustFlowchartDirection = adjustFlowchartDirection;
    }
} 