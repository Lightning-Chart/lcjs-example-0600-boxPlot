/*
 * LightningChartJS example that showcases the creation and styling of box series.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, AxisTickStrategies, emptyLine, Themes } = lcjs

// ----- Define data for application -----
const allData = [
    {
        name: 'Software developer',
        data: {
            lowerExtreme: 17.5,
            lowerQuartile: 19.6,
            median: 21.2,
            upperQuartile: 28.5,
            upperExtreme: 48.1,
            outliers: [50.1],
        },
    },
    {
        name: 'Cashier',
        data: {
            lowerExtreme: 14.0,
            lowerQuartile: 19.5,
            median: 20.1,
            upperQuartile: 26.7,
            upperExtreme: 41.6,
            outliers: [52.2, 59.9],
        },
    },
    {
        name: 'Janitor',
        data: {
            lowerExtreme: 15.2,
            lowerQuartile: 18.5,
            median: 22.7,
            upperQuartile: 34.1,
            upperExtreme: 41.0,
            outliers: [],
        },
    },
]

// ----- Create a XY Chart -----
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        legend: { visible: false },
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = window.devicePixelRatio >= 2
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (window.devicePixelRatio >= 2)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.devicePixelRatio >= 2 ? lcjs.htmlTextRenderer : undefined,
    })
    .setTitle('Age distribution across professions')
    // Disable interactions.
    .setCursorMode(undefined)

// ----- Setup axes -----
const axisX = chart
    .getDefaultAxisX()
    .setTitle('Profession')
    // No default ticks.
    .setTickStrategy(AxisTickStrategies.Empty)
    .setTitlePosition('center')

// Style the default Y Axis
const axisY = chart
    .getDefaultAxisY()
    .setTitle('Age')
    // Set Y-view manually.
    .setScrollStrategy(undefined)
    .setInterval({ start: 10, end: 63, stopAxisAfter: false })

// ----- Map over per each data item -----

allData.forEach((profession, i) => {
    const data = profession.data
    // ----- Create series for rendering this data item -----
    // Create BoxSeries.
    const boxSeries = chart.addBoxSeries().setDefaultStyle((figure) => figure.setBodyWidth(0.7).setTailWidth(0.7))

    // Create PointSeries for outliers.
    const pointSeries = chart.addPointSeries({}).setStrokeStyle(emptyLine).setPointSize(20)

    // ----- Setup shared highlighting between box and point series -----
    boxSeries.addEventListener('pointerenter', () => pointSeries.setHighlight(true))
    boxSeries.addEventListener('pointerleave', () => pointSeries.setHighlight(false))
    pointSeries.addEventListener('pointerenter', () => boxSeries.setHighlight(true))
    pointSeries.addEventListener('pointerleave', () => boxSeries.setHighlight(false))

    // ----- Compute X positions for BoxFigure -----
    const start = i * 1
    const end = start + 1
    const middle = (start + end) / 2

    // ----- Render BoxFigure -----
    boxSeries.add({
        start,
        end,
        lowerExtreme: data.lowerExtreme,
        lowerQuartile: data.lowerQuartile,
        median: data.median,
        upperQuartile: data.upperQuartile,
        upperExtreme: data.upperExtreme,
    })

    // ----- Render outliers -----
    data.outliers.forEach((outlier) => {
        pointSeries.appendSample({
            x: middle,
            y: outlier,
        })
    })

    // ----- Create CustomTick on X-Axis for displaying name of profession -----
    axisX
        .addCustomTick()
        .setValue(middle)
        .setTextFormatter(() => profession.name)
        .setGridStrokeLength(0)
})
