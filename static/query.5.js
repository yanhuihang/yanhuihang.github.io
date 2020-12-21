const default_text = '参加过面试的同学，可以在此查看自己的结果';

function set_text(s)
{
	$('#result').text(s);
}

var result_code;

function query()
{
	var name = $('#name').val(),
		num = $('#student-id').val();
	
	var result = default_text;
	
	if (name != '' && num.length == 11)
	{
		set_text('正在加载数据库……');
		result = '找不到数据';
	
		for (var i = 0; i < data.length; ++i)
		{
			if (hash(name, num) == data[i][0])
			{
				result_code = data[i][1];
				
				if (result_code != 1)
				{
					result = '恭喜你通过了第一轮面试；开学后我们将会通知关于第二轮面试或具体录取部门的信息。';
					$('#continue').removeClass('hidden');
				} else
					result = '很遗憾，你没有通过我们的面试。感谢你的参与。';
				
				$('#name').attr('disabled', true);
				$('#student-id').attr('disabled', true);
				
				break;
			}
		}
	}
	
	set_text(result);
}

function continue_()
{
	$('#form1').addClass('hidden');
	$(result_code == 0 ? '#qrcode' : '#qrcode-c').removeClass('hidden');
	set_text('请扫描下方二维码，进入预二面通知群');
}

$(document).ready(function ()
{
	set_text(default_text);
})