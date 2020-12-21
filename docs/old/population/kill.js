function kill()
{
	total_dead = death * total_population()
	male_dead = parseInt(total_dead / 2)
	female_dead = male_dead
	
	while (male_dead)
	{
		dead = random(male_has_boy.length - 1)
		male_has_boy.splice(dead, 1)
		--male_dead
	}

	while (female_dead)
	{
		dead = random(female_has_boy.length - 1)
		female_has_boy.splice(dead, 1)
		--female_dead
	}
}
