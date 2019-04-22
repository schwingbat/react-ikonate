## React Ikonate

Based on the beautiful icon package [Ikonate](https://www.ikonate.com/) this React package aims to provide all the features of these icons, while being easily accessible in your React project.

You can find all the icons and customization options on the [project home page](https://www.ikonate.com/).

## Installation

Install the icons via `NPM` or `yarn`:

```sh
yarn add react-ikonate
```

--- or ---

```sh
npm install --save react-ikonate
```

## Usage

Sources are generated through TypeScript so typings are available.

You can style the icons by themselves.

```jsx
import { Activity } from 'react-ikonate';

// Style via SVG props
render(<Activity fontSize="23px" borderWidth={1}/>, el);
```

You can style them via a `Provider`:

```jsx
import { Activity, Chat, IkonateContext } from 'react-ikonate';

render((
    <IkonateContext.Provider value={{ border: 1, style: 'round' }}>
        <Menu>
            <Menu.Item>
                <Activity/>
                Recent Activity
            </Menu.Item>
            <Menu.Item>
                <Chat/>
                Messages
            </Menu.Item>
        </Menu>
    </IkonateContext.Provider>
), el)
```

The Ikonate Context is defined as:

```ts
type IkonateContextType = {
    border?: number;
    size?: number | string;
    style?: 'square' | 'roundSquare' | 'round';
    color?: string;
}
```

## Contributing

If you have problems with the package itself (i.e.: rendering in React, props not being passed, error messages on console, etc), [file an issue here](https://github.com/danielkov/react-ikonate/issues). Clone the project, make your modifications and create a PR to the branch `master`. Releases are created automatically from version tags, e.g.: `v1.0.1` for version 1.0.1.

For issues related to the actual icons (i.e.: new icon request, visual issues, etc) refer to the [original repository's issue page](https://github.com/mikolajdobrucki/ikonate/issues).
