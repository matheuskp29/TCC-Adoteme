import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill, ApexLegend,
  ApexPlotOptions, ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

export default class ChartOptionsBar {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  labels: any;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  legend: ApexLegend;

  constructor() {
    this.series = [
      {
        data: []
      }
    ];
    this.chart = {
      type: "bar",
      width: 750,
      fontFamily: 'Roboto',
      toolbar: {
        export: {
          csv: {
            filename: 'grafico-animais'
          },
          svg: {
            filename: 'grafico-animais'
          },
          png: {
            filename: 'grafico-animais'
          }
        }
      }
    };
    this.plotOptions = {
      bar: {
        borderRadius: 5,
        horizontal: true
      }
    };
    this.dataLabels = {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Roboto'
      }
    };
    this.xaxis = {
      categories: ['Pássaro', 'Tartaruga', 'Cachorro', 'Gato'],
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto'
        }
      }
    };
    this.labels = ['Pássaro', 'Tartaruga', 'Cachorro', 'Gato'];
    this.title = {
      text: 'Anúncios por tipo de animal',
      align: 'center',
      style: {
        fontSize: '20px',
        fontFamily: 'Roboto'
      }
    };
    this.legend = {
      position: "right",
      containerMargin: {
        left: 35
      }
    };
    this.responsive = [
      {
        breakpoint: 820,
        options: {
          chart: {
            height: 350,
            width: '100%'
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          title: {
            style: {
              fontSize: '16px'
            }
          }
        }
      }
    ];
  }
}
