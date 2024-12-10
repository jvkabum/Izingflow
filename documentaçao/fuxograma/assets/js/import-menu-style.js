document.addEventListener('DOMContentLoaded', function() {
    // Cria o link para o CSS do menu
    const menuStyle = document.createElement('link');
    menuStyle.rel = 'stylesheet';
    menuStyle.href = '../assets/css/menu-style.css';
    document.head.appendChild(menuStyle);
}); 