const MD5 = new Hashes.MD5;
const SHA512 = new Hashes.SHA512;

function hash(a, b)
{
	var n = 100;
	var r = a + b;
	
	while (n--)
	{
		if (n % 2)
			r = MD5.hex(r);
		else
			r = SHA512.hex(r);
		
		if (n % 3 || n == 0)
			r = r.slice(0, 10);
	}
	
	return r;
}