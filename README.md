# Alpine Hold Directive

<p align="center">
    <a href="https://github.com/wireui/alpine-hold-directive/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/wireui/alpine-hold-directive" alt="GitHub license" data-canonical-src="https://img.shields.io/github/license/wireui/alpine-hold-directive" style="max-width:100%;" />
    </a>
    <a href="https://twitter.com/ph7jack">
        <img alt="Twitter" src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fwireui%2Falpine-hold-directive"></a>
    </a>
</p>

### 🔥 Hold Directive
The alpine-hold-directive directive is a directive that allows you to add a hold to an element and call a function when the hold is released.


### 📚 Get Started
#### Prerequisites:
* [Alpinejs 3.10+](https://alpinejs.dev)

#### Install
```bash
yarn add wireui/hold-directive

or

npm i --save wireui/hold-directive
```

#### How to use it?
You can import it in your js file before the **`Alpine.start()`** call.

```diff
// resources/js/alpine.js
import Alpine from 'alpinejs'

+ import 'wireui/hold-directive'

// or

+ import { directive } from 'wireui/hold-directive'
+ Alpine.directive('hold', directive)

window.Alpine = Alpine

Alpine.start()
```

<h2>📣 Follow the author</h2>

Stay informed, follow [@ph7jack] on Twitter.

There will you see all the latest news about features, ideas, discussions and more...

<br/>

<h2> 💡 Philosophy</h2>

WireUI is and will always be FREE to anyone who would like to use it.

This project is created [Pedro Oliveira], and it is maintained by the author with the help of the community.

All contributions are welcome!

<br/>

## License

MIT

[@ph7jack]: https://twitter.com/ph7jack
[Pedro Oliveira]: https://github.com/PH7-Jack
