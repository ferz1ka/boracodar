var options = {
  series: [
    {
      name: 'cambio',
      data: [
        {
          x: new Date("2018-02-12").getTime(),
          y: 5.18
        },
        {
          x: new Date("2018-02-13").getTime(),
          y: 5.3
        },
        {
          x: new Date("2018-02-14").getTime(),
          y: 5.2
        },
        {
          x: new Date("2018-02-15").getTime(),
          y: 5.14
        },
        {
          x: new Date("2018-02-16").getTime(),
          y: 5.18
        },
      ]
    }
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  yaxis: {
    min: 5,
    tickAmount: 4,
    labels: {
      formatter: (val) => {
        return val.toFixed(1).replace('.', ',');
      }
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
  colors: ["#7C3AED"],
  tooltip: {
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      return `
      <div class="tooltip">
      <span>${String(series[seriesIndex][dataPointIndex]).replace('.', ',')}</span>
      <span>${new Date(w.globals.seriesX[seriesIndex][dataPointIndex]).toLocaleDateString("pt-br", { weekday: "short", month: "short", day: "2-digit" })}</span>
      </div>
      `
    }
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();