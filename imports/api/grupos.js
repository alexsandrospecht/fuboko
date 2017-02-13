import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
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

    checkNotas(avaliacao.notaPasse);

    grupo = createOrFindGrupo();

    avaliacao.ownerId = Meteor.userId();

    Grupos.update({ _id: grupo._id },{ $push: { avaliacoes: avaliacao }})
  },
});

function checkNotas(nota) {
  //TODO
}

function createOrFindGrupo() {
  grupo = Grupos.findOne();
  if (typeof grupo == null) {
    grupo = grupos.insert({nome: 'default', avaliacoes: []});
  }

  return grupo;
}