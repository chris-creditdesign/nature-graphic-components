import React from "react"
import { storiesOf } from "@storybook/react"

import ChartSVG from "../ChartSVG/index"
import ChartBackgroundBox from "./index"

const { description } = ChartBackgroundBox.__docgenInfo

storiesOf("Presentational|Chart/Components/ChartBackgroundBox", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ChartSVG],
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => (
		<ChartSVG chartHeight={300} chartWidth={600}>
			<ChartBackgroundBox
				chartInnerHeight={260}
				chartInnerWidth={560}
				innerLeft={20}
				innerTop={20}
			/>
		</ChartSVG>
	))
