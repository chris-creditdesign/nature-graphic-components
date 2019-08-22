import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartBars
 *
 * Returns an array of svg `rect` elements to form the
 * bars of the bar chart.
 *
 * When a bar is hovered over, `handleMouseEnterDataElem` is
 * called and returns the information needed to fill and positon
 * a tooltip.
 *
 * Similarly when the mouse movess away, `handleMouseLeaveDataElem`
 * is called to hide the tooltip.
 *
 * TODO: When the bars are hovered over their opacity is changed
 * using js. This could be done with CSS.
 */
const ChartBars = ({
	chartInnerHeight,
	chartInnerWidth,
	columnNames,
	data,
	handleMouseEnterDataElem,
	handleMouseLeaveDataElem,
	index,
	innerLeft,
	innerTop,
	xScale,
	yAxisFormat,
	yScale,
}) => {
	// Internal state used to record which bar
	// is currently being hovered over - could be done with CSS
	const [mouseOver, setMouseOver] = useState(null)

	const bandwidth = xScale.bandwidth()
	const fill = theme.chartColor[index]

	// Select and format the data to build the bars
	const barData = data[index].values.map((d, i) => {
		const x = columnNames[i]
		const y = d
		return { x, y }
	})

	const bars = barData.map((d, i) => {
		const scaledX = xScale(d.x)
		const scaledY = yScale(d.y)
		// If the cursor is over the bar, reduce its opacity to 60%.
		const opacity = i === mouseOver ? 0.6 : 1
		return (
			<rect
				key={`${d.x}-${d.y}`}
				x={scaledX}
				y={scaledY}
				height={chartInnerHeight - scaledY}
				width={bandwidth}
				fill={fill}
				opacity={opacity}
				onMouseEnter={() => {
					// Values to be return to position
					// and add text to the tooltip.
					const x =
						scaledX +
						innerLeft +
						bandwidth / 2
					const y = scaledY + innerTop
					const value = yAxisFormat(d.y)
					// Determine the alignment of the tool tip
					// based on the position within the chart area
					let alignment = "middle-bottom"

					if (scaledX < chartInnerWidth * 0.1) {
						alignment = "left-bottom"
					}

					if (scaledX > chartInnerWidth * 0.9) {
						alignment = "right-bottom"
					}

					handleMouseEnterDataElem({
						x,
						y,
						value,
						alignment,
					})
					setMouseOver(i)
				}}
				onMouseLeave={() => {
					handleMouseLeaveDataElem()
					setMouseOver(null)
				}}
			/>
		)
	})

	return <g transform={`translate(${innerLeft},${innerTop})`}>{bars}</g>
}

export default ChartBars

ChartBars.propTypes = {
	/** Height of chart area - used to align bars to the baseline */
	chartInnerHeight: PropTypes.number.isRequired,
	/** Width of chart area - used to position tooltip */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Used to label data points so they can be positioned with a band scale */
	columnNames: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	).isRequired,
	/** Array of { key, values: []} - only data[index].values will be rendered */
	data: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			values: PropTypes.array,
		})
	).isRequired,
	/** Function to be called when the cursor enters a bar.
	 * Returns an object of {x, y, value, alignment }
	 * used to position the tooltip.
	 */
	handleMouseEnterDataElem: PropTypes.func.isRequired,
	/** Function to be called when the cursor leaves a bar */
	handleMouseLeaveDataElem: PropTypes.func.isRequired,
	/** Used to select data range and apply a stroke color */
	index: PropTypes.number.isRequired,
	/** TODO: Position bars within dataLayer
	 * Used to correctly position the tooltip
	 */
	innerLeft: PropTypes.number.isRequired,
	/** TODO: Position bars within dataLayer
	 * Used to correctly position the tooltip
	 */
	innerTop: PropTypes.number.isRequired,
	/** d3.scaleBand used to position the bars horizontally */
	xScale: PropTypes.func.isRequired,
	/** Used to format the 'value' that is returned to handleMouseEnterDataElem
	 * to be displayed in the tooltip.
	 */
	yAxisFormat: PropTypes.func.isRequired,
	/** d3.scaleLinear used to determine the height of the bars */
	yScale: PropTypes.func.isRequired,
}
