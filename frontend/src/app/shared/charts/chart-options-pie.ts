import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle} from "ng-apexcharts";

export default class ChartOptionsPie {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  legend: ApexLegend;

  constructor() {
    this.series = [];
    this.chart = {
      type: 'pie',
      width: 400,
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: 'grafico-anuncios'
          },
          svg: {
            filename: 'grafico-anuncios'
          },
          png: {
            filename: 'grafico-anuncios'
          }
        }
      }
    };
    this.labels = ["Anúncios inativos", "Anúncios ativos"];
    this.title = {
      text: 'Gráfico de anúncios em geral',
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
