## Twitter Clone

![Built with React](https://img.shields.io/badge/Built%20with-React-16aae2?style=for-the-badge&logo=react&logoColor=white) ![Powered by Nest.js](https://img.shields.io/badge/Powered%20by-Nest.js-e0234e?style=for-the-badge&logo=nestjs&logoColor=white) ![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![Hosted on Netlify](https://img.shields.io/badge/Hosted%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

A modern web application built with cutting-edge technologies to replicate the essence of Twitter. It's developed using React for the frontend, Nest.js for the backend, PostgreSQL as the database, and hosted on the Netlify platform


## Run Locally
Clone the project
Make sure your have @nestjs/cli and postgres installed on your local setup

```bash
  git clone https://github.com/sheikx1221/Twitter-Clone
```
## Server Setup  
Go to the project directory

```bash
cd clone-backend
```

Install dependencies
```bash
npm install
```

Start the server
```bash
npm run start
```

Fill .env for database configuraion
```
DATABASE_HOST="localhost"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE="twitter"

```

Run the backend
```bash
npm run start
```

Seed Data into Databases   
(open link in browser after server is running)
```bash
http://locahost:3000/users/seed
```

## Client App

Go to project directory
```bash
cd twitter-clone
```

Install dependencies
```bash
npm install
```

Start the server
```bash
npm run dev
```