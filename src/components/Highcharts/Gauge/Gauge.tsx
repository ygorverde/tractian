import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
highchartsMore(Highcharts);
solidGauge(Highcharts);

type Props = {
    rotacao: Number
}

function Gauge({ rotacao }: Props) {
    let options = {
        chart: {
            type: "solidgauge"
        },
        title: undefined,
        credits: {
            enabled: false
        },
        pane: {
            center: ['50%', '80%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                // Highcharts.defaultOptions.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        yAxis: {
            min: 0,
            max: 2000,
            title: {
                Text: 'RPM',
                y: -70
            },
            labels: {
                y: 16
            },
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 5
        },
        series: [{
            name: 'RPM',
            data: [rotacao || 0],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:20px">{y}</span><br/>' +
                    '<span style="font-size:10px;opacity:0.4">RPM</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' Rotações/MIN'
            }
        }],
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };    

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'chart-container' }}
        />
    )
}

export default Gauge;