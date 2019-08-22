import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartStackedBars
 *
 * Similar to `ChartBars` component, except data is passed
 * through a `d3.stack` function so that the bars can be stacked vertically.
 *
 * TODO: The `rect` bar element should be a separate component.
 *
 * TODO: Rename to `ChartBarsStacked`.
 */
const ChartStackedBars = ({
	chartInnerWidth,
	handleMouseEnterDataElem,
	handleMouseLeaveDataElem,
	index,
	innerLeft,
	innerTop,
	stacked,
	xScale,
	yAxisFormat,
	yScale,
}) => {
	const [mouseOver, setMouseOver] = useState(null)

	const bandwith = xScale.bandwidth()
	const fill = theme.chartColor[index]

	const barData = stacked[index].map(d => {
		const { x } = d.data
		const [yStart, yEnd] = d
		return { x, yStart, yEnd }
	})

	const bars = barData.map((d, i) => {
		const scaledX = xScale(d.x)
		const scaledYStart = yScale(d.yStart)
		const scaledYEnd = yScale(d.yEnd)
		const opacity = i === mouseOver ? 0.6 : 1
		return (
			<rect
				key={`${d.x}-${d.yStart}-${d.yEnd}`}
				x={scaledX}
				y={scaledYEnd}
				height={scaledYStart - scaledYEnd}
				width={bandwith}
				fill={fill}
				opacity={opacity}
				onMouseEnter={() => {
					const x =
						scaledX +
						innerLeft +
						bandwith / 2
					const y = scaledYEnd + innerTop
					const value = yAxisFormat(
						d.yEnd - d.yStart
					)
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

	return <g>{bars}</g>
}

export default ChartStackedBars

ChartStackedBars.propTypes = {
	/** Width of chart area - used to position tooltip */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Function to be called when the cursor enters a bar.
	 * Returns an object of {x, y, value, alignment }
	 * used to position the tooltip.
	 */
	handleMouseEnterDataElem: PropTypes.func.isRequired,
	/** Function to be called when the cursor leaves a bar */
	handleMouseLeaveDataElem: PropTypes.func.isRequired,
	/** Used to select data range and apply a stroke color */
	index: PropTypes.number.isRequired,
	/** Used to correctly position the tooltip */
	innerLeft: PropTypes.number.isRequired,
	/** Used to correctly position the tooltip */
	innerTop: PropTypes.number.isRequired,
	/** A d3 'stack' of the given array of data, containing an
	 * array representing each series in the data */
	stacked: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.array.isRequired)
	).isRequired,
	/** d3.scaleBand used to position the bars horizontally */
	xScale: PropTypes.func.isRequired,
	/** Used to format the 'value' that is returned to handleMouseEnterDataElem
	 * to be displayed in the tooltip.
	 */
	yAxisFormat: PropTypes.func.isRequired,
	/** d3.scaleLinear used to determine the height of the bars */
	yScale: PropTypes.func.isRequired,
}
