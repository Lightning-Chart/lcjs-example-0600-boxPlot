# JavaScript Box and Whiskers Chart

![JavaScript Box and Whiskers Chart](boxPlot.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

- Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
- Open the project folder in a terminal:

        npm install              # fetches dependencies
        npm start                # builds an application and starts the development server

- The application is available at *http://localhost:8080* in your browser, webpack-dev-server provides hot reload functionality.


## Description

Example creates a traditional *Box and Whiskers Chart* using *ChartXY*, *BoxSeries* and *PointSeries* for outliers.

*Box and Whiskers Chart* provides a compact way of visually displaying distribution of data through *quartiles*.

## Anatomy

The lines extending parallel from the boxes are known as the "whiskers", which are used to indicate variability outside the upper and lower quartiles.

*Outliers* are sometimes drawn as individual dots that are in-line with the whiskers.

[//]: # "IMPORTANT: The assets will not show before README.md is built - relative path is different!"

![](./assets/boxFigure.png)

Here are the types of observations one can make from viewing a *Box And Whiskers Chart*:

- What the key values are, such as: average, median, 25th percentile etc.
- If there are any *outliers* and what their values are.
- Is the data symmetrical.
- How tightly is the data grouped.
- If the data is skewed and if so, in what direction.


## API Links

* [XY cartesian chart]
* [Axis tick strategies]
* [AutoCursor modes]
* [Point shapes]
* [HEX Color factory]
* [Solid Fill style]
* [Solid Line style]
* [Empty Axis tick style]
* [Empty Fill style]
* [Empty Line style]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [Arction][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact support@arction.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@arction.com.

[0]: https://github.com/Arction/
[1]: https://www.arction.com/lightningchart-js-api-documentation/
[2]: https://www.arction.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://www.arction.com/support-services/

© Arction Ltd 2009-2020. All rights reserved.


[XY cartesian chart]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/classes/chartxy.html
[Axis tick strategies]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/globals.html#axistickstrategies
[AutoCursor modes]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/enums/autocursormodes.html
[Point shapes]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/enums/pointshape.html
[HEX Color factory]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/globals.html#colorhex
[Solid Fill style]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/classes/solidfill.html
[Solid Line style]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/classes/solidline.html
[Empty Axis tick style]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/globals.html#emptytick
[Empty Fill style]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/globals.html#emptyfill
[Empty Line style]: https://www.arction.com/lightningchart-js-api-documentation/v3.1.0/globals.html#emptyline

