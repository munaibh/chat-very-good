<p align="center">
  <img src="https://www.dictionary.com/e/wp-content/uploads/2018/03/Upside-Down_Face_Emoji.png" width="80" alt="Logo" />
  <h1 align="center">Hot MEN</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/release/munaibh/hot-men/all.svg" alt="version">
  <img src="https://img.shields.io/github/issues/munaibh/hot-men" alt="issues">
  <img src="https://heroku-shields.herokuapp.com/hot-men-prod" alt="heroku">
  <img src="https://img.shields.io/github/license/munaibh/hot-men.svg" alt="license">
</p>

<p align="center">
  <b>An un-opinionated boilerplate. This package will provide a smooth experience for both the front and backend.</b><br>
  <sub>(PRs for better names are welcome!)</sub>
</p>

<br>

## ❯ Getting started

All you need is this repository, so just clone it to generate your project boilerplate.

```bash
$ git clone git@github.com:whatever my-awesome-project
$ cd my-awesome-project
```

## ❯ Usage

There are a couple of commands we want to keep an eye on when developing and building for production, these are listed below:

### Development

| Command           | Description |
| ---------------- | --- |
| `npm run serve`  | Starts up and a development server using webpack to watch the files. |
| `npm run debug`  | This command does the same as the `serve` command, however, it launches the server with the node `inspect` feature. |
| `npm run clean`  | This removes any extraneous files in the public directory along with removing the build directory. |


ℹ These development commands launch the client and server side code using Webpacks HMR. The views are automatically hard refreshed.


### Production

| Command           | Description |
| ---------------- | --- |
| `npm run start`  | Starts the application using the built files. |
| `npm run build`  | Creates a production build of the client and server and outputs them in `public` and `build` respectively. |

ℹ The production build commands are required before the server can be launched.


## ❯ But... Why?

Google said there were better ways than Nodemon! So I went huntin', but alas, I didn't find a boilerplate to match my needs, so I made one. A couple of things we provide include:

* Allows use of ES2018 and SASS.
* Hot Module Reloading (Client and Server).
* Refresh `views` on change.
* Production hashing of assets.
* Manifest generation in production.
* Inject version and manifest into Service Worker.
* Access manifest using `asset` function.

<br>
<h3 align="center">
  Enjoy! 🤙
</h3>


