import Person from '../models/person';
import template from './PersonEditable.html';

class PersonReadOnly {
  person: Person;

  constructor(params: { person: Person }) {
    this.person = params.person;
  }
}

// The default export returns the component details object to register with KO
export default { viewModel: PersonReadOnly, template: template };
