import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const PORT: number = parseInt(process.env.PORT ?? "3000");

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap();
