import React from "react"
import { storiesOf } from "@storybook/react"
import { scaleLinear } from "d3-scale"

import ChartSVG from "../ChartSVG/index"
import ChartYAxisBaseline from "./index"

const yScale = scaleLinear()
	.domain([0, 600])
	.range([260, 0])

const { description } = ChartYAxisBaseline.__docgenInfo

storiesOf("Presentational|Chart/Components/ChartYAxisBaseline", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ChartSVG],
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => (
		<ChartSVG chartHeight={300} chartWidth={600}>
			<ChartYAxisBaseline
				chartInnerWidth={500}
				innerLeft={50}
				innerTop={20}
				yAxisTickCount={5}
				yScale={yScale}
			/>
		</ChartSVG>
	))
