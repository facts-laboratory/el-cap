# ElCapitan

![El Cap](./El-Capitan.png 'El Capitan')

El Capitan, the coin market Captain.

## Install

`npm i`

## Run

`NAME=el-cap npm run start`

## Theme

- [Tailwind Config](./apps/el-cap/tailwind.config.js)

## Playbook

The app is in `/apps/el-cap`, the only component in there is `app.tsx`;

The libraries are in `/packages/*`. They will all be published at `@el-cap/*`.

- Generate: `NAME=<library-name> npm run generate:lib`
- Lint: `NAME=<library-name> npm run lint:lib`
- Build: `NAME=<library-name> npm run build:lib`
- Test: `NAME=<library-name> npm run test:lib`
- Storybook `NAME=<library-name> npm run storybook:lib`
- Build Storybook: `NAME=<library-name> npm run build-storybook:lib`
- Perma Deploy Storybook: `todo`
- Deploy `todo`
- Perma Deploy `todo`

There are `Pages` and `Widgets`.

Pages:

- feed `/#/feed`
- coin `/#/coin/:ticker`

Store:

This is where the router is setup. That's also where we setup the basename `/#`.

- `/packages/store`

Layout:

This is the base layout of the application and will be moved into a `@facts-kit/ui-kit`.

- `/packages/layout`

Interfaces:

This is the common `el-cap` interfaces will go.

- `/packages/interfaces`

## Tech

- React
- bundlr
- Tailwind
- NX
- react-first-router
- ramda
- Arweave
- redstone api

## Using the NX Console UI to run lint, test, build, storybook, build-storybook, deploy, perma-deploy, perma-deploy-storybook

- Use the NX Console extension: `nrwl.angular-console`

![Running storybook and other commands](./run-libs.png 'Running storybook and other commands')

## Deployment

In order for deployments to work, please set the environment variable `PATH_TO_WALLET` to your wallet keyfile (`/Users/<you>/path/to/<your-wallets-name>.json`).

```sh
echo 'export PATH_TO_WALLET=/Users/<you>/path/to/<your-wallets-name>.json' >> ~/.zshrc # you might use ~/.bash_profile or ~/.bashrc?
```

(it might not be `~/.zshrc` if you use a different shell)

then

```
source ~/.zshrc
```

## Renderers

After each librariy is published, it will be published as a renderer. Renderers will be stored in `/apps`.

The script for the renderer will be added when this pull request is finished:

The naming standard for renderers is:

- `<project-name>-renderer` (eg. `widget-coin-card-renderer`)

<img src="https://oqfrmvvkx6kfvhswy45wpmpppwjwd6seafaaehb2tmb47i2bgpgq.arweave.net/dAsWVqq_lFqeVsc7Z7HvfZNh-kQBQAIcOpsDz6NBM80"  width="100">
