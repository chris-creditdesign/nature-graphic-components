import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

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
	chartInnerWidth: PropTypes.number.isRequired,
	innerLeft: PropTypes.number.isRequired,
	innerTop: PropTypes.number.isRequired,
	yAxisFormat: PropTypes.func.isRequired,
	yAxisTickCount: PropTypes.number.isRequired,
	yScale: PropTypes.func.isRequired,
}
