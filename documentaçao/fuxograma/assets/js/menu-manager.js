class MenuManager {
    static async init(menuType) {
        let menuHtml;
        
        // Seleciona o menu correto baseado no tipo
        switch(menuType) {
            case 'backend':
                menuHtml = BackendMenu.init();
                break;
            case 'sistema':
                menuHtml = SistemaMenu.init();
                break;
            case 'frontend':
                menuHtml = FrontendMenu.init();
                break;
            case 'features':
                menuHtml = FeaturesMenu.init();
                break;
            default:
                console.error('Tipo de menu não encontrado');
                return;
        }

        // Insere o menu no início do body
        const menuContainer = document.createElement('div');
        menuContainer.innerHTML = menuHtml;
        document.body.insertBefore(menuContainer, document.body.firstChild);

        // Marca o item atual como ativo
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.top-menu a');
        menuItems.forEach(item => {
            if (currentPath.includes(item.getAttribute('href'))) {
                item.classList.add('active');
            }
        });
    }
} 