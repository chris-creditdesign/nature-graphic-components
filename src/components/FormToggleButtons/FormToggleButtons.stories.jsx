import React from "react"
import { storiesOf } from "@storybook/react"
import { StateDecorator, Store } from "@sambego/storybook-state"
import { ThemeProvider } from "emotion-theming"
import theme from "../../utils/theme"

import FormToggleButtons from "./index"

export const toggelButtonsStore = new Store({
	value: true,
})

export const toggelButtonsProps = {
	disabled: false,
	id: "toggle-buttons",
	message: "These are toggle buttons",
	value: toggelButtonsStore.get("value"),
	valueFalseMessage: "Option B",
	valueTrueMessage: "Option A",
	onValueChange: value => toggelButtonsStore.set({ value }),
}

const { description } = FormToggleButtons.__docgenInfo

storiesOf("Presentational|Form/Components/FormToggleButtons", module)
	.addParameters({
		info: {
			text: description,
			propTablesExclude: [ThemeProvider],
		},
	})
	.addDecorator(StateDecorator(toggelButtonsStore))
	.addDecorator(story => (
		<ThemeProvider theme={theme}>{story()}</ThemeProvider>
	))
	.addDecorator(story => <div className="nature-graphic">{story()}</div>)
	.add("default", () => <FormToggleButtons {...toggelButtonsProps} />)
	.add("disabled", () => (
		<FormToggleButtons {...toggelButtonsProps} disabled />
	))
