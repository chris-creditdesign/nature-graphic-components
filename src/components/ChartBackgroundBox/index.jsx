import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## ChartBackgroundBox
 *
 * Returns an SVG `rect` element to be used to cover the
 * background of the chart area.
 */
const ChartBackgroundBox = ({
	chartInnerHeight,
	chartInnerWidth,
	innerLeft,
	innerTop,
}) => {
	return (
		<rect
			height={`${chartInnerHeight}px`}
			width={`${chartInnerWidth}px`}
			x={`${innerLeft}px`}
			y={`${innerTop}px`}
			fill={theme.backgroundColor.chart}
		/>
	)
}

export default ChartBackgroundBox

ChartBackgroundBox.propTypes = {
	/** The width of the box */
	chartInnerHeight: PropTypes.number.isRequired,
	/** The height of the box */
	chartInnerWidth: PropTypes.number.isRequired,
	/** The x position of the box */
	innerLeft: PropTypes.number.isRequired,
	/** The y position of the box */
	innerTop: PropTypes.number.isRequired,
}
