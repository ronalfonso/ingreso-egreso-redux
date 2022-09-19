import { Pipe, PipeTransform } from '@angular/core';
import {IngressEgress} from "../models/ingress-egress.model";

@Pipe({
  name: 'orderIngressEgress'
})
export class OrderIngressPipe implements PipeTransform {

  transform(items: IngressEgress[]): IngressEgress[] {
    return items.slice().sort((a,b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
