# connect-melbournecbd

This is the project of **pineapple.net.au** built with Nuxt

In this project, the content is dynamic, editable through a dashboard **_pa.pineapple.net.au_**

Content is loaded on the server side during page rendering

Backend API serving this project: **_api.pineapple.net.au_**

The tangible improvement in page load speed is observed, but dynamic content loading increases server response times

Due the server load increases significantly, the very powerful server is needed to deploy this project

## Demo

[Heroku](https://connect-melbournecbd-pineapple.herokuapp.com/)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
