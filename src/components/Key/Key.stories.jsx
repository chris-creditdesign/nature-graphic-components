import React from "react"
import { storiesOf } from "@storybook/react"
import { ThemeProvider } from "emotion-theming"
import theme from "../../utils/theme"

import Key from "./index"
import data from "../../utils/testData"

const { description } = Key.__docgenInfo

storiesOf("Presentational|Key", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ThemeProvider],
		},
	})
	.addDecorator(story => (
		<ThemeProvider theme={theme}>{story()}</ThemeProvider>
	))
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => (
		<Key columnNames={data.data.map(elem => elem.key)} type="box" />
	))
	.add("line", () => (
		<Key
			columnNames={data.data.map(elem => elem.key)}
			type="line"
		/>
	))
	.add("dot", () => (
		<Key columnNames={data.data.map(elem => elem.key)} type="dot" />
	))
