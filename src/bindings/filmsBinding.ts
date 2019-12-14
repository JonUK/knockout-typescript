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