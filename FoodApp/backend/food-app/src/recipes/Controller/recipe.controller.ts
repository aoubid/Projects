import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';

  import { Recipe } from '../Schema/recipe.schema';
import { RecipeService } from '../Service/recipe.service';
  
  @Controller('recipe')
  export class RecipeController {
    constructor(private recipeService: RecipeService) {}
  
    @Get()
    findAll(
      @Query('limit') limit: string,
      @Query('page') page: string,
      @Query('search') search: string,
    ) {
      const p = page ? parseInt(page) : 1;
      const l = limit ? parseInt(limit) : 10;
      return this.recipeService.findAll({
        limit: l,
        page: p,
        search,
      });
    }
  
    @Post()
    create(@Body() data: Recipe) {
      return this.recipeService.create(data);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.recipeService.delete(id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.recipeService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Recipe) {
      return this.recipeService.update(id, data);
    }
  }
  