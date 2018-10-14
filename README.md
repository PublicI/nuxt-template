This is a generator for single-page apps and embeddable graphics for use by the Center for Public Integrity's data team. It sets things up real good so you don't have to worry about it none.

## Getting started

[![Greenkeeper badge](https://badges.greenkeeper.io/PublicI/app-generator.svg)](https://greenkeeper.io/)

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). If you don't have it, install it like:

```bash
yarn global add vue-cli@2
```

Then, to generate the project:

```bash
vue init PublicI/app-generator <project-name>
cd <project-name> # move to your project
yarn
```

To use:

| Command | Description |
|---------|-------------|
| yarn dev | Start server in development with Nuxt.js in dev mode (hot reloading). Listen on [http://localhost:3000](http://localhost:3000). |
| yarn build | Build the nuxt.js web application for production. |
| yarn start | Start server in production. |
| yarn generate | Generate static flat files. |
| yarn push | Push to S3. |
