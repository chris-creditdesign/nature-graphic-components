import React from "react"
import PropTypes from "prop-types"
import ChartGroupedBars from "../ChartGroupedBars/index"

/**
 * ## ChartDataLayerGroupedBars
 *
 * Returns an SVG group containing an array of `ChartGroupedBars`
 * components. Each group of bars is passed an index so that the
 * bars can be positioned and coloured within their group.
 *
 * The group is positioned by innerLeft and innerTop all other
 * props are passed to the the `ChartGroupedBars` components.
 */
const ChartDataLayerGroupedBars = ({
	chartInnerHeight,
	chartInnerWidth,
	columnNames,
	data,
	handleMouseEnterDataElem,
	handleMouseLeaveDataElem,
	innerLeft,
	innerTop,
	xScale,
	xScaleInternal,
	yAxisFormat,
	yScale,
}) => {
	const rows = data.map((d, i) => {
		const { key } = d
		return (
			<g key={key}>
				<ChartGroupedBars
					chartInnerWidth={chartInnerWidth}
					chartInnerHeight={chartInnerHeight}
					columnNames={columnNames}
					data={data}
					handleMouseEnterDataElem={
						handleMouseEnterDataElem
					}
					handleMouseLeaveDataElem={
						handleMouseLeaveDataElem
					}
					index={i}
					innerLeft={innerLeft}
					innerTop={innerTop}
					xScale={xScale}
					xScaleInternal={xScaleInternal}
					yAxisFormat={yAxisFormat}
					yScale={yScale}
				/>
			</g>
		)
	})

	return <g transform={`translate(${innerLeft},${innerTop})`}>{rows}</g>
}

export default ChartDataLayerGroupedBars

ChartDataLayerGroupedBars.propTypes = {
	chartInnerHeight: PropTypes.number.isRequired,
	chartInnerWidth: PropTypes.number.isRequired,
	columnNames: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	).isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			values: PropTypes.array,
		})
	).isRequired,
	handleMouseEnterDataElem: PropTypes.func.isRequired,
	handleMouseLeaveDataElem: PropTypes.func.isRequired,
	/** Used to position the group. */
	innerLeft: PropTypes.number.isRequired,
	/** Used to position the group. */
	innerTop: PropTypes.number.isRequired,
	xScale: PropTypes.func.isRequired,
	xScaleInternal: PropTypes.func.isRequired,
	yAxisFormat: PropTypes.func.isRequired,
	yScale: PropTypes.func.isRequired,
}
