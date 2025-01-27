import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository.dashboard';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async findAll() {
    const data = {
      clientes: 1

    };

    return data;
  }
}
