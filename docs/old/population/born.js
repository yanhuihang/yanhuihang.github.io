function born()
{
	birth_total = total_population() * birth
	boy_total = parseInt(boy_birth * birth_total)
	boy_total2 = boy_total
	girl_total = parseInt(birth_total - boy_total)
	girl_total2 = girl_total
	male_count_init = male_count()
	female_count_init = female_count()

	for (i = 0; i < male_count_init; ++i)
		if (male_has_boy[i] == 'next')
			if (Math.random() < boy_birth)
			{
				male_has_boy[i] = true
				++boy_total2
			}
			else
				++girl_total2
			
	for (j = 0; j < female_count_init; ++j)
		if (female_has_boy[j] == 'next')
			if (Math.random() < boy_birth)
			{
				female_has_boy[i] = true
				++boy_total2
			}
			else
				++girl_total2
	
	
	i = 0; j = 0;
	while (boy_total)
	{
		for (; i < male_count(); ++i)
			if (male_has_boy[i] != true)
				break;
		for (; j < female_count(); ++j)
			if (female_has_boy[j] != true)
				break;
		male_has_boy[i] = true
		female_has_boy[i] = true
		--boy_total; ++i; ++j;
	}
	
	i = 0; j = 0;
	while (girl_total)
	{
		for (; i < male_count(); ++i)
			if (male_has_boy[i] != true)
				break;
		for (; j < female_count(); ++j)
			if (female_has_boy[j] != true)
				break;
		male_has_boy[i] = 'next'
		female_has_boy[i] = 'next'
		
		--girl_total; ++i; ++j;
	}
	
	
	for (i = 0; i < boy_total2; ++i)
		male_has_boy.push(false)
	for (i = 0; i < girl_total2; ++i)
		female_has_boy.push(false)
}