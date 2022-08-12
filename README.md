<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in Dev
1. Clone repo
```
git clone git@github.com:Deluxer/nest-pokedex.git
```

2. install
```
yarn install
```
3. Install Nest CLI
```
npm i -g @nest/cli
```

4. Create Database with docker
```
docker-compose up -d
```

5. copy ```.env.example``` and rename to ```.env```

6. Set enviroment variables

7. Start project
```
yarn start:dev
```

8. Seed, populate the database
```
{{url}}/api/v2/seed
```

## Stack used
* MongoDB
* Nest

### Dependencies
* Joi
* Mongoose
* Axios

# Build production
1. Create file ``` .env.prod```
2. Set enviroment variables
3. Create new image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Notes

Heroku deploy without save changes
```
git commit --allow-empty -m "Trgger heroku deploy"
git push heroku main
```