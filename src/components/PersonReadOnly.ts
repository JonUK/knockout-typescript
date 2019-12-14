import Person from '../models/person';
import template from './PersonReadOnly.html';

class PersonReadOnly {
  person: Person;

  constructor(params: any) {
    this.person = params.person;
  }
}

// The default export returns the component details object to register with KO
export default { viewModel: PersonReadOnly, template: template };
