-- CreateTable
CREATE TABLE "pessoa" (
    "id_pessoa" SERIAL NOT NULL,
    "hash_registro" CHAR(32),
    "nome" VARCHAR(60) NOT NULL,
    "nome_fantasia" VARCHAR(60),
    "tipo_pessoa" TEXT,
    "cpfCnpj" VARCHAR(14),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "endereco_id" INTEGER,
    "email" VARCHAR(60),
    "data_inclusao" TIMESTAMP(6),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(6),
    "user_alteracao" INTEGER,
    "razao_social" VARCHAR(100),
    "created_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "pessoa_endereco" (
    "id_pessoa_endereco" SERIAL NOT NULL,
    "hash_registro" CHAR(32),
    "cep_endereco" VARCHAR(8),
    "logr_endereco" VARCHAR(60),
    "num_logr_endereco" VARCHAR(50),
    "comp_logr_endereco" VARCHAR(50),
    "bairro" VARCHAR(100),
    "regiao" VARCHAR(100),
    "municipio" VARCHAR(100),
    "estado" VARCHAR(10),
    "tipo_endereco" VARCHAR(100),

    CONSTRAINT "pessoa_endereco_pkey" PRIMARY KEY ("id_pessoa_endereco")
);

-- CreateTable
CREATE TABLE "acesso_acao_tipo_componente" (
    "id_acao_tipo_componente" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "nome_tipo" VARCHAR(100),
    "data_inclusao" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "user_alteracao" INTEGER,

    CONSTRAINT "acesso_acao_tipo_componente_pkey" PRIMARY KEY ("id_acao_tipo_componente")
);

-- CreateTable
CREATE TABLE "acesso_acao" (
    "id_acao" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "nome_acao" VARCHAR(100),
    "ind_ativo" BOOLEAN NOT NULL DEFAULT false,
    "descricao" VARCHAR(100),
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0),
    "user_alteracao" INTEGER,
    "ind_acao_geral" BOOLEAN DEFAULT false,
    "id_acao_tipo" INTEGER,
    "nome_componente" VARCHAR(100),

    CONSTRAINT "acesso_acao_pkey" PRIMARY KEY ("id_acao")
);

-- CreateTable
CREATE TABLE "acesso_acao_tela" (
    "id_acao_tela" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "id_acao" INTEGER,
    "id_tela" INTEGER,
    "descricao_acao" VARCHAR(100),
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0),
    "user_alteracao" INTEGER,

    CONSTRAINT "acesso_acao_tela_pkey" PRIMARY KEY ("id_acao_tela")
);

-- CreateTable
CREATE TABLE "acesso_modulo" (
    "id_modulo" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "nome_modulo" VARCHAR(100),
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0),
    "user_alteracao" INTEGER,

    CONSTRAINT "acesso_modulo_pkey" PRIMARY KEY ("id_modulo")
);

-- CreateTable
CREATE TABLE "acesso_tela" (
    "id_tela" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "nome_tela" VARCHAR(100),
    "ind_pesquisa" BOOLEAN NOT NULL DEFAULT false,
    "ind_dashboard" BOOLEAN NOT NULL DEFAULT false,
    "ind_menu" BOOLEAN NOT NULL DEFAULT false,
    "id_modulo" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "descricao" VARCHAR(255),
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0),
    "user_alteracao" INTEGER,

    CONSTRAINT "acesso_tela_pkey" PRIMARY KEY ("id_tela")
);

-- CreateTable
CREATE TABLE "acesso_usuario_tela" (
    "id_usuario_tela" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "id_usuario" INTEGER NOT NULL,
    "id_tela" INTEGER NOT NULL,
    "acesso_visual" BOOLEAN NOT NULL DEFAULT false,
    "acesso_edicao" BOOLEAN NOT NULL DEFAULT false,
    "acesso_alteracao" BOOLEAN NOT NULL DEFAULT false,
    "acesso_criacao" BOOLEAN NOT NULL DEFAULT false,
    "acesso_exclusao" BOOLEAN NOT NULL DEFAULT false,
    "acesso_impressao" BOOLEAN NOT NULL DEFAULT false,
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0),
    "user_alteracao" INTEGER,
    "ind_ativo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "acesso_usuario_tela_pkey" PRIMARY KEY ("id_usuario_tela")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "nome_usuario" VARCHAR(60),
    "email_usuario" VARCHAR(60),
    "login_usuario" VARCHAR(60),
    "departamento_usuario" VARCHAR(60),
    "senha_usuario" VARCHAR(150),
    "data_inclusao" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),
    "user_alteracao" INTEGER,
    "ind_bloqueado" BOOLEAN NOT NULL DEFAULT false,
    "ind_ativo" BOOLEAN NOT NULL DEFAULT true,
    "ind_expira_senha" BOOLEAN NOT NULL DEFAULT false,
    "data_hora_bloqueio" TIMESTAMP(0),
    "data_hora_inativa" TIMESTAMP(0),
    "data_hora_expira" TIMESTAMP(0),
    "hash_senha" VARCHAR(32),
    "data_alteracao_senha" TIMESTAMP(0),
    "data_inclusao_senha" TIMESTAMP(0),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "acesso_acao_tela_usuario" (
    "id_acao_usuario" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "id_acao_tela" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "data_inclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_alteracao" INTEGER,

    CONSTRAINT "acesso_acao_tela_usuario_pkey" PRIMARY KEY ("id_acao_usuario")
);

-- CreateTable
CREATE TABLE "acesso_usuario_acao" (
    "id_usuario_acao" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "id_usuario" INTEGER NOT NULL,
    "id_acao" INTEGER NOT NULL,
    "data_inclusao" TIMESTAMP(0),
    "user_inclusao" INTEGER,

    CONSTRAINT "acesso_usuario_acao_pkey" PRIMARY KEY ("id_usuario_acao")
);

-- CreateTable
CREATE TABLE "acesso_menu" (
    "id_menu" SERIAL NOT NULL,
    "hash_registro" CHAR(32),
    "id_menu_pai" INTEGER,
    "id_tela" INTEGER,
    "nome_menu" VARCHAR(30),
    "ind_ativo" INTEGER DEFAULT 1,
    "data_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_inclusao" INTEGER,
    "data_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_alteracao" INTEGER,
    "rota_menu" VARCHAR(35),
    "icone_menu" VARCHAR(50),
    "order" INTEGER,

    CONSTRAINT "acesso_menu_pkey" PRIMARY KEY ("id_menu")
);

-- CreateTable
CREATE TABLE "aux_hint_tela" (
    "id_hint_tela" SERIAL NOT NULL,
    "hash_registro" VARCHAR(32),
    "campo_tela" VARCHAR(100),
    "id_tela" INTEGER,
    "hint" VARCHAR(100),

    CONSTRAINT "aux_hint_tela_pkey" PRIMARY KEY ("id_hint_tela")
);

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "pessoa_endereco"("id_pessoa_endereco") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_acao" ADD CONSTRAINT "acesso_acao_id_acao_tipo_fkey" FOREIGN KEY ("id_acao_tipo") REFERENCES "acesso_acao_tipo_componente"("id_acao_tipo_componente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_acao_tela" ADD CONSTRAINT "acesso_acao_tela_id_acao_fkey" FOREIGN KEY ("id_acao") REFERENCES "acesso_acao"("id_acao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_acao_tela" ADD CONSTRAINT "acesso_acao_tela_id_tela_fkey" FOREIGN KEY ("id_tela") REFERENCES "acesso_tela"("id_tela") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_tela" ADD CONSTRAINT "acesso_tela_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "acesso_modulo"("id_modulo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_usuario_tela" ADD CONSTRAINT "acesso_usuario_tela_id_tela_fkey" FOREIGN KEY ("id_tela") REFERENCES "acesso_tela"("id_tela") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_acao_tela_usuario" ADD CONSTRAINT "acesso_acao_tela_usuario_id_acao_tela_fkey" FOREIGN KEY ("id_acao_tela") REFERENCES "acesso_acao_tela"("id_acao_tela") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_usuario_acao" ADD CONSTRAINT "acesso_usuario_acao_id_acao_fkey" FOREIGN KEY ("id_acao") REFERENCES "acesso_acao"("id_acao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_menu" ADD CONSTRAINT "acesso_menu_id_menu_pai_fkey" FOREIGN KEY ("id_menu_pai") REFERENCES "acesso_menu"("id_menu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acesso_menu" ADD CONSTRAINT "acesso_menu_id_tela_fkey" FOREIGN KEY ("id_tela") REFERENCES "acesso_tela"("id_tela") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aux_hint_tela" ADD CONSTRAINT "aux_hint_tela_id_tela_fkey" FOREIGN KEY ("id_tela") REFERENCES "acesso_tela"("id_tela") ON DELETE NO ACTION ON UPDATE NO ACTION;
