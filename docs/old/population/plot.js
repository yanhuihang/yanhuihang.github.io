function make_chart(id, label, series)
{
	return Highcharts.chart(id, {
			title: {
					text: label
			},
			subtitle: {
					text: ''
			},
			yAxis: {
					title: {
							text: ''
					}
			},
			legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
			},
			plotOptions: {
					series: {
							label: {
									connectorAllowed: false
							},
							pointStart: year
					}
			},
			series: series,
			responsive: {
					rules: [{
							condition: {
									maxWidth: 500
							},
							chartOptions: {
									legend: {
											layout: 'horizontal',
											align: 'center',
											verticalAlign: 'bottom'
									}
							}
					}]
			}
	});
}

function init_charts()
{
	sum_chart = make_chart('sum-container', '人口', sum_series)
	birth_chart = make_chart('birth-container', '出生', birth_series)
}