#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM node:current-alpine
#WORKDIR /app
#COPY . .
#RUN npm run build
#CMD ["npm", "start"]

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
# install NodeJS 14.x
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
#RUN apt-get update -yq 
#RUN apt-get install curl gnupg -yq 
#RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
#RUN apt-get install -y nodejs
##RUN apt install xsel
##RUN npm run build
#CMD ["npm", "run", "build"]
#CMD ["npm", "start"]
#RUN npm install -g serve
##RUN serve -s build

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TaskTracker.UI/TaskTracker.UI.csproj", "TaskTracker.UI/"]
RUN dotnet restore "TaskTracker.UI/TaskTracker.UI.csproj"
COPY . .
WORKDIR "/src/TaskTracker.UI"

RUN dotnet build "TaskTracker.UI.csproj" -c Release -o /app/build
#RUN serve -s build

FROM build AS publish
RUN dotnet publish "TaskTracker.UI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskTracker.UI.dll"]