import React from "react"
import { storiesOf } from "@storybook/react"

import KeyColorLine from "./index"

const { description } = KeyColorLine.__docgenInfo

storiesOf("Presentational|Key/components/KeyColorLine", module)
	.addParameters({
		info: {
			text: description,
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => <KeyColorLine index={0} />)
