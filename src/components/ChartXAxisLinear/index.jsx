import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

const widthReducer = (accumulator, currentValue) => {
	const { width } = currentValue.getBBox()
	return accumulator + width
}

const getAverageTextNodeWidth = (elem, settings = { padding: 20 }) => {
	const textNodes = elem.getElementsByTagName("text")
	const textWidth = Array.from(textNodes).reduce(widthReducer, 0)

	const averageTextNodeWidth = textWidth / textNodes.length

	return parseInt(averageTextNodeWidth, 10) + settings.padding
}

/**
 * ## ChartXAxisLinear
 *
 * Returns an SVG group containing an array of text elements
 * and an array of line elements.
 *
 * The number of text elements to display is screen is calculated
 * based on the average text node width and how many times this width
 * will fit into the the chart width. This value is then used as the
 * `tickCount` arguement for the x-axis function.
 */
const ChartXAxisLinear = ({
	chartInnerHeight,
	chartInnerWidth,
	innerLeft,
	innerTop,
	xAxisFormat,
	xAxisTickCount,
	xScale,
}) => {
	// Reference to the rendered group element
	const xAxisGroupEl = useRef()

	// Set the amount of ticks visible based on the amount of
	// text nodes that will fit the chart width.
	// TODO: This is based on the average length, assuming that all
	// text nodes are the same length. One long text node could cause overlap.
	const [tickCount, setTickCount] = useState(xAxisTickCount)
	useEffect(() => {
		if (xAxisGroupEl.current) {
			const averageTextNodeWidth = getAverageTextNodeWidth(
				xAxisGroupEl.current
			)

			const numberOfTicks = Math.floor(
				chartInnerWidth / averageTextNodeWidth
			)

			setTickCount(Math.min(numberOfTicks, xAxisTickCount))
		}
	}, [tickCount, chartInnerWidth])

	const ticks = xScale
		.ticks(tickCount)
		.map(tick => (
			<line
				key={tick}
				x1={xScale(tick)}
				y1={0}
				x2={xScale(tick)}
				y2="0.5em"
				stroke={theme.color.line}
				strokeWidth={theme.strokeWidth.s}
				shapeRendering="crispEdges"
				strokeDasharray="none"
			/>
		))

	const labels = xScale.ticks(tickCount).map(tick => (
		<text
			key={tick}
			x={xScale(tick)}
			y={0}
			dy="1.5em"
			fontSize={theme.fontSize.normal}
			textAnchor="middle"
		>
			{xAxisFormat(tick)}
		</text>
	))

	return (
		<g
			transform={`translate(${innerLeft},${innerTop +
				chartInnerHeight})`}
			ref={xAxisGroupEl}
		>
			{ticks}
			{labels}
		</g>
	)
}

export default ChartXAxisLinear

ChartXAxisLinear.propTypes = {
	/** Height of the chart inner area */
	chartInnerHeight: PropTypes.number.isRequired,
	/** Width of the chart inner area */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Used to translate group horizontally into position */
	innerLeft: PropTypes.number.isRequired,
	/** Used to translate group vertically into position */
	innerTop: PropTypes.number.isRequired,
	/** Used to apply formating to the axis labels */
	xAxisFormat: PropTypes.func.isRequired,
	/** Ideal number of ticks in the x-axis. */
	xAxisTickCount: PropTypes.number.isRequired,
	/** d3 scale - used to determine the position of the lines / labels */
	xScale: PropTypes.func.isRequired,
}
