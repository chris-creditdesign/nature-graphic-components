import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartDots
 *
 * Returns an SVG group containing and array of SVG `circle` elements
 * to form the 'marks' on a scatter plot or the 'data points' on a line
 * chart - that can be interacted with or used table cells.
 *
 * When a dot is hovered over, `handleMouseEnterDataElem` is called and
 * returns the information needed to fill and positon a tooltip.
 *
 * Similarly when the mouse movess away, `handleMouseLeaveDataElem`
 * is called to hide the tooltip.
 *
 * TODO: When the bars are hovered over their radius is changed using js.
 * This could be done with a CSS transform.
 *
 * TODO: `onMouseEnter` and `onMouseLeave` could be extracted into generic
 * functions, so that the same function could be used by bars.
 * For instance, dot could store its 'alignment' as a variable to be passed
 * to the function.
 */
const ChartDots = ({
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
	const [mouseOver, setMouseOver] = useState(null)

	const dotData = data[index].values.map((d, i) => {
		const x = columnNames[i]
		const y = d
		return { x, y }
	})

	const circles = dotData.map((d, i) => {
		const scaledX = xScale(d.x)
		const scaledY = yScale(d.y)
		const radius =
			i === mouseOver ? theme.dotRadius.l : theme.dotRadius.s
		return (
			<circle
				key={`${d.y}-${d.x}`}
				cx={scaledX}
				cy={scaledY}
				r={radius}
				fill={theme.chartColor[index]}
				index={index}
				onMouseEnter={() => {
					const x = scaledX + innerLeft
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

	return <g>{circles}</g>
}

export default ChartDots

ChartDots.propTypes = {
	/** Width of chart area - used to position tooltip */
	chartInnerWidth: PropTypes.number.isRequired,
	/** Used to label data points so they can be positioned with the x scale */
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
	/** Function to be called when the cursor enters a dot.
	 * Returns an object of {x, y, value, alignment }
	 * used to position the tooltip. */
	handleMouseEnterDataElem: PropTypes.func.isRequired,
	/** Function to be called when the cursor leaves a dot */
	handleMouseLeaveDataElem: PropTypes.func.isRequired,
	/** Used to select data range and apply a stroke color */
	index: PropTypes.number.isRequired,
	/** Used to correctly position the tooltip */
	innerLeft: PropTypes.number.isRequired,
	/** Used to correctly position the tooltip */
	innerTop: PropTypes.number.isRequired,
	/** d3.scaleLinear used to position the bars horizontally */
	xScale: PropTypes.func.isRequired,
	/** Used to format the 'value' that is returned to
	 * handleMouseEnterDataElem to be displayed in the tooltip.
	 */
	yAxisFormat: PropTypes.func.isRequired,
	/** d3.scaleLinear used to position the bars vertically */
	yScale: PropTypes.func.isRequired,
}
