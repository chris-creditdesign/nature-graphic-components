import React from "react"
import { storiesOf } from "@storybook/react"
import { format } from "d3-format"
import { scaleLinear } from "d3-scale"

import ChartSVG from "../ChartSVG/index"
import ChartYAxis from "./index"

const yAxisFormat = format(",")

const yScale = scaleLinear()
	.domain([0, 600])
	.range([260, 0])

const { description } = ChartYAxis.__docgenInfo

storiesOf("Presentational|Chart/Components/ChartYAxis", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ChartSVG],
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => (
		<ChartSVG chartHeight={300} chartWidth={600}>
			<ChartYAxis
				chartInnerWidth={500}
				innerLeft={50}
				innerTop={20}
				yAxisFormat={yAxisFormat}
				yAxisTickCount={5}
				yScale={yScale}
			/>
		</ChartSVG>
	))
