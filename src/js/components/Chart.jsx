import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import Highcharts from 'highcharts';

require('highcharts/modules/exporting')(Highcharts);

class Chart extends Component {
  componentDidMount() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    this.chart = Highcharts.chart(this.refs.container, {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'History'
        },

        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'CPM'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [
          {
            type: 'area',
            name: 'Speed',
            data: this.props.data,
            showInLegend: false
          }
        ]
    });
  }

  render () {
    if (this.chart)
      this.chart.series[0].addPoint(this.props.data[this.props.data.length - 1]);

    return (
      <div ref="container" className="chart-container"></div>
    )
  }
}

function mapStateToProps(state) {
  return {
      data: state.history.data,
      update: state.history.update
  }
}

export default connect(mapStateToProps)(Chart)
