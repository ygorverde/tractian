import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';
// import SeriesLabel from 'highcharts/modules/series-label';
// SeriesLabel(Highcharts)

type Props = {
    healthscore: Number
    active: String
}

function Line({ healthscore, active}: Props) {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
            type: 'category',
            categories: ['']
        },
        yAxis: {
            title: {
                text: '%'
            }
        },
        series: [{
            name: "Saúde do equipamento",
            colorByPoint: true,
            data: [{
                name: active,
                y: healthscore
            }]
        }],
        plotOptions: {
            series: {
                pointWidth: 50,
                borderWidth: 1,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        }
      }

    return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ className: 'chartline' }}
            />
    )
}

export default Line;