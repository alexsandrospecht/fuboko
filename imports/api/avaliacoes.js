import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
Meteor.methods({
  'avaliacoes.insert'(notaPasse, notaDrible, notaPreparoFisico, notaChute, notaMarcacao, avaliadoId) {
    console.log(notaPasse + notaDrible + notaPreparoFisico + notaChute + notaMarcacao + avaliadoId);
    
    check(notaPasse, Number);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Avaliacao.insert({
      notaPasse: notaPasse,
      notaDrible: notaDrible,
      notaPreparoFisico: notaPreparoFisico,
      notaChute: notaChute,
      notaMarcacao: notaMarcacao,
      avaliadoId: avaliadoId,

      createdAt: new Date(),
      owner: this.userId,
    });
  },
});