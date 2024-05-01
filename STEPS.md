# Delopment from scrach

## Setup .NET

Install .NET 8 SDK

How to check?

```sh
dotnet --info
```

## Install cli tools

```sh
dotnet tool install --global dotnet-ef
```

## Setup git

```sh
git init
git checkout -b master
```

### Create .gitignore

```
dotnet new gitignore
```

## Setup Visual Studio Code

### Extension

Install recommended extensions

.vscode\extensions.json

```json
{
  "recommendations": ["esbenp.prettier-vscode", "yzhang.markdown-all-in-one"]
}
```

### Settings

Apply format when save and other settings

.vscode\settings.json

## Setup Project

Create the solutions and projects

```sh
dotnet new sln -n TMS
dotnet new classlib -n TMS.Domain
dotnet new classlib -n TMS.Application
dotnet new classlib -n TMS.Infrastructure
dotnet new webapi -n TMS.Presentation --use-controllers
```

Add the projects to solution

```sh
dotnet sln .\TMS.sln add .\TMS.Domain\TMS.Domain.csproj
dotnet sln .\TMS.sln add .\TMS.Application\TMS.Application.csproj
dotnet sln .\TMS.sln add .\TMS.Infrastructure\TMS.Infrastructure.csproj
dotnet sln .\TMS.sln add .\TMS.Presentation\TMS.Presentation.csproj
```

## Add presentation references

```sh
dotnet add .\TMS.Presentation\TMS.Presentation.csproj reference .\TMS.Infrastructure\TMS.Infrastructure.csproj
dotnet add .\TMS.Presentation\TMS.Presentation.csproj reference .\TMS.Application\TMS.Application.csproj
```

## Add application references

```sh
dotnet add .\TMS.Application\TMS.Application.csproj reference .\TMS.Infrastructure\TMS.Infrastructure.csproj
```

## Add infrastructure references

```sh
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj reference .\TMS.Domain\TMS.Domain.csproj
```

## Install dependencies

### Install instrastructure references

```sh
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.SqlServer
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.Design
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.Extensions.DependencyInjection
```

### Install presentation references

```sh
dotnet add .\TMS.Presentation\TMS.Presentation.csproj package Microsoft.EntityFrameworkCore.Design
dotnet add .\TMS.Presentation\TMS.Presentation.csproj package System.IdentityModel.Tokens.Jwt
dotnet add .\TMS.Presentation\TMS.Presentation.csproj package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Install application references

```sh
dotnet add .\TMS.Application\TMS.Application.csproj package Microsoft.Extensions.DependencyInjection
```

## Develop DBContext and Inject DBContext

## Create migrations

```sh
dotnet ef migrations add InitialCreate --project .\TMS.Infrastructure\TMS.Infrastructure.csproj --startup-project .\TMS.Presentation\TMS.Presentation.csproj
```

## Develop Endpoints

```
dotnet add .\TMS.Application\TMS.Presentation.csproj reference .\TMS.Domain\TMS.Domain.csproj
```

```

```
