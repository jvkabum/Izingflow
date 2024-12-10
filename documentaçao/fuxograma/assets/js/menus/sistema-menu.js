class SistemaMenu {
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
                    <a href="arquitetura.html">
                        <span class="icon">🏗️</span>
                        <span class="label">Arquitetura</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="fluxo-dados.html">
                        <span class="icon">📊</span>
                        <span class="label">Fluxo de Dados</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="componentes.html">
                        <span class="icon">🧩</span>
                        <span class="label">Componentes</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="integracao.html">
                        <span class="icon">🔗</span>
                        <span class="label">Integração</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="seguranca.html">
                        <span class="icon">🔒</span>
                        <span class="label">Segurança</span>
                        <span class="arrow">→</span>
                    </a>
                    <a href="monitoramento.html">
                        <span class="icon">📡</span>
                        <span class="label">Monitoramento</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        `;
        return menuHtml;
    }
} 