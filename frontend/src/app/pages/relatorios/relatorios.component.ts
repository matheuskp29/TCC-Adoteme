import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClienteStoreService} from 'src/app/shared/core/stores/cliente-store/cliente-store.service';
import RelatorioResponse from 'src/app/shared/core/stores/relatorios-store/relatorio-response';
import {RelatoriosStoreService} from 'src/app/shared/core/stores/relatorios-store/relatorios-store.service';
import ChartOptionsPie from "../../shared/charts/chart-options-pie";
import ChartOptionsBar from "../../shared/charts/chart-options-bar";
import ChartOptionsDonut from "../../shared/charts/chart-options-donut";

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public relatorio: RelatorioResponse = new RelatorioResponse();
  public chartPieAnuncios: ChartOptionsPie = new ChartOptionsPie();
  public chartDonutClientes: ChartOptionsDonut = new ChartOptionsDonut();
  public chartBarAnuncios: ChartOptionsBar = new ChartOptionsBar();

  constructor(
    private clienteStore: ClienteStoreService,
    private relatorioStore: RelatoriosStoreService
  ) {
  }

  ngOnInit(): void {
    this.clienteStore.verificarAdmin();
    this.initRelatorioSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initRelatorioSubscription() {
    this.subscriptions.push(
      this.relatorioStore.relatorio$.subscribe((relatorio) => {
        this.relatorio = relatorio;
        this.inicializaGraficos(relatorio);
      })
    );
  }

  inicializaGraficos(relatorio: RelatorioResponse) {
    this.chartDonutClientes.series = [
      relatorio.quantidadeUsuarios - relatorio.quantidadeUsuariosAtivos,
      relatorio.quantidadeUsuariosAtivos,
    ];

    this.chartPieAnuncios.series = [
      relatorio.quantidadeAnuncios - relatorio.quantidadeAnunciosAtivos,
      relatorio.quantidadeAnunciosAtivos,
    ];
    this.chartBarAnuncios.series = [
      {
        name: 'Total',
        data: [
          relatorio.quantidadeAnunciosPassaro,
          relatorio.quantidadeAnunciosTartaruga,
          relatorio.quantidadeAnunciosCachorro,
          relatorio.quantidadeAnunciosGato
        ]
      }
    ];
  }
}
