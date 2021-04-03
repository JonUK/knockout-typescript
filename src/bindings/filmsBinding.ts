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