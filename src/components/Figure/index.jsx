import React from "react"
import PropTypes from "prop-types"
import StyledFigure from "./styles"

const Figure = ({ children }) => <StyledFigure>{children}</StyledFigure>

export default Figure

Figure.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]).isRequired,
}
