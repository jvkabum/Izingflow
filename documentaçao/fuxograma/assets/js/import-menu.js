document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Importa o CSS do menu
        const menuStyle = document.createElement('link');
        menuStyle.rel = 'stylesheet';
        menuStyle.href = '/fuxograma/assets/css/menu-style.css';
        document.head.appendChild(menuStyle);

        // Carrega o template do menu
        const response = await fetch('/fuxograma/assets/templates/menu.html');
        const menuHtml = await response.text();
        
        // Insere o menu no início do body
        const firstElement = document.body.firstChild;
        const menuContainer = document.createElement('div');
        menuContainer.innerHTML = menuHtml;
        document.body.insertBefore(menuContainer, firstElement);

        // Marca o item atual do menu como ativo
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.top-menu a');
        
        menuItems.forEach(item => {
            if (item.getAttribute('href') && currentPath.endsWith(item.getAttribute('href'))) {
                item.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
}); 