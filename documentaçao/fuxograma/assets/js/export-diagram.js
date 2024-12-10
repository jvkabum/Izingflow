// Função para exportar o diagrama como imagem PNG
function exportDiagram() {
    // Seleciona todos os containers de diagrama
    const diagrams = document.querySelectorAll('.mermaid');
    
    diagrams.forEach((diagram, index) => {
        // Cria um botão de exportação para cada diagrama
        const exportButton = document.createElement('button');
        exportButton.innerHTML = '📥 Exportar Diagrama';
        exportButton.className = 'export-button';
        
        // Adiciona o botão antes do diagrama
        diagram.parentNode.insertBefore(exportButton, diagram);
        
        // Adiciona o evento de clique
        exportButton.addEventListener('click', async () => {
            try {
                // Captura o diagrama como imagem
                const svgElement = diagram.querySelector('svg');
                const canvas = await html2canvas(svgElement, {
                    backgroundColor: '#E3F2FD',
                    scale: 2,
                    logging: false,
                    allowTaint: true,
                    useCORS: true
                });
                
                // Converte para PNG e faz o download
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `diagrama-${index + 1}.png`;
                link.href = image;
                link.click();
            } catch (error) {
                console.error('Erro ao exportar diagrama:', error);
                alert('Erro ao exportar o diagrama. Por favor, tente novamente.');
            }
        });
    });
}

// Adiciona o CSS necessário
const style = document.createElement('style');
style.textContent = `
    .export-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        margin: 10px 0;
        background: #4A90E2;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        transition: all 0.3s ease;
    }

    .export-button:hover {
        background: #357ABD;
        transform: translateY(-2px);
    }

    .export-button:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Executa quando o documento carrega
document.addEventListener('DOMContentLoaded', () => {
    // Carrega a biblioteca html2canvas
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.onload = exportDiagram;
    document.head.appendChild(script);
}); 