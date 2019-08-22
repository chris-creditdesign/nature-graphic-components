import React from "react"
import { storiesOf } from "@storybook/react"

import KeyColorDot from "./index"

const { description } = KeyColorDot.__docgenInfo

storiesOf("Presentational|Key/components/KeyColorDot", module)
	.addParameters({
		info: {
			text: description,
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => <KeyColorDot index={0} />)
