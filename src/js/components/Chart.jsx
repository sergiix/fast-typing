import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import Highcharts from 'highcharts';

require('highcharts/modules/exporting')(Highcharts);

class Chart extends Component {
  componentDidMount() {
    this.chart = Highcharts.chart(this.refs.container, {
        chart: {
            zoomType: 'x',
            events: {
              load: function () {
                // set up the updating of the chart each second
                var series = this.series[0];
                // setInterval(function () {
                //     var x = (new Date()).getTime(), // current time
                //         y = Math.round(Math.random() * 100);
                //     series.addPoint([x, y], true, true);
                // }, 1000);
              }
            }
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
            enabled: false
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

        series: [{
            type: 'area',
            name: 'Speed',
            data: this.props.data
        }]
    });
  }

  render () {
    if (this.chart)
      this.chart.series[0].addPoint(this.props.lastHistoryValue, true, true);

    return (
      <div ref="container" className="chart-container"></div>
    )
  }
}

function mapStateToProps(state) {
  return {
      data: state.history.data,
      lastHistoryValue: state.history.lastHistoryValue
  }
}

export default connect(mapStateToProps)(Chart)
