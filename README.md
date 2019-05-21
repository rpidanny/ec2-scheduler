# ec2-scheduler

A simple serverless app to schedule `start` / `stop` EC2 instances based on Tags.

## Requirements

- [aws cli](https://aws.amazon.com/cli/)
- [serverless](https://serverless.com)

## Usage

### Configure

- Copy `src/config.example.js` to `src/config.js`
- Edit `filterTag` with your EC2 Tag in `src/config.example.js`
- Edit function schedule event in `serverless.yml`

### Deploy

- `npm i`
- `serverless deploy`
