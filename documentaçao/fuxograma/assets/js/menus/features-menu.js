class FeaturesMenu {
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
                    <a href="campaigns.html">
                        <span class="icon">📢</span>
                        <span class="label">Campanhas</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="automation.html">
                        <span class="icon">🤖</span>
                        <span class="label">Automação</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="templates.html">
                        <span class="icon">📝</span>
                        <span class="label">Templates</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="tags.html">
                        <span class="icon">🏷️</span>
                        <span class="label">Tags</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="quick-answers.html">
                        <span class="icon">⚡</span>
                        <span class="label">Respostas Rápidas</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="integrations.html">
                        <span class="icon">🔗</span>
                        <span class="label">Integrações</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        `;
        return menuHtml;
    }
} 