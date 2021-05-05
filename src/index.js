/*
 * LightningChartJS example that showcases the creation and styling of box series.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    emptyTick,
    emptyFill,
    emptyLine,
    ColorHEX,
    SolidFill,
    SolidLine,
    AxisTickStrategies,
    AutoCursorModes,
    PointShape,
    UIElementBuilders,
    Themes
} = lcjs

// ----- Define data for application -----
const allData = [
    {
        name: 'Software developer',
        color: '#22162B',
        outlierShape: PointShape.Circle,
        data: {
            lowerExtreme: 17.5,
            lowerQuartile: 19.6,
            median: 21.2,
            upperQuartile: 28.5,
            upperExtreme: 48.1,
            outliers: [
                50.1
            ]
        }
    },
    {
        name: 'Cashier',
        color: '#724E91',
        outlierShape: PointShape.Circle,
        data: {
            lowerExtreme: 14.0,
            lowerQuartile: 19.5,
            median: 20.1,
            upperQuartile: 26.7,
            upperExtreme: 41.6,
            outliers: [
                52.2,
                59.9
            ]
        }
    },
    {
        name: 'Janitor',
        color: '#451F55',
        outlierShape: PointShape.Circle,
        data: {
            lowerExtreme: 15.2,
            lowerQuartile: 18.5,
            median: 22.7,
            upperQuartile: 34.1,
            upperExtreme: 41.0,
            outliers: []
        }
    }
]

// ----- Define styles for light theme -----
const theme = {
    lightGrayFill: new SolidFill({ color: ColorHEX('#A0A0A0A0') }),
    yellowFill: new SolidFill({ color: ColorHEX('#ffa500') })
}

// ----- Create a XY Chart -----
const chart = lightningChart().ChartXY({
    // theme: Themes.dark
})
    .setTitle('Age distribution across professions')
    .setTitleFont((font) => font
        .setSize(32)
    )
    // Disable interactions.
    .setAutoCursorMode(AutoCursorModes.disabled)
    .setMouseInteractions(false)

// ----- Setup axes -----
const gridStrokeStyle = new SolidLine({
    thickness: 4,
    fillStyle: theme.lightGrayFill
})
const axisX = chart.getDefaultAxisX()
    .setTitle('Profession')
    .setStrokeStyle(gridStrokeStyle)
    // No default ticks.
    .setTickStrategy(AxisTickStrategies.Empty)
    // Disable interactions.
    .setMouseInteractions(false)

// Style the default Y Axis
const axisY = chart.getDefaultAxisY()
    .setTitle('Age')
    .setStrokeStyle(gridStrokeStyle)
    // Set Y-view manually.
    .setScrollStrategy(undefined)
    .setInterval(10, 63)
    // Disable interactions.
    .setMouseInteractions(false)

// Style the Y Axis Ticks through the TickStrategy
axisY
    .setTickStrategy(
        // Base TickStrategy to modify
        AxisTickStrategies.Numeric,
        // Modify the TickStrategy through a mutator
        (tickStrategy) => tickStrategy
            // Use custom grid stroke for the Major Ticks.
            .setMajorTickStyle(tickStyle => tickStyle
                .setGridStrokeStyle(gridStrokeStyle)
            )
            // Don't draw minor ticks.
            .setMinorTickStyle(emptyTick)
    )

// ----- Map over per each data item -----
const boxFigureStrokeStyle = new SolidLine({
    thickness: 4,
    fillStyle: theme.yellowFill
})

allData.forEach((profession, i) => {
    const data = profession.data
    const fillStyle = new SolidFill({ color: ColorHEX(profession.color) })
    // ----- Create series for rendering this data item -----
    // Create BoxSeries.
    const boxSeries = chart.addBoxSeries()
        .setDefaultStyle((boxAndWhiskersFigure) => boxAndWhiskersFigure
            .setBodyFillStyle(fillStyle)
            .setBodyStrokeStyle(boxFigureStrokeStyle)
            .setMedianStrokeStyle(boxFigureStrokeStyle)
            .setStrokeStyle(boxFigureStrokeStyle)
            .setBodyWidth(0.70)
            .setTailWidth(0.70)
        )

    // Create PointSeries for outliers.
    const pointSeries = chart.addPointSeries({
        pointShape: profession.outlierShape ? profession.outlierShape : PointShape.Circle
    })
        .setPointSize(20)
        .setPointFillStyle(theme.yellowFill)

    // ----- Setup shared highlighting between box and point series -----
    boxSeries.onHover((_, cp) => pointSeries.setHighlighted(cp !== undefined))
    pointSeries.onHover((_, cp) => boxSeries.setHighlighted(cp !== undefined))

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
            y: outlier
        })
    })

    // ----- Create CustomTick on X-Axis for displaying name of profession -----
    axisX.addCustomTick(UIElementBuilders.AxisTick)
        .setValue(middle)
        .setTextFormatter(() => profession.name)
        .setGridStrokeLength(0)
        .setMarker((marker) => marker
            .setTextFillStyle(new SolidFill({ color: ColorHEX('#aaaf') }))
            .setTextFont((font) => font
                .setSize(24)
            )
        )
})
