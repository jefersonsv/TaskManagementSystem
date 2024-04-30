# Task Management System

Consistes on endpoints and UI to manage simples tasks

## Pre requirements

1. .NET Core 8.0
2. Nodejs 20.11.1
4. PNPM - Package Manager

All commands describled in this document section must be executed from the root folder (aka: the folder of this document).
However the cd <backend/frontend> can be omitted if you already are inside the related folder

## Install the dependencies

### Backend dependencies

Use dotnet tool to restore the packages

```
cd backend
dotnet restore
```

### Frontend dependencies

Use pnpm to to restore the packages

```
cd frontend
pnpm i
```

## Run project in development mode

Running the project in debug mode will perform the database migration to create the database and tables

### Run backend in development

Use the dotnet cli to run the backend service. For local development purpose we can use http protocol

```
dotnet run --project .\backend\TMS.Presentation\TMS.Presentation.csproj --launch-profile "http"
```

It will start the server at: 
http://localhost:5234

Notes: 
1. You can use the profile "https" to start the server on SSL protocol
2. The swagger ui is available to use on development mode. Access that at: http://localhost:5234/swagger/
3. Currentilly the cors settings allows requestes from the origin http://localhost:5173. Make sure if you have different host 

### Run frontend in development

Use the pnpm to run 
```
cd frontend
pnpm run dev
```
It will start the server at: 
http://localhost:5173

 
Note: Currentlly there is an environment VITE_API_ENDPOINT variable file at ".env" configuring the API endpoints to http://localhost:5234. Make sure if you have different ports or protocol update that variable accordilly.