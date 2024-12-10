class GlobalExport {
    static init() {
        // Criar botão de exportação
        const exportButton = document.createElement('button');
        exportButton.className = 'export-button';
        exportButton.innerHTML = '📥 Exportar Diagrama';
        
        // Adicionar ao body
        document.body.appendChild(exportButton);
        
        // Adicionar evento de clique
        exportButton.addEventListener('click', async () => {
            try {
                const diagram = document.querySelector('.mermaid');
                if (diagram) {
                    // Pegar o SVG do diagrama
                    const svgElement = diagram.querySelector('svg');
                    if (!svgElement) throw new Error('SVG não encontrado');

                    // Criar um novo elemento SVG
                    const newSvg = svgElement.cloneNode(true);
                    
                    // Pegar as dimensões do SVG original
                    const box = svgElement.getBoundingClientRect();
                    
                    // Definir as dimensões no novo SVG
                    newSvg.setAttribute('width', box.width);
                    newSvg.setAttribute('height', box.height);
                    
                    // Converter para string mantendo os estilos
                    const svgData = newSvg.outerHTML;
                    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
                    
                    // Criar uma imagem a partir do SVG
                    const img = new Image();
                    const url = URL.createObjectURL(svgBlob);
                    
                    img.onload = () => {
                        // Criar canvas
                        const canvas = document.createElement('canvas');
                        canvas.width = box.width;
                        canvas.height = box.height;
                        
                        // Desenhar no canvas
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);
                        
                        // Converter para PNG e fazer download
                        const pngUrl = canvas.toDataURL('image/png');
                        const a = document.createElement('a');
                        a.href = pngUrl;
                        a.download = 'diagrama.png';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        // Cleanup
                        URL.revokeObjectURL(url);
                    };
                    
                    img.src = url;
                }
            } catch (error) {
                console.error('Erro ao exportar:', error);
                alert('Erro ao exportar o diagrama. Por favor, tente novamente.');
            }
        });
    }
}

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    GlobalExport.init();
});