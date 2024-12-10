class AutoDirection {
    static init() {
        // Observar mudanças no tamanho da tela
        window.addEventListener('resize', this.adjustDirection);
        // Ajustar direção inicial
        this.adjustDirection();
    }

    static adjustDirection() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const diagram = document.querySelector('.mermaid');
        
        if (!diagram) return;

        // Pegar o conteúdo atual
        let content = diagram.textContent;

        // Ajustar direção baseado nas dimensões
        if (width > height) {
            // Horizontal para telas largas
            content = content.replace(/flowchart\s+TB/, 'flowchart LR');
        } else {
            // Vertical para telas altas
            content = content.replace(/flowchart\s+LR/, 'flowchart TB');
        }

        // Atualizar diagrama
        diagram.textContent = content;
        
        // Recarregar Mermaid
        if (window.mermaid) {
            window.mermaid.init(undefined, diagram);
        }
    }
}

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    AutoDirection.init();
}); 