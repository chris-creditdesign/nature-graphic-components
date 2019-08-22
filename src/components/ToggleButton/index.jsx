import React from "react"
import PropTypes from "prop-types"
import ButtonStyled from "./styles"

/**
 * ## ToggleButton
 *
 * Returns a button element with `role="switch"` with can be used to
 * set or display a boolean value.
 */
const ToggleButton = ({ onClick, checked, id, label, disabled, controls }) => (
	<ButtonStyled
		role="switch"
		aria-checked={checked}
		aria-labelledby={id}
		aria-controls={controls}
		onClick={onClick}
		disabled={disabled}
	>
		<span className="label" id={id}>
			{label}
		</span>
		<span className="on">on</span>
		<span className="off">off</span>
	</ButtonStyled>
)

export default ToggleButton

ToggleButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	/** Internal id, to associate the label with the button */
	id: PropTypes.string.isRequired,
	/** Message displayed next to the the button */
	label: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	/** id of the dom element that is effected by clicking this button */
	controls: PropTypes.string.isRequired,
}
