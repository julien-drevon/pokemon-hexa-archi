import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PokedexModule } from './pokedex.module';

async function bootstrap() {
  const app = await NestFactory.create(PokedexModule);

  const config = new DocumentBuilder()
    .setTitle('Pokedex example')
    .setDescription('The pokedex API description')
    .setVersion('1.0')
    .addTag('pokedex')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
