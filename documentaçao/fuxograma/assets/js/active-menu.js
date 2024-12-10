// Função para marcar o item atual do menu como ativo
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (currentPath.endsWith(item.getAttribute('href'))) {
            item.classList.add('active');
        }
    });
}); 