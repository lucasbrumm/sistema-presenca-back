import express, { Express, Request, Response } from 'express';
import cors from 'cors';

class App {
  public app: Express;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'API is running!' });
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new App();
server.start();
