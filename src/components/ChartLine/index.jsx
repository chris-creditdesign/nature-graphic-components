import React from "react"
import PropTypes from "prop-types"
import { line } from "d3-shape"
import theme from "../../utils/theme"

/**
 * ## ChartLine
 *
 * Returns an svg `path` element to form the line of a line chart.
 */
const ChartLine = ({ columnNames, data, index, xScale, yScale }) => {
	const lineData = data[index].values.map((d, i) => {
		const x = columnNames[i]
		const y = d
		return { x, y }
	})

	const path = line()
		.x(d => xScale(d.x))
		.y(d => yScale(d.y))

	return (
		<path
			index={index}
			d={path(lineData)}
			fill="none"
			strokeWidth={theme.strokeWidth.xl}
			stroke={theme.chartColor[index]}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	)
}

ChartLine.propTypes = {
	/** Used to label data points so they can be positioned with the x linear scale */
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
	/** Used to select data range and apply a stroke color */
	index: PropTypes.number.isRequired,
	/** d3.scaleLinear used to create the d3.line function */
	xScale: PropTypes.func.isRequired,
	/** d3.scaleLinear used to create the d3.line function */
	yScale: PropTypes.func.isRequired,
}

export default ChartLine
