<p align="center">
  <img src="public/favicon.png" width="80" alt="Logo" />
  <h1 align="center">ChatVeryGood</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/release/munaibh/chat-very-good/all.svg" alt="version">
  <img src="https://img.shields.io/github/issues/munaibh/chat-very-good" alt="issues">
  <img src="https://heroku-shields.herokuapp.com/chatverygood-prod" alt="heroku">
  <img src="https://img.shields.io/github/license/munaibh/chat-very-good.svg" alt="license">
</p>

<p align="center">
  <b>This repository is for the podcast "chatverygood" and will be home to all episodes, providing playback for all viewers!</b>
</p>

<hr>

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

<br>
<h3 align="center">
  Enjoy! 🤙
</h3>


