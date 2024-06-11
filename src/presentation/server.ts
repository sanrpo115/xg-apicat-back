import express, { Router } from 'express';
const cors = require('cors');

interface Options {
  port?: number,
  routes: Router
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor (options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start () {
    this.app.use(cors());

    const corsOptions = {
      origin: 'http://localhost:4200',
      methods: 'GET, POST',
      allowedHeaders: 'Content-Type, Authorization, x-api-key'
    };
    
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}