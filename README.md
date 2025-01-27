# api-typescript
Estrutura Api Base - TypeScript

Etapas
# Geração do prisma
npm run prisma:generate

# Criação das migrantes
npx prisma migrate dev --name init

# Aplicação do Banco
npm run prisma:deploy

# Carga do sistema
node_modules\.bin\ts-node ./prisma/seed.ts

# Executar
npm run start