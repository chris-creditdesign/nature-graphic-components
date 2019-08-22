import React from "react"
import PropTypes from "prop-types"
import theme from "../../utils/theme"

/**
 * ## KeyColorBox
 *
 * Returns a 15px square SVG containing`rect` element
 * coloured according to the index prop.
 */
const KeyColorBox = ({ index }) => (
	<svg width="15" height="15" focusable={false}>
		<rect width="15" height="15" fill={theme.chartColor[index]} />
	</svg>
)

export default KeyColorBox

KeyColorBox.propTypes = {
	/** Index used to select fill colour */
	index: PropTypes.number.isRequired,
}
