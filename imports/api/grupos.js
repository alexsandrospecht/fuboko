import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { check } from 'meteor/check';

export const Grupos = new Mongo.Collection('grupos');

if (Meteor.isServer) {
  Meteor.publish('grupos', function (){
    return Grupos.find({});
  });
}

Meteor.methods({
  'avaliacoes.insertOrUpdate'(grupoId, avaliacao) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    NotaValidation = Match.Where(function (nota) {
      // Match.test(nota, Match.Integer);
      return nota >= 0 && nota <= 5;
    });

    check(avaliacao.notaPasse, NotaValidation);

    grupo = createOrFindGrupo();
    avaliacao.ownerId = Meteor.userId();

    Grupos.update({_id: grupo._id}, {$pull: {'avaliacoes': 
                                        {ownerId: avaliacao.ownerId, avaliadoId: avaliacao.avaliadoId}}});
    Grupos.update({_id: grupo._id },{ $push: { avaliacoes: avaliacao }})
  },
});

function checkNotas(nota) {
  check(nota, Number);
}

function createOrFindGrupo() {
  grupo = Grupos.findOne();
  if (typeof grupo == null) {
    grupo = grupos.insert({nome: 'default', avaliacoes: []});
  }

  return grupo;
}