import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Grupos } from './grupos.js';

DEFAULT_ID = 'NQwN9q4qaNFwnzgsK';

if (Meteor.isServer) {
  Meteor.publish('avaliacoes.byGrupoIdOwnerIdAvaliadoId', function(grupoId, ownerId, avaliadoId) {
    return Grupos.find({'_id': grupoId}, 
                       { avaliacoes: [$elemMatch: {avaliadoId: avaliadoId, ownerId: avaliadorId}]});
  });
}

if (Meteor.client) {
  Meteor.subscribe('avaliacoes.byGrupoIdOwnerIdAvaliadoId');
}

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

  'avaliacoes.find'(avaliadoId) {
    return 'avaliacoes.find'(DEFAULT_ID, this.userId);
  },

  'avaliacoes.find'(grupoId, avaliadorId, avaliadoId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(JSON.stringify(Meteor.call('grupos.findAll')));
    console.log(JSON.stringify(Grupos.find({}).fetch()));
    console.log(JSON.stringify(handle.ready()));
    console.log('aaa');

    obj = 

    console.log(JSON.stringify(obj));
    return null;    
  },
});

function createOrFindGrupo() {
  grupo = Grupos.findOne();
  if (typeof grupo == null) {
    grupo = grupos.insert({nome: 'default', avaliacoes: []});
  }

  return grupo;
}