# Task Management System

Consists on endpoints and UI to manage simple tasks

## Pre requirements

1. .NET Core 8.0
2. Nodejs 20.11.1
3. PNPM - Package Manager

All commands described in this document section must be executed from the root folder (aka: the folder of this document).
However, the cd <backend/frontend> can be omitted if you are inside the related folder

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
2. The swagger ui is available to use in development mode. Access that at: http://localhost:5234/swagger/
3. Currently the cors settings allow requests from the origin http://localhost:4173. Make sure you have the same host
   
### Run frontend in development

Use the pnpm to run

```
cd frontend
pnpm i
pnpm run build
pnpm run preview
```

It will start the server at:
http://localhost:4173

Note: Currently there is an environment VITE_API_ENDPOINT variable file at ".env" configuring the API endpoints to http://localhost:5234. Make sure if you have different ports or protocol, update that variable accordingly.