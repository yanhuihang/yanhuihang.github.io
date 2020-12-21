function register_check_func()
{
	$('#submit').click(function () {
		$('input:checked').each(function (i, a)
		{
			v = a.value; console.log(v);
			p = $(a).parent();
			$(a).attr('disabled', true);
			
			for (let x of questions)
				if ($.isArray(x.key) ? v in x.key : v == x.key)
				{
					p.addClass('ca'); return;
				}
			
			p.addClass('wa');
		});
	});
}