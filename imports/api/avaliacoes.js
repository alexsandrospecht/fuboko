import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Grupos } from './grupos.js';

Meteor.methods({
  'avaliacoes.insert'(notaPasse, notaDrible, notaPreparoFisico, notaChute, notaMarcacao, avaliadoId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(notaPasse, Number);

    grupo = createOrFindGrupo();

    avaliacao = new Object();

    avaliacao.notaPasse = notaPasse;
    avaliacao.notaDrible = notaDrible;
    avaliacao.notaPreparoFisico = notaPreparoFisico;
    avaliacao.notaChute = notaChute;
    avaliacao.notaMarcacao = notaMarcacao;
    avaliacao.avaliadoId = avaliadoId;
    avaliacao.createdAt = new Date();
    avaliacao.ownerId = this.userId;

    Grupos.update({ _id: grupo._id },{ $push: { avaliacoes: avaliacao }})
  },
});

function createOrFindGrupo() {
  grupo = Grupos.findOne();
  if (typeof grupo == null) {
    grupo = grupos.insert({nome: 'default', avaliacoes: []});
  }

  return grupo;
}