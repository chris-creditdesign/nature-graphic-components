import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartYAxis
 *
 * Returns an array of lines, and text elements to form
 * the y-axis and horrizontal lines of the chart.
 *
 * The `ChartYAxisBaseline` is rendered as a separate element
 * so that it can sit infront of the data elements, whereas
 * these lines sit behind.
 */
const ChartYAxis = ({
	chartInnerWidth,
	innerLeft,
	innerTop,
	yAxisFormat,
	yAxisTickCount,
	yScale,
}) => {
	const ticks = yScale
		.ticks(yAxisTickCount)
		.slice(1)
		.map(tick => (
			<line
				key={tick}
				x1={-8}
				y1={yScale(tick)}
				x2={chartInnerWidth}
				y2={yScale(tick)}
				stroke={theme.color.line}
				strokeWidth={theme.strokeWidth.s}
				strokeDasharray="2, 3"
			/>
		))

	const labels = yScale.ticks(yAxisTickCount).map(tick => (
		<text
			key={tick}
			x={-15}
			y={yScale(tick)}
			dy="0.3em"
			fontSize={theme.fontSize.normal}
			textAnchor="end"
		>
			{yAxisFormat(tick)}
		</text>
	))

	return (
		<g transform={`translate(${innerLeft},${innerTop})`}>
			{labels}
			{ticks}
		</g>
	)
}

export default ChartYAxis

ChartYAxis.propTypes = {
	/** Width of the chart inner area */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Used to translate group horizontally into position */
	innerLeft: PropTypes.number.isRequired,
	/** Used to translate group vertically into position */
	innerTop: PropTypes.number.isRequired,
	/** Used to apply formating to the axis labels */
	yAxisFormat: PropTypes.func.isRequired,
	/** Ideal number of ticks in the y-axis. */
	yAxisTickCount: PropTypes.number.isRequired,
	/** d3 scale - used to determine the position of the lines / labels */
	yScale: PropTypes.func.isRequired,
}
