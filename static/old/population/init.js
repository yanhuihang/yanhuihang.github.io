boy_birth = 0
birth = 0
death = 0
male_has_boy = []
female_has_boy = []
year = 2000
sum_chart = null
birth_chart = null

function random(max)
	// [min, max]
{
	min = 0
	return parseInt(Math.random() * (max - min + 1) + min, 10)
}

function male_count()
{
	return male_has_boy.length;
}

function female_count()
{
	return female_has_boy.length;
}

function total_population()
{
	return male_has_boy.length + female_has_boy.length;
}

$(function ()
{
	$('#btn').click(function ()
	{
		[ $('#boy-birth'), $('#birth'), $('#death') ].forEach(
		function (i)
		{
			i.attr("disabled", "disabled")
		})
		
		$('#btn').before('<h1 id="year"></h3>')
		$('#btn').text('下一年')
		
		boy_birth = eval($('#boy-birth').val()) / 1000
		birth = eval($('#birth').val()) / 100
		death = eval($('#death').val()) / 100
		
		male_has_boy = new Array(200).fill(false)
		female_has_boy = new Array(200).fill(false)
		
		$('#btn').after('<div id="sum-container" style="max-width:800px;height:400px"></div>')
		$('#btn').after('<div id="birth-container" hidden style="max-width:800px;height:400px"></div>')
		
		
		init_charts();
		
		console.log('init OK')
		
		$('#btn').unbind('click').click(function ()
		{
			console.log('callback called')
			year += 1
			
			console.log('borning')
			born()
			console.log('killing')
			kill()
			
			console.log('ok')
			sum_chart.series[0].addPoint(male_count())
			sum_chart.series[1].addPoint(female_count())
			birth_chart.series[0].addPoint(boy_total2)
			birth_chart.series[1].addPoint(girl_total2)
			
			console.log('ok')
			$('#year').text(year + '年')
		})
		
		// $('#btn').click()
	})
})