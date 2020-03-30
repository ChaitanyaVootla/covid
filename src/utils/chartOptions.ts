const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        intersect: false,
        mode: 'index',
        bodyFontSize: 12,
        titleFontSize: 15,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        titleFontColor: "#ffa500",
        xPadding: 30,
        position: 'nearest',
        bodyFontFamily: "sans-serif",
        bodyFontStyle: 'bold',
        titleFontStyle: 'bold',
        displayColors: false,
        bodySpacing: 10,
        titleSpacing: 20,
    },
    legend: {
        display: false,
        position: 'bottom',
        labels: {
            fontStyle: 'bold',
            fontSize: 15,
            fontColor: '#444'
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
                maxTicksLimit: 3
            }
        }],
        xAxes: [{
            gridLines: {
                color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
                fontSize: 0
            }
        }],
    },
    elements: {
        point:{
            radius: 0
        }
    },
};

const graphTypes = [
  {
    name: 'confirmed',
    title: 'CONFIRMED',
    color: '#F57C00'
  },
  {
    name: 'recovered',
    title: 'RECOVERED',
    color: '#388E3C'
  },
  {
    name: 'deceased',
    title: 'DECEASED',
    color: '#909399'
  },
]
export { options, graphTypes };
