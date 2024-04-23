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

```
dotnet new sln -n TMS
dotnet new classlib -n TMS.Domain
dotnet new classlib -n TMS.Application
dotnet new classlib -n TMS.Infrastructure
dotnet new webapi -n TMS.Presentation --use-controllers
```

Add the projects to solution

```
dotnet sln .\TMS.sln add .\TMS.Domain\TMS.Domain.csproj
dotnet sln .\TMS.sln add .\TMS.Application\TMS.Application.csproj
dotnet sln .\TMS.sln add .\TMS.Infrastructure\TMS.Infrastructure.csproj
dotnet sln .\TMS.sln add .\TMS.Presentation\TMS.Presentation.csproj
```

## Add project references

````sh
dotnet add .\TMS.Application\TMS.Application.csproj reference .\TMS.Domain\TMS.Domain.csproj
dotnet add .\TMS.Application\TMS.Application.csproj reference .\TMS.Infrastructure\TMS.Infrastructure.csproj
```sh

## Install dependencies

```sh
dotnet add .\TMS.Application\TMS.Application.csproj package Microsoft.EntityFrameworkCore
dotnet add .\TMS.Application\TMS.Application.csproj package Microsoft.EntityFrameworkCore.SqlServer
dotnet add .\TMS.Application\TMS.Application.csproj package Microsoft.EntityFrameworkCore.Design
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.SqlServer
dotnet add .\TMS.Infrastructure\TMS.Infrastructure.csproj package Microsoft.EntityFrameworkCore.Design
````

## Create migrations

```sh
dotnet ef migrations add InitialCreate --project .\TMS.Infrastructure\TMS.Infrastructure.csproj --startup-project .\TMS.Application\TMS.Application.csproj
```
