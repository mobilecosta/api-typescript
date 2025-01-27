import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuRepository } from './repository/menu.repository';

@Injectable()
export class MenuService {

  constructor(
    private readonly menuRepository: MenuRepository,
  ) {}

  searchByRouter(router: string) {
    return this.menuRepository.searchByRouter(router);
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }
}
