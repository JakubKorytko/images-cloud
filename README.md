![Npm version](https://img.shields.io/badge/npm-v17.0.2-blue) ![License](https://img.shields.io/github/license/JakubKorytko/images-cloud) ![Version](https://img.shields.io/github/v/release/JakubKorytko/images-cloud)


![Dark mode logo](./logo_dark.png#gh-light-mode-only)
![Light mode logo](./logo_light.png#gh-dark-mode-only)

Your personal cloud-based images gallery.

- [🔧 Tech Stack](#-tech-stack)
- [🔍 Demo](#-demo)
- [🎉 Cool features](#-cool-features)
- [🔑 Environment Variables](#-environment-variables)
  - [💙 With docker](#-with-docker)
    - [Create .env file in root directory `images-cloud/`](#create-env-file-in-root-directory-images-cloud)
  - [💔 Without docker](#-without-docker)
    - [Create .env file in root directory of client `images-cloud/client`](#create-env-file-in-root-directory-of-client-images-cloudclient)
    - [Create .env file in root directory of server `images-cloud/server`](#create-env-file-in-root-directory-of-server-images-cloudserver)
- [🏃 Run Locally](#-run-locally)
  - [💙 Run app with docker](#-run-app-with-docker)
  - [💔 Run app without docker](#-run-app-without-docker)
    - [📟 Server](#-server)
    - [💻 Client](#-client)
- [👷 Running Tests](#-running-tests)
  - [💙 Test app with docker](#-test-app-with-docker)
  - [💔 Test app without docker](#-test-app-without-docker)
- [🔨 Usage](#-usage)
  - [🏥 Healthcheck](#-healthcheck)
  - [👨 Users](#-users)
  - [🔒 Authentication](#-authentication)
  - [📁 Uploading images](#-uploading-images)
  - [🔧 Images tools](#-images-tools)
    - [❌ Deleting](#-deleting)
    - [⬇️ Downloading](#️-downloading)
    - [📝 Editing](#-editing)
- [🔜 Upcoming things](#-upcoming-things)


## 🔧 Tech Stack

**Both**: Typescript, Docker, Docker-Compose, Jest

**Client:** React, React-router, Bootstrap, SCSS

**Server:** Node, Express, SQLite, EJS

## 🔍 Demo

❗ Both demo and "stanley" sample user uses images from https://unsample.net, list of pictures authors [here](./__credits.json) 

You can check this app on https://imagescloud.korytko.me

Login data:
```bash
username: test
password: qwerty123
```

Deleting and uploading images functions are blocked on demo version for safety reasons
    
## 🎉 Cool features

- Images 
	- Images load in the specific order:
		- First placeholder is loaded (in the size of image)
		- Then server sends a very small version of image (few pixels)
		- And at the end it displays original image
	- When images are uploaded, server automatically creates thumbnail of image and very small version of it to display when its loading
	- To see images on your cloud you need to be authenticated, images links are just blobs that can't be shared
- App is fully responsive
- Images in gallery fills empty space just like puzzles (hard to describe, just take a look at layout)
- When server is down, client will automatically redirect user to website where you can check when server will be up again


## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your .env file or files

### 💙 With docker

#### Create .env file in root directory `images-cloud/`

```
CLIENT_PORT // port of client app
SERVER_PORT // port of server app
SERVER_URL // url of server app
CONNECTION_TEST_INTERVAL // interval of testing if server is working and user is authenticated (in ms)
JWT_EXPIRATION // time until jwt token expire (in minutes)
APP_SECRET // jwt web token
```
Example (you can copy these values to test things out):
```
CLIENT_PORT=3000
SERVER_PORT=3001
SERVER_URL=http://localhost:3001
CONNECTION_TEST_INTERVAL=5000
JWT_EXPIRATION=30
APP_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0NDIyNTQyMCwiaWF0IjoxNjQ0MjI1NDIwfQ.zUaDZTIgA0HEiBGzkJXbpcoWq63DoU4gO6wUZo4a_iI
```

### 💔 Without docker

#### Create .env file in root directory of client `images-cloud/client`

```
REACT_APP_CONNECTION_TEST_INTERVAL // interval of testing if server is working and user is authenticated (in ms)
REACT_APP_SERVER_URL // url of server app
```
Example (you can copy these values to test things out):
```
REACT_APP_CONNECTION_TEST_INTERVAL=5000
REACT_APP_SERVER_URL=http://localhost:3001
```

#### Create .env file in root directory of server `images-cloud/server`

```
APP_SECRET // jwt web token
SERVER_URL // url of server app
JWT_EXPIRATION // time until jwt token expire (in minutes)
```
Example (you can copy these values to test things out):
```
APP_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0NDIyNTQyMCwiaWF0IjoxNjQ0MjI1NDIwfQ.zUaDZTIgA0HEiBGzkJXbpcoWq63DoU4gO6wUZo4a_iI
SERVER_URL=http://localhost:3001
JWT_EXPIRATION=30
```

## 🏃 Run Locally

Clone the project

```bash
  git clone https://github.com/JakubKorytko/images-cloud
```

Go to the project directory

```bash
  cd images-cloud
```
App is dockerized and its supposed to run on docker but you can run it without it

### 💙 Run app with docker

Start both server & client

```bash
  docker-compose up -d --build
```
### 💔 Run app without docker

Both server and client is needed for app to work properly. You need to run it in separate instances

#### 📟 Server

```bash
  cd server
  npm install
  npm run dev
```
#### 💻 Client

```bash
  cd client
  npm install
  npm start
```
## 👷 Running Tests

### 💙 Test app with docker

Test server
```bash
  docker-compose exec server npm test
```
Test client
```bash
  docker-compose exec client npm test
```
### 💔 Test app without docker

Run the following command in server or client directory

```bash
  npm run test
```

## 🔨 Usage

### 🏥 Healthcheck

You can check if server is up on client side at `/status`

```bash
  e.g. http://localhost:3000/status
```

### 👨 Users

To use images-cloud you need to create user. There are two default users in database. One is test user needed for testing purposes - don't delete it or tests will break. The other one is stanley - made to test things out, it even has some images uploaded already.

| Username             | Password                                                                |
| ----------------- | ------------------------------------------------------------------ |
| test user | - |
| stanley | qwerty123 |

You can create or delete users at server url
```bash
  e.g. http://localhost:3001/
```

⚠️ There is not authentication on server side to manipulate users, if you want to deploy this app, you should add some for safety!

### 🔒 Authentication

In order to use app you need to log in at `/login` client page

```bash
  e.g. http://localhost:3000/login
```

This app use JWT to authenticate users. They are valid [`JWT_EXPIRATION env variable`] minutes

### 📁 Uploading images

Every user can upload images to his cloud when logged in.
There are two requirements to upload a image:
1. Max size is 20MB (defined by multer - but can be limited by server its hosted on)
2. File must have a png/jpg/jpeg extension

⚠️ Uploading images in other way than build-in uploader may cause problems (thumbnails will not generate)

### 🔧 Images tools

#### ❌ Deleting

You can delete image from cloud by opening it or multiple images by selecting them in gallery (remember that it can't be undone) 

#### ⬇️ Downloading

You can download images from your cloud.

#### 📝 Editing

Editing is provided by `@toast-ui/react-image-editor`

## 🔜 Upcoming things

- Compression on upload
- Authentication on server side