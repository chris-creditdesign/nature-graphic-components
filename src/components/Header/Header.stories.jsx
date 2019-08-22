import React from "react"
import { storiesOf } from "@storybook/react"
import { ThemeProvider } from "emotion-theming"
import theme from "../../utils/theme"
import state from "../../utils/state"

import Header from "./index"

const { description } = Header.__docgenInfo

storiesOf("Presentational|Header", module)
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
		<Header
			headLine={state.headLine}
			standFirst={state.standFirst}
		/>
	))
	.add("rich text", () => (
		<Header
			headLine={state.headLine}
			standFirst="<strong>Lorem ipsum dolor sit amet</strong> consectetur adipisicing elit. <i>Illum corporis reiciendis</i> exercitationem dolores, vel perspiciatis <a href='https://www.nature.com/news'>recusandae deserunt hic harum</a>."
		/>
	))
