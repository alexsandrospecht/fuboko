import './sorteio.html';

import { Grupos } from '../api/grupos.js';

Template.sorteio.onCreated(function atletasOnCreated() {
  Meteor.subscribe('users');
  Meteor.subscribe('grupos');

  times = criaTimes();
});

Template.sorteio.helpers({
  times() {
    if (times.sorteado) {
      return times;
    }

    atletas = Meteor.users.find().fetch();
    grupo = Grupos.findOne();

    if (grupo == undefined || atletas == undefined || atletas.length <= 1) {
      return null;
    }

    atletas.forEach(function(atleta) {
      avaliacoes = getAvaliacoes(grupo, atleta._id);
      media = somaMedia(avaliacoes);
      atleta.media = media;
    });

    orderPorNotaMaior(atletas);

    times.time1.atletas.push(atletas[0]);
    times.time1.atletas.push(atletas[atletas.length - 1]);

    times.time2.atletas.push(atletas[1]);
    times.time2.atletas.push(atletas[atletas.length - 2]);

    restante = atletas.slice(2, atletas.length - 2);

    tentativas = 0;
    while(!times.sorteado) {
      tentativas++;

      if (tentativas === 100) {
        return null;
      }

      restante = embaralhar(restante);

      restanteParte1 = restante.slice(0, (atletas.length / 2) - 1);
      restanteParte2 = restante.slice((atletas.length / 2) - 1, (atletas.length - 1));

      simulacaoTime1 = times.time1.atletas.concat(restanteParte1);
      simulacaoTime2 = times.time2.atletas.concat(restanteParte2);

      mediaTime1 = calculaMedia(simulacaoTime1);
      mediaTime2 = calculaMedia(simulacaoTime2);

      dif = mediaTime1 - mediaTime2;

      countAtletasTime1 = simulacaoTime1.length;
      countAtletasTime2 = simulacaoTime2.length;

      // Garante que o time que tiver menos jogadores tenha media maior
      if (countAtletasTime1 !== countAtletasTime2) {
        if ((mediaTime1 > mediaTime2) == (countAtletasTime1 > countAtletasTime2)) {
          continue;
        }
      } 

      if (dif > -0.2 && dif < 0.2) {
        times.time1.atletas = simulacaoTime1;
        orderPorNotaMaior(times.time1.atletas);
        times.time1.media = Math.round(mediaTime1*100)/100;

        times.time2.atletas = simulacaoTime2;
        orderPorNotaMaior(times.time2.atletas);
        times.time2.media = Math.round(mediaTime2*100)/100;

        times.sorteado = true;
      }
    }

    return times;
	},
});

Template.atletaSorteio.helpers({
  nome() {
  	if (this.profile !== undefined) {
  		return this.profile.name;
  	}
  	return '';
	},
});

function getAvaliacoes(grupo, avaliadoId) {
  return grupo.avaliacoes.filter(function(chain) {
    return chain.avaliadoId == avaliadoId;
  });
}

function somaMedia(avaliacoes) {
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
    return 2.5;
  }

  return somaFinal / avaliacoes.length;
}

function calculaMedia(atletas) {
  this.somaMedia = 0.0;
  atletas.forEach(function(atleta) {
    this.somaMedia += atleta.media;
  });
  return this.somaMedia / atletas.length;
}

function criaTimes() {
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

function embaralhar(atletas) {
  for (var c = atletas.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = atletas[c];
    atletas[c] = atletas[b];
    atletas[b] = a;
  }
  return atletas;
}

function orderPorNotaMaior(atletas) {
  atletas.sort(function(atleta1, atleta2) {
    return atleta2.media - atleta1.media;
  });
}