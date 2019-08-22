import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## KeyColorLine
 *
 * Returns a 15px square SVG containing a `line` element
 * coloured according to the index prop. */
const KeyColorLine = ({ index }) => (
	<svg width="15" height="15" focusable={false}>
		<line
			x1="2"
			y1="8"
			x2="13"
			y2="8"
			strokeWidth={theme.strokeWidth.xl}
			stroke={theme.chartColor[index]}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export default KeyColorLine

KeyColorLine.propTypes = {
	/** Index used to select fill colour */
	index: PropTypes.number.isRequired,
}
