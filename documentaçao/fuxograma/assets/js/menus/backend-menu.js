class BackendMenu {
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
                    <a href="api.html">
                        <span class="icon">🔌</span>
                        <span class="label">API</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="auth.html">
                        <span class="icon">🔐</span>
                        <span class="label">Autenticação</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="users.html">
                        <span class="icon">👥</span>
                        <span class="label">Usuários</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="tickets.html">
                        <span class="icon">🎫</span>
                        <span class="label">Tickets</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="whatsapp.html">
                        <span class="icon">📱</span>
                        <span class="label">WhatsApp</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="queues.html">
                        <span class="icon">📋</span>
                        <span class="label">Filas</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        `;
        return menuHtml;
    }
} 