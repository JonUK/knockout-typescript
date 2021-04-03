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
  
  constructor(params: { person: Person }) {  
    this.person = params.person;  
  }  
}  
  
// The default export returns the component details object to register with KO  
export default { viewModel: PersonReadOnly, template: template };
```

A custom binding that conforms to the Knockout interface `BindingHandler`.
```javascript
import * as ko from 'knockout';
import { BindingHandler, ObservableArray } from 'knockout';

const filmsBinding = {
  init: (element: HTMLElement, valueAccessor: () => ObservableArray): void => {
    const valueUnwrapped = ko.unwrap(valueAccessor());
    const isPopulatedArray = Array.isArray(valueUnwrapped) && valueUnwrapped.length > 0;
    const text = isPopulatedArray ? valueUnwrapped.join(', ') : 'Unknown';

    element.textContent = text;
  }
} as BindingHandler;

export default filmsBinding;
```

A view model that uses the Knockout Validation library.
```javascript
class ProductDetails {
  name: Observable<string> = ko.observable('Bananas')
    .extend({ required: true });

  productCode: Observable<string> = ko.observable()
    .extend({
      required: true,
      minLength: 5,
      pattern: {
        message: 'Please enter letters and digits only',
        params: /^[A-Za-z0-9]*$/
      }
    })

  stockCount: Observable<number> = ko.observable()
    .extend({
      min: 1,
      max: 100
    })
}
```