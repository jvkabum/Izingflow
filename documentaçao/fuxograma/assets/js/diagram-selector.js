class DiagramSelector {
    static init() {
        // Cria o container do seletor
        const selectorDiv = document.createElement('div');
        selectorDiv.className = 'diagram-selector';

        // Define os botões
        const buttons = [
            { type: 'flowchart', icon: '📊', label: 'Fluxograma' },
            { type: 'er', icon: '🔄', label: 'ER Diagram' },
            { type: 'git', icon: '📦', label: 'Git Graph' },
            { type: 'class', icon: '📝', label: 'Class Diagram' },
            { type: 'gantt', icon: '📅', label: 'Gantt Chart' },
            { type: 'sequence', icon: '↔️', label: 'Sequence' }
        ];

        // Cria os botões
        buttons.forEach((btn, index) => {
            const button = document.createElement('button');
            button.className = 'diagram-type' + (index === 0 ? ' active' : '');
            button.dataset.type = btn.type;
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'icon';
            iconSpan.textContent = btn.icon;
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'label';
            labelSpan.textContent = btn.label;
            
            const arrowSpan = document.createElement('span');
            arrowSpan.className = 'arrow';
            arrowSpan.textContent = '→';
            
            button.appendChild(iconSpan);
            button.appendChild(labelSpan);
            button.appendChild(arrowSpan);
            
            selectorDiv.appendChild(button);
        });

        // Insere o seletor antes do título
        const titleDiv = document.querySelector('.diagram-title');
        titleDiv.parentNode.insertBefore(selectorDiv, titleDiv);

        // Adiciona os eventos de clique
        const buttonElements = selectorDiv.querySelectorAll('.diagram-type');
        
        // Função para ajustar a direção do fluxograma
        function adjustFlowchartDirection() {
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
                container.innerHTML = container.innerHTML.replace(
                    /graph (TB|LR)/,
                    `graph ${isWider ? 'LR' : 'TB'}`
                );
                mermaid.init(undefined, container);
            });
        }

        buttonElements.forEach(button => {
            button.addEventListener('click', async () => {
                buttonElements.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                const type = button.dataset.type;
                if (DiagramTypes[type]) {
                    const mermaidDiv = document.querySelector('.mermaid');
                    
                    try {
                        mermaidDiv.removeAttribute('data-processed');
                        mermaidDiv.innerHTML = DiagramTypes[type].content;
                        
                        // Ajusta e renderiza o diagrama
                        adjustFlowchartDirection();

                        // Adiciona listener para redimensionamento
                        window.addEventListener('resize', adjustFlowchartDirection);
                    } catch (error) {
                        console.error('Erro ao atualizar diagrama:', error);
                    }
                }
            });
        });
    }
} 