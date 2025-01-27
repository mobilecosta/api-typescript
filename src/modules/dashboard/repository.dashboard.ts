import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Utilitarios } from 'src/shared/classes/utilitarios';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

}
