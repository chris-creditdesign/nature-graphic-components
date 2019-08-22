import React from "react"
import PropTypes from "prop-types"
import StyledSmallText from "./styles"

/**
 * ## SmallText
 *
 * Returns a `p` element that can be used to present 'small'
 * information such as source or footnote text.
 */
const SmallText = ({ text }) => (
	<StyledSmallText dangerouslySetInnerHTML={{ __html: text }} />
)

export default SmallText

SmallText.propTypes = {
	text: PropTypes.string.isRequired,
}
