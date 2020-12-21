function question_details(options, what)
{
	res = '';

	for (let option of options)
	{
		res +=
				'<label class="' + what + '-inline">' +
					'<input type="' +
						what +
						'" value="' +
						option + '">' +
					'</input>' +
					option +
				'</label>';
	}
	
	return res;
}

function init()
{
	for (let x of questions)
	{
		$("#panel").append(
			'<div class="form-group">' +
				'<label>' + x.title + '</label>' +
				'<div>' +
					question_details(x.options, x.type) +
				'</div>' +
			'</div>');
	}
	
	$("#panel").append(
		'<button type="button" id="submit" class="btn btn-default">' +
			'Submit' +
		'</button>');
}