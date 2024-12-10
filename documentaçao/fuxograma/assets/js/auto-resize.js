function adjustDiagramSize() {
    const container = document.querySelector('.mermaid');
    if (container) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = Math.min(width / 1200, height / 800);
        
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'center center';
    }
}

window.addEventListener('resize', adjustDiagramSize);
document.addEventListener('DOMContentLoaded', adjustDiagramSize); 