# Frontify - A Shopify Frontend Workflow with Gulp + Webpack + Timber + More!

This is an example setup for Shopify theme development using Gulp task automation along with Webpack (Javascript) and the Shopify Timber base theme.


## Instructions

1. Download or git clone this repo.
2. Run `npm install` to install all dependencies from package.json
3. Create a private application on your store. Duplicate config.example.json as config.json and enter the API credentials from the private application you just created.
4. Run `gulp` and change a file. It will then automatically get pushed to Shopify.
5. Run `gulp deploy` to deploy the theme for continuous deployment.

In order to see the new styling, svgs, or Javascript, you will need to edit `shop/layout/theme.liquid` and reference the correct paths.

I recommended replacing shop with the latest Timber release and then making the adjustments needed in theme.liquid to support the new compiled assets.

## What's Included
- SCSS Compilation (Autoprefixer, partials)
- SVG (Sourcemap creation)
- JS ES6 Compatible (Webpack)
- Shopify Integration
- Timber

## FAQ
**I don't use Webpack!**

You are welcome to switch out Webpack for Browserify inside the Gulp JS task.


**How do I get liquid variables to work in my Scss?**

This repo utilizes *[postcss-shopify-settings-variables](https://github.com/bit3725/postcss-shopify-settings-variables)* in order to retain Shopify Liquid syntax in the SCSS files. Make sure to escape the liquid variables using `$()`

```sass
 color: $(settings.link-colour);
```

### TODO
- Add support for browserSync/reload
- Make SCSS concat easier than prefixing filename with a number
- Further integrate Webpack bundles into the various Shopify sections
- Integrate svg4everybody in order to have IE SVG fallback support. Also add the svg symbol file to theme.liquid
- Move Modernizer and respond.js into the Webpack bundle.
- Continue to reduce number of separate CSS and JS files.
- Remove any remaining images inside the styling.
- Image minification
- JS/CSS linting
