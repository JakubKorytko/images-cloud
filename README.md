# Images Cloud

[![Version](https://img.shields.io/github/v/tag/JakubKorytko/images-cloud?style=for-the-badge&label=version)](https://img.shields.io/github/v/tag/JakubKorytko/images-cloud?style=for-the-badge&label=version)
[![License](https://img.shields.io/github/license/JakubKorytko/images-cloud?style=for-the-badge)](https://img.shields.io/github/license/JakubKorytko/images-cloud?style=for-the-badge&label=license)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Create React App](https://img.shields.io/badge/Create_React_App-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2309D3AC)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Testing-Library](https://img.shields.io/badge/-React_Testing_Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Stylelint](https://img.shields.io/badge/stylelint-%23FFFFFF.svg?style=for-the-badge&logo=stylelint&logoColor=%23000000)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![EJS](https://img.shields.io/badge/ejs-%233A3A44.svg?style=for-the-badge&logo=ejs&logoColor=%23B53D6B)

## Table of Contents

- [Images Cloud](#images-cloud)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Endpoints](#endpoints)
    - [Client endpoints](#client-endpoints)
    - [Server endpoints](#server-endpoints)
      - [Server endpoints protected by authentication](#server-endpoints-protected-by-authentication)
  - [Production build](#production-build)
  - [Tests](#tests)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [License](#license)
  - [TODO / Upcoming features](#todo--upcoming-features)

## Introduction

Images Cloud is a cloud-based image gallery application that offers users a comprehensive hosting experience that goes beyond traditional solutions. This versatile platform caters to the needs of both individuals and organizations, presenting itself as a sophisticated answer to the quest for sophisticated image hosting.

In addition, Images Cloud goes beyond mere hosting capabilities by providing robust image manipulation tools. This additional feature enhances the application's utility and allows users to unleash their creative potential in the digital realm.

The application's user-friendly interface has been thoughtfully designed to ensure a seamless experience. This care extends to responsiveness and adaptability, ensuring optimal viewing across devices and screen sizes. In essence, Images Cloud seamlessly blends functionality with user-centric design, setting it apart in the field of cloud-based image hosting solutions.

## Prerequisites

**Note:** Versions stated below are the ones used during development.\
Other versions may work as well, but they have not been tested.

- [Docker](https://www.docker.com/) `v20.10.17`
- [Docker Compose](https://docs.docker.com/compose/) `v2.6.1`

**This app is designed to work with Docker.**\
If you want to run it without Docker, you will need to install:

- [Node.js](https://nodejs.org/en/) `v20.10.0`
- [Yarn](https://yarnpkg.com/) `v1.22.21`

And check the both Dockerfiles for the steps required to run the app.\
(You also need to handle the environment variables yourself in this case.)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/JakubKorytko/images-cloud
    ```

1. Enter the project directory:

    ```bash
    cd images-cloud
    ```

1. Create `.env` file in root directory `images-cloud/` (or set environment variables manually):

    ```bash
    APP_SECRET= # json web token, you can generate one here: https://jwt.io
    JWT_EXPIRATION= # token expiration time (in minutes)
    SERVER_URL= # url of the server app (with port), used in the client app
    PORT= # port of the server app
    ```

    *Refer to the [`.env.example`](.env.example) file for an example.*

1. Start the application:

    ```bash
    docker compose up -d --build
    ```

    *Make sure that docker is running on your machine before executing this command.*

## Endpoints

### Client endpoints

- `GET /` - main page
- `GET /login` - login page
- `GET /status` - server status page

The `/` endpoint is protected by authentication. To access it, you need to log in first.
If you try to access it without logging in, you will be redirected to the login page.

### Server endpoints

The client app uses the server app for authentication and data storage.
There is no need to use the server app directly, but if you want to (or want to use the API for something else),
here are the available endpoints:

- `GET /` - database management page
- `GET /health` - health check endpoint
- `POST /addUser` - add user endpoint, payload:
  - `username` - string, length between 6 and 20 characters
  - `password` - string, length between 6 and 50 characters
- `POST /deleteUser` - delete user endpoint, payload:
  - `username` - string
- `POST /login` - login endpoint, payload:
  - `username` - string
  - `password` - string

#### Server endpoints protected by authentication

These endpoints require a valid JWT token to work. The token should be passed in the `Authorization` header with the `Bearer` prefix.

- `POST /auth` - authentication endpoint, returns a username if the token is valid
- `GET /download/:photo` - download photo from the database, params:
  - `photo` - string, photo name
- `GET /delete/:photo` - delete photo from the database, params:
  - `photo` - string, photo name
- `GET /photo/:photo` - get photo from the database, params:
  - `photo` - string, photo name
- `GET /thumbnail/:thumb` - get thumbnail from the database, params:
  - `thumb` - string, thumbnail name
- `GET /progressive/:thumb` - get progressive image from the database, params:
  - `thumb` - string, progressive image name
- `GET /photos` - get all photos from the database
- `POST /upload` - upload photo to the database, payload (form-data):
  - `image` - file, photo to upload
  - `name` - string, photo name

## Production build

To run the production version of the app, change the `target` properties in the `docker-compose.yml` file to `production`:

```yml
client:
  build:
    # ...
    target: production
# ...
server:
  build:
    # ...
    target: production
```

If you want to build the production version of the app without docker (for example, to deploy it to a hosting service), check the `Dockerfile` files in both `client` and `server` directories for the required steps.

## Tests

---

**As for the `v0.1.0` version, the tests do not cover the majority of the code, and most of the existing tests do not pass due to changes in the project structure. This will be fixed in the `v0.1.1` or `v0.1.2` patch.**

---

To run the tests, use the following command:

```bash
docker compose run --rm app yarn test
```

Where `app` is the one of the following services:

- `client`
- `server`

## Contributing

If you find issues or have suggestions for improvements,
feel free to open an issue or submit a pull request.
Contributions are welcome!

## Contact

If you have any questions, feel free to contact me at <jakub@korytko.me>.

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## TODO / Upcoming features

This is a list of features that lead to the `v0.2.0` release:

(This list is not exhaustive and may change at any time.
Patch versions may and probably will be released in the meantime.
Keep in mind that the order of the items is not necessarily the order in which they will be implemented.)

- [ ] Add more tests and fix the existing ones
- [ ] Improve the existing API structure
- [ ] Improve the UI
- [ ] Clean up the code
- [ ] Add new technologies (for both the client and the server) and refactor the code accordingly
- [ ] Implement CI/CD
- [ ] Look for and fix potential security issues, vulnerabilities, and bugs
- [ ] Protect routes on the server side
