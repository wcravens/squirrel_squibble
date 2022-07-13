# Storybook

## [Install](https://storybook.js.org/docs/react/get-started/install)

```shell
# Add Storybook:
npx storybook init

# Run storybook
npm run storybook
```

## [What's a Story?]( https://storybook.js.org/docs/react/get-started/whats-a-story)

A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all
the “interesting” states a component can support.

Stories are written in [Component Story Format (CSF)](https://github.com/ComponentDriven/csf)--an open ES6 modules-based
standard--for writing component examples.  *Compatable with several systems including React and WebComponents.*

A story is a function that describes how to render the component in question.

```javascript
// Button.stories.js|jsx

import React from 'react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
};

export const Primary = () => <Button primary>Button</Button>;
```

A story is a component with a set of arguments that define how the component should
render. [“Args”](https://storybook.js.org/docs/react/writing-stories/args) are Storybook’s
mechanism for defining those arguments in a single JavaScript object.

```js
// Button.stories.js|jsx

import React from 'react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
   primary: true,
   label: 'Button',
};
```


Set component level arguments for all stories in the export default object.
```javascript
// Button.stories.js|jsx
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  //👇 Creates specific argTypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    //👇 All Button stories will be primary by default
    primary: true,
  },
};

...
```

You can also export args in preview.js to apply globally.

```js
// .storybook/preview.js
export const args = { theme: light }
```

Args Composition using spread operator.
```js
import { Button } from './Button'
...

Primary.args = {
  primary: true,
  label: 'Button',
}

...
Secondary.args = {
  ...Primary.args,
  primary: false,
};
...
```

Stories in the UI view will automatically respond to a change in the source.

## Browse Stories

A *.stories.js file defines all the stories for a component. Each story has a corresponding sidebar item. When you click
on a story, it renders in the Canvas an isolated preview iframe.

