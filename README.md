# knockout-typescript
An example of using TypeScript and Knockout’s type definitions to create view models, components and bindings that are strongly typed.

To run this example, execute the following commands:

```
npm install
npm run serve
```

The following article accompanies this repo.  
[https://keepinguptodate.com/pages/2019/12/using-typescript-with-knockout/](https://keepinguptodate.com/pages/2019/12/using-typescript-with-knockout/)

## Show me some code
A model that uses the types `Observable`, `ObservableArray` and `Purecomputed` which are all built-in to Knockout as of v3.5.0.
```javascript
import * as ko from 'knockout';  
import {
  Observable, ObservableArray, PureComputed
} from 'knockout';  
  
class Person {  
  firstName: Observable<string>;  
  lastName: Observable<string>;  
  favouriteFilms: ObservableArray<string>;  
  
  fullName: PureComputed<string> = ko.pureComputed(
    () => this.firstName() + ' ' + this.lastName());  
  
  constructor(firstName: string, lastName: string, favouriteFilms: string[] | null) {  
    this.firstName = ko.observable(firstName);  
    this.lastName = ko.observable(lastName);  
    this.favouriteFilms = ko.observableArray(favouriteFilms || []);  
  }  
}  
  
export default Person;
```

A component with a strongly typed view model that imports it's template.
```javascript
import Person from "../models/person";  
import template from './PersonReadOnly.html';  
  
class PersonReadOnly {  
  person: Person;  
  
  constructor(params: any) {  
    this.person = params.person;  
  }  
}  
  
// The default export returns the component details object to register with KO  
export default { viewModel: PersonReadOnly, template: template };
```

A custom binding that conforms to the Knockout interface `BindingHandler`.
```javascript
import * as ko from 'knockout';
import { BindingHandler } from 'knockout';  
  
const filmsBinding = {  
  init: (element: any, valueAccessor: () => any): void => {  
    const valueUnwrapped = ko.unwrap(valueAccessor());  
    const isPopulatedArray = Array.isArray(valueUnwrapped) && valueUnwrapped.length > 0;  
    const text = isPopulatedArray ? valueUnwrapped.join(', ') : 'Unknown';  
  
    element.textContent = text;  
  }  
} as BindingHandler;  
  
export default filmsBinding;
```