import * as ko from "knockout";
import { Observable } from "knockout";
import template from './ProductDetails.html';

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

// The default export returns the component details object to register with KO
export default { viewModel: ProductDetails, template: template };
