class FrontendMenu {
    static init() {
        const menuHtml = `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <!-- Link Home -->
                <div style="padding: 10px 0;">
                    <a href="../index.html" class="home-link">
                        🏠 Página Inicial ←
                    </a>
                </div>

                <!-- Menu Superior -->
                <div class="top-menu">
                    <a href="dashboard.html">
                        <span class="icon">📊</span>
                        <span class="label">Dashboard</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="chat.html">
                        <span class="icon">💬</span>
                        <span class="label">Chat</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="contacts.html">
                        <span class="icon">📞</span>
                        <span class="label">Contatos</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="settings.html">
                        <span class="icon">⚙️</span>
                        <span class="label">Configurações</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="reports.html">
                        <span class="icon">📈</span>
                        <span class="label">Relatórios</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="profile.html">
                        <span class="icon">👤</span>
                        <span class="label">Perfil</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        `;
        return menuHtml;
    }
} 