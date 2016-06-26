# Frontify - A Shopify Frontend Workflow with Gulp + Webpack + Timber + More!

This is an example setup for Shopify theme development using Gulp task automation along with Webpack (Javascript) and the Shopify Timber base theme.


## Instructions

1. Download or git clone this repo.
2. Run `npm install` to install all dependencies from package.json
3. Create a private application on your store and enter the API credentials inside *config.json*
4. Run `gulp` and change a file. It will then automatically get pushed to Shopify.

In order to see the new styling, svgs, or Javascript, you will need to edit `shop/layout/theme.liquid` and reference the correct paths.

I recommended replacing shop with the latest Timber release and then making the adjustments needed in theme.liquid to support the new compiled assets.

## What's Included
- Scss Compilation (Autoprefixer, partials)
- SVG (Sourcemap creation)
- JS ES6 Compatible (Webpack)
- Shopify Integration
- Timber

## FAQ
**I don't use Webpack!**
You are welcome to switch out Webpack for Browserify inside the Gulp js task.

**How do I get liquid variables to work in my Scss?**
Make sure to escape the liquid variables using [Sass's string interpolation](https://github.com/luciddesign/bootstrapify/wiki/Escaping-liquid-in-SASS):

```sass
 color: #{'{{ settings.link-colour }}'};
```
