var config = {
    startOnLoad: true,
    theme: 'default',
    useMaxWidth: true,
    themeVariables: {
        fontSize: '52px',
        fontFamily: 'Segoe UI',
        primaryColor: '#E3F2FD',
        primaryTextColor: '#1565C0',
        primaryBorderColor: '#1976D2',
        lineColor: '#424242',
        secondaryColor: '#E8F5E9',
        tertiaryColor: '#FFF3E0'
    },
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 150,
        rankSpacing: 200,
        padding: 50,
        defaultRenderer: 'elk',
        diagramPadding: 50,
        edgeLabelBackground: '#FFFFFF',
        ranker: 'tight-tree',
        useMaxWidth: true,
        htmlMode: true,
        nodeWidth: 300,
        nodeHeight: 150
    },
    sequence: {
        diagramMarginX: 50,
        diagramMarginY: 30,
        actorMargin: 150,
        boxMargin: 50,
        boxTextMargin: 20,
        noteMargin: 30,
        messageMargin: 80,
        useMaxWidth: true,
        width: 1200
    },
    er: {
        diagramPadding: 50,
        layoutDirection: 'TB',
        minEntityWidth: 300,
        minEntityHeight: 200,
        entityPadding: 40,
        useMaxWidth: true
    },
    gantt: {
        gridColor: 'transparent',
        sectionFontSize: '12px',
        barColor: '#4A90E2',
        sectionColor: '#666666',
        todayLineColor: 'transparent',
        weekendColor: 'transparent',
        useMaxWidth: true
    },
    arrowMarkerAbsolute: true,
    securityLevel: 'loose'
};

mermaid.initialize(config);

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .mermaid .node rect,
        .mermaid .node circle,
        .mermaid .node ellipse,
        .mermaid .node polygon {
            min-width: 300px !important;
            min-height: 150px !important;
        }
        .mermaid .label {
            white-space: normal !important;
            word-wrap: break-word !important;
            max-width: none !important;
            width: auto !important;
        }
        .mermaid .nodeLabel {
            width: 100% !important;
            height: 100% !important;
            padding: 20px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
        }
        .mermaid svg {
            height: auto !important;
            width: 100% !important;
            min-width: 800px !important;
        }
        .mermaid {
            width: 100% !important;
            overflow: visible !important;
            display: flex !important;
            justify-content: center !important;
        }
    </style>
`);

document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                const nodes = document.querySelectorAll('.mermaid .node');
                nodes.forEach(node => {
                    const label = node.querySelector('.label');
                    if (label) {
                        const rect = node.querySelector('rect');
                        if (rect) {
                            const labelBounds = label.getBoundingClientRect();
                            rect.setAttribute('width', Math.max(300, labelBounds.width + 40));
                            rect.setAttribute('height', Math.max(150, labelBounds.height + 40));
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});