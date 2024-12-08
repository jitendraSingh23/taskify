
# **Taskify**

A todo website in next with nextauth authentication. 

### [Vercel Demo](https://taskify-4pidpgd0l-jitendrasingh23s-projects.vercel.app/auth/signup) ###


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Features

- Signin/Signup
- Mark as done
- Delete
- Cross platform
- Todo status(pending/completed)
- Priority(LOW/MEDUIM/HIGH) 
- Due Date



## Tech Stack

**NEXTjs, Typescript, Postgres, TailwindCSS, Prisma, Docker**


## Lessons Learned
- NEXTjs frontend and backend handling
- Authentication using NEXTAUTH
- Typescript type security handling
- Tailwind CSS practice
- Prisma models and schema handle
- Dockerization of applications

## Run Locally

1. Clone the project

```bash
git clone https://link-to-project
```

2. Go to the project directory

```bash
cd taskify
```
3. create .env

```bash
DATABASE_URL="postgresql://postgres:password@db:5432/mydb?schema=sample"
NEXTAUTH_SECRET= your_secret
JWT_SECRET= your_secret
```
4. Build the Docker image

```bash
docker-compose build
```

5. Start the Docker containers

```bash
docker-compose up
```

6. Try to access app on your [localhost:3000](http://localhost:3000/).
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` 
`NEXTAUTH_SECRET`
`JWT_SECRET`



## Feedback

If you have any feedback, please reach out to us at work.jitendrasingh@gmail.com

