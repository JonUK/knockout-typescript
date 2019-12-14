import * as ko from 'knockout';

import Person from './models/person';
import PersonReadOnly from './components/PersonReadOnly';
import PersonEditable from './components/PersonEditable';

import filmsBinding from './bindings/filmsBinding';

ko.components.register('person-read-only', PersonReadOnly);
ko.components.register('person-editable', PersonEditable);

ko.bindingHandlers.films = filmsBinding;

class AppViewModel {
  person: Person;

  constructor() {

    // These values are hard-coded but could come from a server API request with JSON response
    this.person = new Person(
      'Jon',
      'Keeping',
      ['The Matrix', 'The Shawshank Redemption', 'Upgrade']
    )
  }
}


ko.applyBindings(new AppViewModel(), document.getElementById('app'));