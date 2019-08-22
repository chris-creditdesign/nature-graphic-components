import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartGroupedBars
 *
 * Similar to `ChartBars` component except an internal
 * scale is added so that the bars can be positioned
 * next to each other in groups.
 * TODO: Rename to `ChartBarsGrouped`
 */
const ChartGroupedBars = ({
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
	xScaleInternal,
	yAxisFormat,
	yScale,
}) => {
	const [mouseOver, setMouseOver] = useState(null)

	const { key } = data[index]
	const internalPosition = xScaleInternal(key)
	const internalBandwith = xScaleInternal.bandwidth()
	const fill = theme.chartColor[index]

	const barData = data[index].values.map((d, i) => {
		const x = columnNames[i]
		const y = d
		return { x, y }
	})

	const bars = barData.map((d, i) => {
		const scaledX = xScale(d.x) + internalPosition
		const scaledY = yScale(d.y)
		const opacity = i === mouseOver ? 0.6 : 1
		return (
			<rect
				key={`${d.x}-${d.y}`}
				x={scaledX}
				y={scaledY}
				height={chartInnerHeight - scaledY}
				width={internalBandwith}
				fill={fill}
				opacity={opacity}
				onMouseEnter={() => {
					const x =
						scaledX +
						innerLeft +
						internalBandwith / 2
					const y = scaledY + innerTop
					const value = yAxisFormat(d.y)
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

export default ChartGroupedBars

ChartGroupedBars.propTypes = {
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
	/** Used to correctly position the tooltip */
	innerLeft: PropTypes.number.isRequired,
	/** Used to correctly position the tooltip */
	innerTop: PropTypes.number.isRequired,
	/** d3.scaleBand used to position the groups bars horizontally */
	xScale: PropTypes.func.isRequired,
	/** d3.scaleBand used to position the bars horizontally within the groups */
	xScaleInternal: PropTypes.func.isRequired,
	/** Used to format the 'value' that is returned to handleMouseEnterDataElem
	 * to be displayed in the tooltip.
	 */
	yAxisFormat: PropTypes.func.isRequired,
	/** d3.scaleLinear used to determine the height of the bars */
	yScale: PropTypes.func.isRequired,
}
