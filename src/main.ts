import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: '*' });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log('listening on port', port);
  });
}
bootstrap();
