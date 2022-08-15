<p align="center">
    <a href="https://github.com/wireui/alpinejs-hold-directive/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/wireui/alpinejs-hold-directive" alt="GitHub license" data-canonical-src="https://img.shields.io/github/license/wireui/alpinejs-hold-directive" style="max-width:100%;" />
    </a>
    <a href="https://twitter.com/ph7jack">
        <img alt="Twitter" src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fwireui%2Falpinejs-hold-directive"></a>
    </a>
</p>

# Alpine.js Hold Directive

[![Tests](https://github.com/wireui/alpinejs-hold-directive/actions/workflows/test.yml/badge.svg)](https://github.com/wireui/alpinejs-hold-directive/actions/workflows/test.yml)

### 🔥 Hold Directive
The hold directive allows you to add a hold action to an element and call it when the button is holding.

### 📚 Get Started
#### Prerequisites:
* [Alpinejs 3.10+](https://alpinejs.dev)

#### Install
```bash
yarn add @wireui/alpinejs-hold-directive

or

npm i @wireui/alpinejs-hold-directive --save
```

#### Configure
```diff
// resources/js/app.js
import Alpine from 'alpinejs'

+ import HoldDirective from '@wireui/alpinejs-hold-directive'
+ HoldDirective.register(Alpine)

// or

+ import { directive } from '@wireui/alpinejs-hold-directive'
+ Alpine.directive('hold', directive)

window.Alpine = Alpine

Alpine.start()
```

#### How to use it?
You can use the x-hold directive to call any alpine.js action.

```html
<div x-data="{
    count: 0,
    plus() { this.count++ },
    minus() { this.count-- }
}">
    <button x-hold.click="minus">Minus</button>
    <input x-model="count">
    <button x-hold.click="plus">Plus</button>
</div>
```

#### Directive API
|      Modifier       |                Description                | Default |
|---------------------|-------------------------------------------|---------|
| x-hold.500ms        | Set the wait time to repeat the action    |         |
| x-hold.repeat       | Set the wait time to repeat the action    |  500ms  |
| x-hold.repeat.500ms | Set the wait time to repeat the action    |         |
| x-hold.delay        | Set the wait time to start holding        |  500ms  |
| x-hold.delay.500ms  | Set the wait time to start holding        |         |
| x-hold.click        | Fire the hold action with the click event |  false  |

All modifiers can be used together.

Just set the modifier duration after the modifer name, **`x-hold.delay.500ms`**.

<h2>📣 Follow the Author</h2>

Stay informed, follow [@ph7jack] on Twitter.

There will you see all the latest news about features, ideas, discussions and more...

<h2> 💡 Philosophy</h2>

WireUI is and will always be FREE to anyone who would like to use it.

This project is created [Pedro Oliveira], and it is maintained by the author with the help of the community.

All contributions are welcome!

## License

[MIT](https://opensource.org/licenses/MIT)

[@ph7jack]: https://twitter.com/ph7jack
[Pedro Oliveira]: https://github.com/PH7-Jack
