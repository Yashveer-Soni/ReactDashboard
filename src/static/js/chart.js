document.addEventListener('DOMContentLoaded', function () {
var options = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }],
    colors: ['#817AF3', '#57DA65'],
    chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      borderRadius:5,
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
    curve:'smooth',
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
//   fill: {
//     opacity: 1,
//     type: 'gradient',
//     gradient: {
//       shade: 'light',
//       type: 'vertical', // Assuming a vertical gradient is desired
//       shadeIntensity: 0.5,
//       gradientToColors: ['rgba(70, 164, 108, 1)'], // The end color of the gradient
//       opacityFrom: 0.85,
//       opacityTo: 0.85,
//       stops: [0, 100],
//       colorStops: [
//         {
//           offset: 0,
//           color: "#79D0F1",
//           opacity: 1
//         },
//         {
//           offset: 100,
//           color: "#817AF3",
//           opacity: 1
//         }
//       ]
//     }
//   },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chartone"), options);
  chart.render();
// chartone end

  
  var options = {
    series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
});