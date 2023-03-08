1. First we need to get running postgres could be install on machine or running an image from docker with the next command:

docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

2. Create a new database with the name `calculator`

3. Change the name of `.env_example` to `.env`

4. Install the app

` $ npm install`

5. Start the app

` $ npm run start:dev`

After running the app for the first time, the scheme of the db should be created using the entities declared automatically.

7. Now we run the seed script, this should insert some neccesary data to the db.

Stop the app with `(Ctrl + c)` and then run:

` $ npm run seed`

8. Start the app (step 5), and ready.

Other scripts

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
