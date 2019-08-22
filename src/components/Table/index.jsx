import React from "react"
import PropTypes from "prop-types"
import StyledTable from "./styles"

/**
 * ## Table
 *
 * Returns a static html table representation of the data.
 */
const Table = ({ columnNames, data, yAxisFormat, yAxisLegendText }) => {
	const columnHeaders = columnNames.map(d => (
		<th key={d} scope="col">
			{d}
		</th>
	))

	const rows = data.map(d => {
		const { key, values } = d

		const tableCells = values.map((dataPoint, index) => (
			<td key={`${columnNames[index]}-${dataPoint}`}>
				{yAxisFormat(dataPoint)}
			</td>
		))

		return (
			<tr key={key}>
				<th scope="row">{key}</th>
				{tableCells}
			</tr>
		)
	})

	return (
		<StyledTable>
			<table>
				<caption>{yAxisLegendText}</caption>
				<thead>
					<tr>
						<th> </th>
						{columnHeaders}
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</StyledTable>
	)
}

export default Table

Table.propTypes = {
	columnNames: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	).isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			values: PropTypes.array,
		})
	).isRequired,
	/** To format the text in the table cells */
	yAxisFormat: PropTypes.func.isRequired,
	/** Text to be used as the table's caption */
	yAxisLegendText: PropTypes.string.isRequired,
}
