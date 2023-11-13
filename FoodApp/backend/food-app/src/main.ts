import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // le domaine de l'application Angular 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // les methodes HTTP autorisées
   
  
});
  await app.listen(3000);
}
bootstrap();
