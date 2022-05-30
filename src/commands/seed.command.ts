import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as faker from "faker"
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('in seed File');
  // application logic...

  // Todo : Seed Product
  const productService = app.get(ProductsService);
  console.log('seeding products');
  for (let i = 1; i < 10; i++) {
    const product = new Product();
    product.name = faker.commerce.productName();
    product.price = parseFloat(faker.commerce.price());
    product.quantity = i + 4;
    await productService.create(product);
  }
  console.log('end seed product');

  // Todo : Seed User
  const userService = app.get(UsersService);
  console.log('seeding users');
  const user = new User();
  user.email = faker.internet.email();
  await userService.create(user);
  console.log('end seeding users');

  await app.close();
}
bootstrap();