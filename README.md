Live demo [here](https://weapons-shop-visan.netlify.com/).

The project is made with `HTML5`, `Sass` and pure `JavaScript(ES6)`. I have used `npm` as a package manager with `node-sass` and `babel`.

Regarding the app, the items are created and displayed dynamically based on an array of objects from data.js, basically you can add as many as you want and they will be generated.

Regarding the functionality, you add or remove by clicking the plus and minus buttons and getting a warning when the stock is zero. If this happens, the plus button is disabled.
Also, every time you increase the quantity, it checks if the current ballance is enough to buy another item and if not, the add button is disabled.

- to make changes run `npm install`
- to compile JavaScript: `npm run build`
- SCSS to CSS: `npm run sass`

Not compatible with IE11 but all other browsers work.
