# PegaPool Admin

The project is based on the nest.js framework. You can find more information about it on the official [nest.js website](https://nextjs.org/).

## Development

Clone the repository and install dependencies to call the next command:

```bash
yarn install
```

after it you can run next one

```bash
yarn dev
```

This command runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.

## Run in prod

### Build and run prod mode manually

You can build the bundle and run the application in production mode by calling next commands:

```bash
yarn build:prod // creates bundle in .next folder
yarn start      // starts the app in prod mode on :3000 port
```

### Launch with Docker

You can launch the project with docker:

```bash
docker build --tag frontend .                            // build a docker image
docker run -p 3000:3000 --name=frontend frontend:latest  // launch the image on the 3000 port
```
