import React from "react"
import PropTypes from "prop-types"
import ButtonStyled from "./styles"

/**
 * ## FormButton
 *
 * Returns a button element. Optional `expanded` and `reveal` props
 * can be supplied so that button can function as a 'reveal' button
 * with a rotating triangle symbol.
 */
const FormButton = ({ children, expanded, onClick, reveal }) => (
	<ButtonStyled
		aria-expanded={reveal ? expanded : null}
		className={reveal ? "reveal" : null}
		onClick={onClick}
		type="button"
	>
		{children}
	</ButtonStyled>
)

export default FormButton

FormButton.defaultProps = {
	expanded: false,
	reveal: false,
}

FormButton.propTypes = {
	children: PropTypes.string.isRequired,
	expanded: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	reveal: PropTypes.bool,
}
