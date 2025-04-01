import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import userRouter from './routes/user.routes';

class App {
  public app: Express;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.initializeDatabase();
    this.middlewares();
    this.routes();
  }

  private async initializeDatabase(): Promise<void> {
    await connectDB();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'API is running!' });
    });

    // Rotas do usuário
    this.app.use('/api', userRouter);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new App();
server.start();
