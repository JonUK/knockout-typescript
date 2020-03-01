import * as ko from 'knockout';
import { Observable, ObservableArray, PureComputed } from 'knockout';

class Person {
  firstName: Observable<string>;
  lastName: Observable<string>;
  favouriteFilms: ObservableArray<string>;

  fullName: PureComputed<string> = ko.pureComputed(() => this.firstName() + ' ' + this.lastName());

  constructor(firstName: string, lastName: string, favouriteFilms: string[] | null) {
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.favouriteFilms = ko.observableArray(favouriteFilms || []);
  }
}

export default Person;