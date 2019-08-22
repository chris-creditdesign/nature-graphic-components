/* eslint-disable react/no-danger */
import React from "react"
import PropTypes from "prop-types"
import StyledHeader from "./styles"

/**
 * ## Header
 *
 * Returns a `header` element containing a `h1` for the headline
 * and a `p` element for for the standfirst.
 *
 * The standfirst can contain rich text.
 */
const Header = ({ headLine, standFirst }) => (
	<StyledHeader>
		<h1>{headLine}</h1>
		<p dangerouslySetInnerHTML={{ __html: standFirst }} />
	</StyledHeader>
)

export default Header

Header.propTypes = {
	headLine: PropTypes.string.isRequired,
	standFirst: PropTypes.string.isRequired,
}
