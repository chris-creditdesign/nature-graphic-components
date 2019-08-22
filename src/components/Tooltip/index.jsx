import React from "react"
import PropTypes from "prop-types"
import StyledTooltip from "./styles"

/**
 * ## Tooltip
 *
 * Returns as div element to function as a tooltip
 * that can be absolutely positioned over chart elements.
 */
const Tooltip = ({ children, x, y, alignment, transition }) => {
	return (
		<StyledTooltip
			className={`${alignment} ${
				transition ? "transition" : ""
			}`}
			style={{ left: x, top: y }}
			aria-hidden
		>
			{children}
		</StyledTooltip>
	)
}

export default Tooltip

Tooltip.defaultProps = {
	transition: true,
}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	/** Horizontal position */
	x: PropTypes.number.isRequired,
	/** Vertical position */
	y: PropTypes.number.isRequired,
	/** CSS classname used to translate positon of
	 * tooltip.
	 */
	alignment: PropTypes.oneOf([
		"right-bottom",
		"right-top",
		"left-bottom",
		"left-top",
		"middle-bottom",
	]).isRequired,
	/** If false the opactity transition will not be applied */
	transition: PropTypes.bool,
}
