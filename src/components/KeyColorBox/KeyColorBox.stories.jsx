import React from "react"
import { storiesOf } from "@storybook/react"

import KeyColorBox from "./index"

const { description } = KeyColorBox.__docgenInfo

storiesOf("Presentational|Key/components/KeyColorBox", module)
	.addParameters({
		info: {
			text: description,
		},
	})
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => <KeyColorBox index={0} />)
