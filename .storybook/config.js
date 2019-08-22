import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import requireContext from 'require-context.macro'
import "../src/utils/index.css"

addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all of your stories.
	inline: true,
	source: false,
  })
)

addParameters({
	options: {
		showPanel: false,
	}
})

// automatically import all files ending in *.stories.js
const req = requireContext('../src/components/', true, /\.stories\.jsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
