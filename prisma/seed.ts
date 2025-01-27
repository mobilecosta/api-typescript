import { PrismaClient } from '@prisma/client';
import { Utilitarios } from '../src/shared/classes/utilitarios';

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.usuario.create({
    data: {
      nome_usuario: 'admin',
      login_usuario: 'admin',
      email_usuario: 'mobile.costa@gmail.com',
      ind_ativo: true,
      ind_expira_senha: false,
      hash_registro: '283e05c3dd604e61a66661abd095ddd2',
	  senha_usuario: Utilitarios.GerarHashSenha('admin')
    },
  })
}

main()
  .then(async (res) => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    // console.error('Seed failed: ' );
	console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
