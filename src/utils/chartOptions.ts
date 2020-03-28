const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        intersect: false,
        mode: 'index',
        bodyFontSize: 15,
        titleFontSize: 19,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFontColor: "#388E3C",
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

export { options };
