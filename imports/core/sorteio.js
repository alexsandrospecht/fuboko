export class Sorteio {

  constructor(atletas, grupo) {
    this.atletas = atletas;
    this.grupo = grupo;
  }

  sortear() {
    this.times = this.criaTimes();

    this.calculaMediaAtletas();
    this.orderPorNotaMaior(this.atletas);

    times.time1.atletas.push(atletas[0]); // Melhor jogador
    times.time1.atletas.push(atletas[atletas.length - 1]); // Pior jogador

    times.time2.atletas.push(atletas[1]); // Segundo melhor
    times.time2.atletas.push(atletas[atletas.length - 2]); // Segundo pior

    restante = atletas.slice(2, atletas.length - 2);

    tentativas = 0;
    while(!times.sorteado) {
      tentativas++;

      if (tentativas === 100) {
        return null;
      }

      restante = this.embaralhar(restante);

      restanteParte1 = restante.slice(0, (atletas.length / 2) - 1);
      restanteParte2 = restante.slice((atletas.length / 2) - 1, (atletas.length - 1));

      simulacaoTime1 = times.time1.atletas.concat(restanteParte1);
      simulacaoTime2 = times.time2.atletas.concat(restanteParte2);

      mediaTime1 = this.getSomaMedias(simulacaoTime1);
      mediaTime2 = this.getSomaMedias(simulacaoTime2);

      countAtletasTime1 = simulacaoTime1.length;
      countAtletasTime2 = simulacaoTime2.length;

      // Garante que o time que tiver menos jogadores tenha media maior
      if (countAtletasTime1 !== countAtletasTime2) {
        if ((mediaTime1 > mediaTime2) == (countAtletasTime1 > countAtletasTime2)) {
          continue;
        }
      } 

      dif = mediaTime1 - mediaTime2;
      if (dif > -0.2 && dif < 0.2) {
        times.time1.atletas = simulacaoTime1;
        this.orderPorNotaMaior(times.time1.atletas);
        times.time1.media = Math.round(mediaTime1*100)/100;

        times.time2.atletas = simulacaoTime2;
        this.orderPorNotaMaior(times.time2.atletas);
        times.time2.media = Math.round(mediaTime2*100)/100;

        times.sorteado = true;
        return times;
      }
    }
  };

  calculaMediaAtletas() {
    this.atletas.forEach(function(atleta) {
      avaliacoes = this.getAvaliacoesAtleta(atleta._id);
      media = this.getMediaAvaliacoes(avaliacoes);
      atleta.media = media;
    }.bind(this));
  };

  getAvaliacoesAtleta(avaliadoId) {
    return this.grupo.avaliacoes.filter(function(chain) {
      return chain.avaliadoId == avaliadoId;
    });
  }

  getMediaAvaliacoes(avaliacoes) {
    somaFinal = 0;

    avaliacoes.forEach(function(avaliacao) {
      soma = 0.0;

      soma += avaliacao.notaPasse;
      soma += avaliacao.notaDrible;
      soma += avaliacao.notaPreparoFisico;
      soma += avaliacao.notaChute;
      soma += avaliacao.notaMarcacao;

      somaFinal += (soma/5); 
    });

    if (somaFinal == 0) {
      // FIXME: Calcular uma media de todos os jogadores e usa-la quando o jogador nao possui uma.
      return 2.5;
    }

    return somaFinal / avaliacoes.length;
  }

  orderPorNotaMaior(atletas) {
    atletas.sort(function(atleta1, atleta2) {
      return atleta2.media - atleta1.media;
    });
  }

  embaralhar(atletas) {
    for (var c = atletas.length - 1; c > 0; c--) {
      var b = Math.floor(Math.random() * (c + 1));
      var a = atletas[c];
      atletas[c] = atletas[b];
      atletas[b] = a;
    }
    return atletas;
  }

  criaTimes() {
    times = new Object();
      
    times.time1 = new Object();
    times.time1.nome = 'Time 1';
    times.time1.atletas = [];

    times.time2 = new Object();
    times.time2.nome = 'Time 2';
    times.time2.atletas = [];

    times.sorteado = false;

    return times;
  }

  getSomaMedias(atletas) {
    var somaMedia = 0.0;
    atletas.forEach(function(atleta) {
      somaMedia += atleta.media;
    });
    return somaMedia / atletas.length;
  }

}
