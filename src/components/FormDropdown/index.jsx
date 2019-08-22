/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
/* Disabling as labels do have associated controls via id and htmlFor */
import React from "react"
import PropTypes from "prop-types"
import StyledDropdown from "./styles"

/**
 * ## FormDropdown
 *
 * Returns a styed `FormFieldSet` element containing a `select` element.
 */
const FormDropdown = ({
	disabled,
	id,
	labelText,
	onChange,
	options,
	value,
}) => (
	<StyledDropdown disabled={disabled}>
		<label htmlFor={id} className="bold">
			{labelText}
		</label>
		<select id={id} value={value} onChange={onChange}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.text}
				</option>
			))}
		</select>
	</StyledDropdown>
)

export default FormDropdown

FormDropdown.propTypes = {
	disabled: PropTypes.bool.isRequired,
	/** id to associate the label with the select element */
	id: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	/** Array of { text, value } */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			value: PropTypes.string,
		})
	).isRequired,
	/** Current selected value */
	value: PropTypes.string.isRequired,
}
