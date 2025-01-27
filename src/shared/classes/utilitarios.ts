import { createHmac, randomUUID } from 'crypto';
import * as moment from 'moment';

export class Utilitarios {
  static GerarHashSenha(senha: string): string {
    const hash = createHmac('sha512', senha)
      .update(process.env.HASH_SECRET)
      .digest('hex');
    return hash;
  }

  static GerarHash() {
    return randomUUID().replaceAll('-', '');
  }

  static ObterData() {
    return moment(new Date())
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .toDate();
  }

  static ObterDataFormatada() {
    const agora = new Date();

    // Formatar data no formato yyyy-mm-dd
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}

  static ObterHora() {
    const agora = new Date();
    return `${agora.getHours()}:${agora.getMinutes()}`
  }

  static DataFormatarCliente(data: any = []) {
    const retorno = [];
    if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        data[index]['id_pessoa'] = data[index].id_pessoa
          .toString()
          .padStart(6, '0');
        retorno.push(data[index]);
      }
    } else {
      data['id_pessoa'] = data.id_pessoa.toString().padStart(6, '0');
      return data;
    }

    return retorno;
  }

  static DataAtual() {
    const data = new Date();

    const ret = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

    return ret;
  }

  static VerificarHora(horaFinal: any, tabelas: any[]) {
    const horaComparativa = new Date();
    horaComparativa.setHours(horaFinal.split(':')[0], horaFinal.split(':')[1], 0);

    return tabelas.filter(tabela => {
      if (!tabela.hora_final) return false; // Se a hora final for null, retorna falso

      const horaTabela = new Date();
      horaTabela.setHours(tabela.hora_final.split(':')[0], tabela.hora_final.split(':')[1], 0);

      return horaTabela <= horaComparativa;
    });
  }

  static formatarDataISO(data: string): string {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
