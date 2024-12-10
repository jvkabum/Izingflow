document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o Mermaid com a configuração
    mermaid.initialize(config);

    // Inicializa o Menu
    if (typeof MenuManager !== 'undefined') {
        // Detecta o tipo de menu baseado no caminho
        const path = window.location.pathname;
        if (path.includes('/backend/')) {
            MenuManager.init('backend');
        } else if (path.includes('/features/')) {
            MenuManager.init('features');
        } else if (path.includes('/sistema/')) {
            MenuManager.init('sistema');
        } else if (path.includes('/frontend/')) {
            MenuManager.init('frontend');
        }
    }

    // Inicializa os componentes de diagrama
    if (typeof DiagramSelector !== 'undefined') {
        DiagramSelector.init();
    }
    if (typeof DiagramDirection !== 'undefined') {
        DiagramDirection.init();
    }
}); 