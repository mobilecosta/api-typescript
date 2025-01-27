export class AcessoMenuUsuario {
    id_menu_pai: number;
    id_menu: number;
    nome_menu: string;
    filhos?: AcessoMenuUsuario[];
}