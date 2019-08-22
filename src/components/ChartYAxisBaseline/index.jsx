import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartYAxisBaseline
 *
 * Returns as svg `line` element to represent the
 * horizontal baseline of the graph.
 */
const ChartYAxisBaseline = ({
	chartInnerWidth,
	innerLeft,
	innerTop,
	yAxisTickCount,
	yScale,
}) => {
	const ticks = yScale
		.ticks(yAxisTickCount)
		.slice(0, 1)
		.map(tick => (
			<line
				key={tick}
				x1={-8}
				y1={yScale(tick)}
				x2={chartInnerWidth}
				y2={yScale(tick)}
				stroke={theme.color.line}
				strokeWidth={theme.strokeWidth.xl}
				strokeDasharray="none"
			/>
		))

	return <g transform={`translate(${innerLeft},${innerTop})`}>{ticks}</g>
}

export default ChartYAxisBaseline

ChartYAxisBaseline.propTypes = {
	/** Width of the chart inner area */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Translate group horizontally */
	innerLeft: PropTypes.number.isRequired,
	/** Translate group vertically */
	innerTop: PropTypes.number.isRequired,
	/** Ideal number of ticks in the y-axis.
	 * TODO: This might not be necessary here as we only want the first tick. */
	yAxisTickCount: PropTypes.number.isRequired,
	/** d3 scale - used to determine the position of the baseline */
	yScale: PropTypes.func.isRequired,
}
