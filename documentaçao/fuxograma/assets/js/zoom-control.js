class ZoomControl {
    constructor() {
        this.currentZoom = 1;
        this.minZoom = 0.6;
        this.maxZoom = 30;
        this.zoomStep = 0.4;
        this.diagram = null;
        this.diagramContent = null;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.lastTransform = {
            zoom: 1,
            x: 0,
            y: 0
        };
    }

    init() {
        // Cria os controles de zoom globalmente
        this.createGlobalZoomControls();

        // Observa mudanças no diagrama
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    setTimeout(() => {
                        this.initializeDiagram();
                    }, 500);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Inicialização inicial
        setTimeout(() => {
            this.initializeDiagram();
        }, 1000);
    }

    createGlobalZoomControls() {
        // Remove controles existentes se houver
        const existingControls = document.querySelector('.zoom-controls');
        if (existingControls) {
            existingControls.remove();
        }

        // Cria o container dos controles
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        
        // Define o HTML dos controles
        controls.innerHTML = `
            <button class="zoom-btn" onclick="zoomControl.zoomIn()">
                <i class="material-icons">add</i>
            </button>
            <button class="zoom-btn" onclick="zoomControl.zoomOut()">
                <i class="material-icons">remove</i>
            </button>
            <button class="zoom-btn" onclick="zoomControl.resetZoom()">
                <i class="material-icons">refresh</i>
            </button>
        `;

        // Adiciona estilos CSS inline
        const style = document.createElement('style');
        style.textContent = `
            .zoom-controls {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 1000;
            }

            .zoom-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: var(--primary-color, #4A90E2);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            }

            .zoom-btn:hover {
                background: var(--primary-dark, #357ABD);
                transform: scale(1.1);
            }

            .zoom-btn:active {
                transform: scale(0.95);
            }

            .zoom-btn i {
                font-size: 20px;
            }
        `;

        // Adiciona os estilos ao head se ainda não existirem
        if (!document.querySelector('style[data-zoom-controls]')) {
            style.setAttribute('data-zoom-controls', 'true');
            document.head.appendChild(style);
        }

        // Adiciona os controles ao body
        document.body.appendChild(controls);
    }

    initializeDiagram() {
        this.diagram = document.querySelector('.mermaid');
        if (this.diagram) {
            this.diagramContent = this.diagram.querySelector('svg');
            if (this.diagramContent) {
                this.setupControls();
                // Restaura último estado
                this.restoreLastTransform();
            }
        }
    }

    setupControls() {
        this.setupStyles();
        this.addZoomControls();
        this.addWheelZoom();
        this.addDragControls();
    }

    setupStyles() {
        if (!this.diagram || !this.diagramContent) return;
        
        this.diagram.style.position = 'relative';
        this.diagram.style.overflow = 'hidden';
        
        this.diagramContent.style.position = 'relative';
        this.diagramContent.style.cursor = 'grab';
        this.diagramContent.style.transformOrigin = 'center center';
        this.diagramContent.style.transition = 'none';
    }

    addZoomControls() {
        let controls = document.querySelector('.zoom-controls');
        if (!controls) {
            controls = document.createElement('div');
            controls.className = 'zoom-controls';
            controls.innerHTML = `
                <button class="zoom-btn" onclick="zoomControl.zoomIn()">
                    <i class="material-icons">add</i>
                </button>
                <button class="zoom-btn" onclick="zoomControl.zoomOut()">
                    <i class="material-icons">remove</i>
                </button>
                <button class="zoom-btn" onclick="zoomControl.resetZoom()">
                    <i class="material-icons">refresh</i>
                </button>
            `;
            document.body.appendChild(controls);
        }
    }

    addWheelZoom() {
        if (!this.diagram) return;
        
        this.diagram.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -this.zoomStep : this.zoomStep;
                this.zoom(this.currentZoom + delta);
            }
        });
    }

    addDragControls() {
        if (!this.diagram || !this.diagramContent) return;

        const onMouseDown = (e) => {
            if (e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                this.isDragging = true;
                this.diagramContent.style.cursor = 'grabbing';
                this.startX = e.clientX - this.offsetX;
                this.startY = e.clientY - this.offsetY;
            }
        };

        const onMouseMove = (e) => {
            if (!this.isDragging) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            this.offsetX = e.clientX - this.startX;
            this.offsetY = e.clientY - this.startY;
            
            this.updateTransform();
        };

        const onMouseUp = () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.diagramContent.style.cursor = 'grab';
                this.saveLastTransform();
            }
        };

        this.diagram.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseUp);
    }

    updateTransform() {
        if (this.diagramContent) {
            this.diagramContent.style.transform = 
                `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.currentZoom})`;
        }
    }

    saveLastTransform() {
        this.lastTransform = {
            zoom: this.currentZoom,
            x: this.offsetX,
            y: this.offsetY
        };
    }

    restoreLastTransform() {
        this.currentZoom = this.lastTransform.zoom;
        this.offsetX = this.lastTransform.x;
        this.offsetY = this.lastTransform.y;
        this.updateTransform();
    }

    zoomIn() {
        this.zoom(this.currentZoom + this.zoomStep);
    }

    zoomOut() {
        this.zoom(this.currentZoom - this.zoomStep);
    }

    resetZoom() {
        this.currentZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.updateTransform();
        this.saveLastTransform();
    }

    zoom(level) {
        this.currentZoom = Math.min(Math.max(level, this.minZoom), this.maxZoom);
        this.updateTransform();
        this.saveLastTransform();
    }
}

// Cria uma instância global
const zoomControl = new ZoomControl();

// Inicializa quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o link para os ícones do Material Design
    if (!document.querySelector('link[href*="Material+Icons"]')) {
        const iconLink = document.createElement('link');
        iconLink.rel = 'stylesheet';
        iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(iconLink);
    }
    
    zoomControl.init();
}); 