import React from "react"
import PropTypes from "prop-types"
import StyledList from "./styles"

import KeyColorBox from "../KeyColorBox/index"
import KeyColorLine from "../KeyColorLine/index"
import KeyColorDot from "../KeyColorDot/index"

/**
 * ## Key
 *
 * Returns an unordered list, each list item containing a
 * symbol and text label, to be used as graphical key.
 *
 * TODO: Convert from columnNames, to insterting data containing
 * value and fill information. So the key can be used to display any
 * data - indepent of the theme.
 *
 * TODO: Add a gradient key component.
 */
const Key = ({ columnNames, type }) => {
	const listItems = columnNames.map((elem, i) => {
		let symbol = <KeyColorBox index={i} />

		if (type === "line") {
			symbol = <KeyColorLine index={i} />
		}

		if (type === "dot") {
			symbol = <KeyColorDot index={i} />
		}

		return (
			<li key={elem}>
				{symbol}
				{elem}
			</li>
		)
	})

	return <StyledList aria-hidden>{listItems}</StyledList>
}

export default Key

Key.propTypes = {
	columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** The style of key to be displayed */
	type: PropTypes.oneOf(["box", "line", "dot"]).isRequired,
}
