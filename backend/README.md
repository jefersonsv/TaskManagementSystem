# Run local environment

```sh
dotnet run --project .\TMS.Presentation\TMS.Presentation.csproj
```

# Generate script migration

```sh
dotnet ef migrations script --project .\TMS.Infrastructure\TMS.Infrastructure.csproj --startup-project .\TMS.Presentation\TMS.Presentation.csproj -o ScriptMigration.sql
```
