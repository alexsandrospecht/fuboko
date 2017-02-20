import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/startup/accounts-config.js';

import '../imports/ui/body.js';
import '../imports/routing/routes.js';

import '../imports/api/users.js';

Template.registerHelper( 'le', (n1, n2) => {
  return n1 <= n2;
});

Template.registerHelper( 'eq', (n1, n2) => {
  return n1 == n2;
});