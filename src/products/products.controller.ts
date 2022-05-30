import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { microserviceConfig } from 'src/microserviceConfig';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  onModuleInit() {
    const requestPatterns = [
      'notify',
    ];

    requestPatterns.forEach(pattern => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Client(microserviceConfig)
  client: ClientKafka;

  @EventPattern('notify')
  async handleSubscription(payload: any) {
    console.log(payload.value);
    let product : Product =  await this.productsService.findOne(+payload.value.idProd, { });
    product.quantity += payload.value.qte; 
    return this.productsService.update(+payload.value.idProd, product);
  }

  @Post()
  create(@Body() createproductDto: CreateProductDto) {
    return this.productsService.create(createproductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll({});
  }

  @Patch('buy/:id')
  async buy(@Param('id') id: string, @Body() prod) {

    let product : Product =  await this.productsService.findOne(+id, { });
    console.log(product);
    console.log(prod.quantite)

    if(product.quantity >= prod.quantite){
      this.client.emit<Object>('achat', {'idProd':product.id, 'qte' : prod.quantite });
      product.quantity -= prod.quantite; 
      return this.productsService.update(+id, product);
    }
    else {
      this.client.emit<Object>('achat', {'idProd':product.id, 'isUser' : 1 });
      return HttpCode(200);
    }
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id, { });
  }

  @Patch(':id')
  async update( @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    //const product = await this.productsService.findOne(+id, { "relations": ["user"] })
      return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove( @Param('id') id: string) {
      return this.productsService.remove(+id);
  }
}