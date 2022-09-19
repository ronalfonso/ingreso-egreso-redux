import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {IngressEgress} from "../../api/models/ingress-egress.model";
import {ChartData} from "chart.js";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingress: number = 0;
  egress: number = 0;

  totalIngress: number = 0;
  totalEgress: number = 0;

  statisticsSubs: Subscription;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: []}
    ]
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.statisticsSubs = this.store.select('ingressEgress').subscribe(({items}) => {
      this.generateStatistics(items);
    })
  }

  ngOnDestroy() {
    this.statisticsSubs.unsubscribe();
  }

  generateStatistics(items: IngressEgress[]) {
    this.ingress = 0;
    this.egress = 0;
    this.totalIngress = 0;
    this.totalEgress = 0;
    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIngress += item.amount;
        this.ingress ++;
      } else {
        this.totalEgress += item.amount;
        this.egress ++;
      }
    }

    this.doughnutChartData.datasets[0].data = [this.totalIngress, this.totalEgress]
  }

}
