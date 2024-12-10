function exportDiagram() {
    const activeDiagram = document.querySelector('.diagram-container');
    if (!activeDiagram) return;
    
    const button = document.querySelector('.action-button');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="icon">⏳</span> Exportando...';
    button.disabled = true;

    try {
        html2canvas(activeDiagram, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: true,
            useCORS: true,
            onclone: function(clonedDoc) {
                const clonedDiagram = clonedDoc.querySelector('.diagram-container');
                if (clonedDiagram) {
                    clonedDiagram.style.display = 'block';
                }
            }
        }).then(canvas => {
            const link = document.createElement('a');
            const diagramName = document.querySelector('#current-diagram').textContent;
            link.download = `flowdesk-${diagramName.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            button.innerHTML = originalText;
            button.disabled = false;
        });
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar o diagrama. Por favor, tente novamente.');
        button.innerHTML = originalText;
        button.disabled = false;
    }
} 