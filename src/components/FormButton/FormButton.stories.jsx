import React from "react"
import { storiesOf } from "@storybook/react"
import { StateDecorator, Store } from "@sambego/storybook-state"
import { ThemeProvider } from "emotion-theming"
import theme from "../../utils/theme"

import FormButton from "./index"

export const buttonStore = new Store({
	expanded: false,
})

export const buttonProps = {
	expanded: buttonStore.get("expanded"),
	reveal: false,
	onClick: () =>
		buttonStore.set({ expanded: !buttonStore.get("expanded") }),
}

const { description } = FormButton.__docgenInfo

storiesOf("Presentational|Form/Components/FormButton", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ThemeProvider],
		},
	})
	.addDecorator(StateDecorator(buttonStore))
	.addDecorator(story => (
		<ThemeProvider theme={theme}>{story()}</ThemeProvider>
	))
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => <FormButton {...buttonProps}>Button</FormButton>)
	.add("reveal", () => (
		<FormButton {...buttonProps} reveal>
			Button
		</FormButton>
	))
