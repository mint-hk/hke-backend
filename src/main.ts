import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import configuration from './configuration';

async function bootstrap() {
  const config = configuration();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());

  if (config.enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('HKE-backend API')
      .setDescription(
        'To access guarded endpoints use **/auth/login** to login. Use **/auth/refresh** to refresh your session.',
      )
      .setVersion(version)
      .addTag('auth')
      .addTag('users')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { docExpansion: 'none' },
    });
  }

  await app.listen(config.port);
}
bootstrap();
