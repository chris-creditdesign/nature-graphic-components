import React from "react"
import { storiesOf } from "@storybook/react"
import { scaleBand } from "d3-scale"

import ChartSVG from "../ChartSVG/index"
import ChartXAxisBand from "./index"
import data from "../../utils/testData"

const xAxisFormat = str => str

const xScale = scaleBand()
	.domain(data.data.column_names.values)
	.range([0, 560])
	.paddingInner(0.5)

const { description } = ChartXAxisBand.__docgenInfo

storiesOf("Presentational|Chart/Components/ChartXAxisBand", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ChartSVG],
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => (
		<ChartSVG chartHeight={300} chartWidth={600}>
			<ChartXAxisBand
				chartInnerHeight={220}
				chartInnerWidth={560}
				innerLeft={20}
				innerTop={20}
				xAxisFormat={xAxisFormat}
				xScale={xScale}
			/>
		</ChartSVG>
	))
