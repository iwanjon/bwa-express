import winston from 'winston';
import LokiTransport from 'winston-loki';
import { createLogger, transports, format, Logger } from "winston"


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  handleExceptions:true,
  handleRejections:true,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname:"C:/Users/lenovo/Documents/personal/loki/log",
      filename:"damn.log"
    }
    ),
    // new LokiTransport({
    //   host: 'http://localhost:3100',
    //   json: true,
    // }),
    // new LokiTransport({
    //   handleExceptions:true,
    //   handleRejections:true,
    //     // host: 'https://599472:eyJrIjoiMzBiNGFkZTc4MTk4NzFhYTI1NDc2MTI1YmE2ZGQxZTc1NjQyYzE1NSIsIm4iOiJqdXN0X3Rlc3QiLCJpZCI6ODU4NjQwfQ==@logs-prod-011.grafana.net/loki/api/v1/push',
    //     // host: 'https://599472:eyJrIjoiMGFlYmRlMjdmODUzZGNiZDY0OWRjNGRiZDVjMzYyY2I3MDZkMGExMCIsIm4iOiJ0ZXN0IiwiaWQiOjg1ODY0MH0=@logs-prod-011.grafana.net/loki/api/v1/push',
    //     // json: true,
    //     format: format.json(),
    //     replaceTimestamp: true,
    //     // labels: {
    //     //   app: 'express-logs',
    //     //   level: 'info',
    //     // },
    //     onConnectionError:(error)=> console.log(error, "this is eroor"),
    //     // host: 'https://logs-prod-011.grafana.net',
    //     host: 'http://localhost:3100',
    //     json: true,
    //     // basicAuth: '599472:eyJrIjoiMGFlYmRlMjdmODUzZGNiZDY0OWRjNGRiZDVjMzYyY2I3MDZkMGExMCIsIm4iOiJ0ZXN0IiwiaWQiOjg1ODY0MH0=',
    //     labels: { job: 'winston-loki-example' }
    // })
  ],
});

export default logger;
