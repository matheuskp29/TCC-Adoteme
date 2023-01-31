import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle} from "ng-apexcharts";

export default class ChartOptionsDonut {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  legend: ApexLegend;

  constructor() {
    this.series = [];
    this.chart = {
      type: 'donut',
      width: 400,
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: 'grafico-clientes'
          },
          svg: {
            filename: 'grafico-clientes'
          },
          png: {
            filename: 'grafico-clientes'
          }
        }
      }
    };
    this.labels = ['Clientes inativos', 'Clientes ativos'];
    this.title = {
      text: 'Gráfico de clientes em geral',
      align: 'center',
      margin: 5,
      style: {
        fontSize: '20px',
        fontFamily: 'Roboto'
      }
    };
    this.legend = {
      fontSize: '16px',
      fontFamily: 'Roboto'
    }
    this.responsive = [
      {
        breakpoint: 821,
        options: {
          chart: {
            width: 300
          },
          title: {
            style: {
              fontSize: '16px'
            }
          },
          legend: {
            fontSize: '14px',
            fontFamily: 'Roboto',
            position: 'bottom'
          }
        }
      }
    ];
  }
}
