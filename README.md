# App template

## Setup

To start a new project with this template:

1. Click [Use this template](https://github.com/PublicI/app-generator/generate).
2. Specify the repository's name and click "Create repository from template."
3. Wait for GitHub to generate a new repository.
5. Open a terminal and navigate to where you want the project to live.
6. Run `npx sao -c <name-of-project>` to setup the template.
7. Answer a few questions and then commit the result.

If you don't want to start with a GitHub repo, you could run `npx sao github:PublicI/app-generator <name-of-project>` in place of steps 1-6.

## Development

To run this project locally, open a terminal, navigate to the project's directory and execute:

```sh
npm run dev
```

This will start a server that runs at http://localhost:3000/<name-of-project>

For detailed explanation on how things work, check out the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
