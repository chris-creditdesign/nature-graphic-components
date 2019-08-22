import React from "react"
import PropTypes from "prop-types"

/**
 * ## ChartSVG
 *
 * Returns an SVG element into which the chart elements
 * can be rendered.
 */
const ChartSVG = ({ children, chartHeight, chartWidth }) => (
	<svg
		height={`${chartHeight}px`}
		viewBox={`0 0 ${chartWidth} ${chartHeight}`}
		width={`${chartWidth}px`}
		focusable={false}
		aria-hidden
	>
		{children}
	</svg>
)

export default ChartSVG

ChartSVG.propTypes = {
	chartHeight: PropTypes.number.isRequired,
	chartWidth: PropTypes.number.isRequired,
	/** SVG elements or React components to be rendered
	 * within the SVG.
	 */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
}
