import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class MenuRepository {
    constructor(private readonly prisma: PrismaService) { }

    searchByRouter(router: string) {
        return this.prisma.acesso_menu.findFirst({
            where: {
                rota_menu: router,
            },
        });
    }
}