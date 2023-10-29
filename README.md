# Currency Exchange Futures with Node.js and TypeScript

## Prerequisites

Before you start, ensure that you have the following prerequisites installed on your machine:

- Docker
- A code editor of your choice (e.g., Visual Studio Code)
- Node.js and npm (Optional)

## Starting the Server

### Running Multiple Instances

To run multiple instances, you should upload the Dockerfile image to Docker Hub and then use an orchestration tool like Kubernetes (k8s) with ReplicaSet, DaemonSet, Jobs, etc.

### Running a Single Instance

To run a single instance, follow these steps:

1. Clone this repository.
2. Run `npm install`.
3. Run `docker-compose up` to start the database and Redis. If you already have a running database and Redis, update the `config.env` variables to match your configuration.
4. Run `npm start`.

Alternatively, you can use the Dockerfile:

1. Clone this repository.
2. Build an image by running `docker build -t futures-currency .`.
3. Run the container using the following command, making sure to provide your database and Redis host information:
`docker run -p 3001:3001 -e DB_HOST="YOUR_DB_HOST" -e REDIS_HOST="YOUR_REDIS_HOST" --network YOUR_DB_REDIS_NETWORK futures-currency`
For example: 
`docker run -p 3001:3001 --name futures-currency -e DB_HOST="172.24.0.2" -e REDIS_HOST="172.24.0.3" --network futures-currency`

## Communicating with server
To add a subscription for a specific coin, send a POST request to:
Endpoint: http://YOUR_HOST:3001/api/coin/
With Request Body:
`{
  "coin": "YOUR_COIN"
}`
- Use DELETE unsubscribe from coin exchange:
DELETE http://YOUR_HOST:3001/api/coin/YOUR_COIN

<mark>Example</mark>:
POST http://localhost:3001/api/coin/
Request Body:
`{
  "coin": "btc"
}`
DELETE http://localhost:3001/api/coin/btc
## Testing

To run tests, follow these steps:

1. Clone this repository.
2. Run `npm test`.
