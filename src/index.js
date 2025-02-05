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
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
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
    const pointSeries = chart
        .addPointLineAreaSeries({
            dataPattern: null,
        })
        .setStrokeStyle(emptyLine)
        .setPointSize(20)

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
        pointSeries.add({
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
