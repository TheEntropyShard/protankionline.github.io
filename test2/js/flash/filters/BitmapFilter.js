/*class flash.filters.BitmapFilter*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.BitmapFilter = function ()
	{
		
	};
	
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.BitmapFilter();
	};
	
	d._toValue = function ()/*String*/
	{
		return "";
	};
	
	d._apply = function (d/*Array*/, w/*Number*/, h/*Number*/)/*void*/
	{
		
	};
	
	d._convolute = function (s, t, w, h, sw, sh, weights, useColor)
	{
		var hsw = Math.floor(sw / 2);
		var hsh = Math.floor(sh / 2);
		
		var i = 0;
		var j = 0;
		
		var r = 0;
		var g = 0;
		var b = 0;
		var a = 0;
		
		var scx = 0;
		var scy = 0;
		
		var x = 0;
		var y = 0;
		
		var cx = 0;
		var cy = 0;
		
		var scx = 0;
		var scy = 0;
		
		var wt = 0;
		
		if (useColor)
		{
			for (y = 0; y < h; y++)
			{
				for (x = 0; x < w; x++)
				{
					i = (y * w + x) * 4;
					
					r = g = b = a = 0;
					
					for (cy = 0; cy < sh; cy++)
					{
						for (cx = 0; cx < sw; cx++)
						{
							scx = x + cx - hsw;
							scy = y + cy - hsh;
							
							if (scy >= 0 && scy < h && scx >= 0 && scx < w)
							{
								j = (scy * w + scx) * 4;
								wt = weights[ cy * sw + cx ];
								
								r += s[ j ] * wt;
								g += s[ j + 1 ] * wt;
								b += s[ j + 2 ] * wt;
								a += s[ j + 3 ] * wt;
							}
						}
					}
					
					t[ i ] = r;
					t[ i + 1 ] = g;
					t[ i + 2 ] = b;
					t[ i + 3 ] = a;
				}
			}
		}
		else
		{
			for (y = 0; y < h; y++)
			{
				for (x = 0; x < w; x++)
				{
					i = (y * w + x) * 4;
					
					r = g = b = a = 0;
					
					for (cy = 0; cy < sh; cy++)
					{
						for (cx = 0; cx < sw; cx++)
						{
							scx = x + cx - hsw;
							scy = y + cy - hsh;
							
							if (scy >= 0 && scy < h && scx >= 0 && scx < w)
							{
								j = (scy * w + scx) * 4;
								wt = weights[ cy * sw + cx ];
								
								a += s[ j + 3 ] * wt;
							}
						}
					}
					
					t[ i + 3 ] = a;
				}
			}
		}
	};
	
	d._fastShadow = function (s, width, height, radius, iterations, cr, cg, cb, strength)
	{
		var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw, idx, pa;
		var wm = width - 1;
		var hm = height - 1;
		var wh = width * height;
		var rad1 = radius + 1;
		
		var mul_sum = flash.filters.BitmapFilter._mul_table[ radius ];
		var shg_sum = flash.filters.BitmapFilter._shg_table[ radius ];
		
		var r = [];
		var g = [];
		var b = [];
		var a = [];
		
		var vmin = [];
		var vmax = [];
		
		var tr = 0;
		var tg = 0;
		var tb = 0;
		var ta = 0;
		var tm = 0;
		
		yw = yi = 0;
		
		for (y = 0; y < height; y++)
		{
			asum = s[ yw + 3 ] * rad1;
			
			for (i = 1; i <= radius; i++)
			{
				p = yw + (((i > wm ? wm : i)) << 2) + 3;//add 3
				
				asum += s[ p ];
			}
			
			for (x = 0; x < width; x++)
			{
				a[ yi ] = asum;
				
				if (y == 0)
				{
					vmin[ x ] = ((p = x + rad1) < wm ? p : wm) << 2;
					vmax[ x ] = ((p = x - radius) > 0 ? p << 2 : 0);
				}
				
				p1 = yw + vmin[ x ] + 3;//add 3
				p2 = yw + vmax[ x ] + 3;//add 3
				
				asum += s[ p1 ] - s[ p2 ];
				
				yi++;
			}
			
			yw += (width << 2);
		}
		
		for (x = 0; x < width; x++)
		{
			yp = x;
			
			asum = a[ yp ] * rad1;
			
			for (i = 1; i <= radius; i++)
			{
				yp += (i > hm ? 0 : width);
				
				asum += a[ yp ];
			}
			
			yi = x << 2;
			
			for (y = 0; y < height; y++)
			{
				
				pa = (asum * mul_sum) >>> shg_sum;
				
				if (pa > 0)
				{
					tr = s[ yi ];
					tg = s[ yi + 1 ];
					tb = s[ yi + 2 ];
					ta = s[ yi + 3 ];
					
					tm = ta / 255;
					
					pa = pa * strength;
					
					s[ yi ] = (tr - cr) * tm + cr;
					s[ yi + 1 ] = (tg - cg) * tm + cg;
					s[ yi + 2 ] = (tb - cb) * tm + cb;
					s[ yi + 3 ] = (ta - pa) * tm + pa;
				}
				else
				{
					s[ yi ] = s[ yi + 1 ] = s[ yi + 2 ] = s[ yi + 3 ] = 0;
				}
				
				if (x == 0)
				{
					vmin[ y ] = ((p = y + rad1) < hm ? p : hm) * width;
					vmax[ y ] = ((p = y - radius) > 0 ? p * width : 0);
				}
				
				p1 = x + vmin[ y ];
				p2 = x + vmax[ y ];
				
				asum += a[ p1 ] - a[ p2 ];
				
				yi += width << 2;
			}
		}
		
	}
	
	d._fastBlur = function (s, width, height, radius, iterations)
	{
		var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw, idx, pa;
		var wm = width - 1;
		var hm = height - 1;
		var wh = width * height;
		var rad1 = radius + 1;
		
		var mul_sum = flash.filters.BitmapFilter._mul_table[ radius ];
		var shg_sum = flash.filters.BitmapFilter._shg_table[ radius ];
		
		var r = [];
		var g = [];
		var b = [];
		var a = [];
		
		var vmin = [];
		var vmax = [];
		
		yw = yi = 0;
		
		for (y = 0; y < height; y++)
		{
			rsum = s[ yw ] * rad1;
			gsum = s[ yw + 1 ] * rad1;
			bsum = s[ yw + 2 ] * rad1;
			asum = s[ yw + 3 ] * rad1;
			
			for (i = 1; i <= radius; i++)
			{
				p = yw + (((i > wm ? wm : i)) << 2);
				rsum += s[ p++ ];
				gsum += s[ p++ ];
				bsum += s[ p++ ];
				asum += s[ p ]
			}
			
			for (x = 0; x < width; x++)
			{
				r[ yi ] = rsum;
				g[ yi ] = gsum;
				b[ yi ] = bsum;
				a[ yi ] = asum;
				
				if (y == 0)
				{
					vmin[ x ] = ((p = x + rad1) < wm ? p : wm) << 2;
					vmax[ x ] = ((p = x - radius) > 0 ? p << 2 : 0);
				}
				
				p1 = yw + vmin[ x ];
				p2 = yw + vmax[ x ];
				
				rsum += s[ p1++ ] - s[ p2++ ];
				gsum += s[ p1++ ] - s[ p2++ ];
				bsum += s[ p1++ ] - s[ p2++ ];
				asum += s[ p1 ] - s[ p2 ];
				
				yi++;
			}
			yw += (width << 2);
		}
		
		for (x = 0; x < width; x++)
		{
			yp = x;
			rsum = r[ yp ] * rad1;
			gsum = g[ yp ] * rad1;
			bsum = b[ yp ] * rad1;
			asum = a[ yp ] * rad1;
			
			for (i = 1; i <= radius; i++)
			{
				yp += (i > hm ? 0 : width);
				rsum += r[ yp ];
				gsum += g[ yp ];
				bsum += b[ yp ];
				asum += a[ yp ];
			}
			
			yi = x << 2;
			
			for (y = 0; y < height; y++)
			{
				
				s[ yi + 3 ] = pa = (asum * mul_sum) >>> shg_sum;
				
				if (pa > 0)
				{
					pa = 255 / pa;
					s[ yi ] = ((rsum * mul_sum) >>> shg_sum) * pa;
					s[ yi + 1 ] = ((gsum * mul_sum) >>> shg_sum) * pa;
					s[ yi + 2 ] = ((bsum * mul_sum) >>> shg_sum) * pa;
				}
				else
				{
					s[ yi ] = s[ yi + 1 ] = s[ yi + 2 ] = 0;
				}
				
				if (x == 0)
				{
					vmin[ y ] = ((p = y + rad1) < hm ? p : hm) * width;
					vmax[ y ] = ((p = y - radius) > 0 ? p * width : 0);
				}
				
				p1 = x + vmin[ y ];
				p2 = x + vmax[ y ];
				
				rsum += r[ p1 ] - r[ p2 ];
				gsum += g[ p1 ] - g[ p2 ];
				bsum += b[ p1 ] - b[ p2 ];
				asum += a[ p1 ] - a[ p2 ];
				
				yi += width << 2;
			}
		}
	};
	
	d.__getHTMLColor = function ()
	{
		var r = (this._color >> 16) & 0xff;
		var g = (this._color >> 8) & 0xff;
		var b = this._color & 0xff;
		var a = this._alpha * this._strength;
		
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this._mul_table = [ 1, 57, 41, 21, 203, 34, 97, 73, 227, 91, 149, 62, 105, 45, 39, 137, 241, 107, 3, 173, 39, 71, 65, 238, 219, 101, 187, 87, 81, 151, 141, 133, 249, 117, 221, 209, 197, 187, 177, 169, 5, 153, 73, 139, 133, 127, 243, 233, 223, 107, 103, 99, 191, 23, 177, 171, 165, 159, 77, 149, 9, 139, 135, 131, 253, 245, 119, 231, 224, 109, 211, 103, 25, 195, 189, 23, 45, 175, 171, 83, 81, 79, 155, 151, 147, 9, 141, 137, 67, 131, 129, 251, 123, 30, 235, 115, 113, 221, 217, 53, 13, 51, 50, 49, 193, 189, 185, 91, 179, 175, 43, 169, 83, 163, 5, 79, 155, 19, 75, 147, 145, 143, 35, 69, 17, 67, 33, 65, 255, 251, 247, 243, 239, 59, 29, 229, 113, 111, 219, 27, 213, 105, 207, 51, 201, 199, 49, 193, 191, 47, 93, 183, 181, 179, 11, 87, 43, 85, 167, 165, 163, 161, 159, 157, 155, 77, 19, 75, 37, 73, 145, 143, 141, 35, 138, 137, 135, 67, 33, 131, 129, 255, 63, 250, 247, 61, 121, 239, 237, 117, 29, 229, 227, 225, 111, 55, 109, 216, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 48, 190, 47, 93, 185, 183, 181, 179, 178, 176, 175, 173, 171, 85, 21, 167, 165, 41, 163, 161, 5, 79, 157, 78, 154, 153, 19, 75, 149, 74, 147, 73, 144, 143, 71, 141, 140, 139, 137, 17, 135, 134, 133, 66, 131, 65, 129, 1 ];
		
		this._shg_table = [ 0, 9, 10, 10, 14, 12, 14, 14, 16, 15, 16, 15, 16, 15, 15, 17, 18, 17, 12, 18, 16, 17, 17, 19, 19, 18, 19, 18, 18, 19, 19, 19, 20, 19, 20, 20, 20, 20, 20, 20, 15, 20, 19, 20, 20, 20, 21, 21, 21, 20, 20, 20, 21, 18, 21, 21, 21, 21, 20, 21, 17, 21, 21, 21, 22, 22, 21, 22, 22, 21, 22, 21, 19, 22, 22, 19, 20, 22, 22, 21, 21, 21, 22, 22, 22, 18, 22, 22, 21, 22, 22, 23, 22, 20, 23, 22, 22, 23, 23, 21, 19, 21, 21, 21, 23, 23, 23, 22, 23, 23, 21, 23, 22, 23, 18, 22, 23, 20, 22, 23, 23, 23, 21, 22, 20, 22, 21, 22, 24, 24, 24, 24, 24, 22, 21, 24, 23, 23, 24, 21, 24, 23, 24, 22, 24, 24, 22, 24, 24, 22, 23, 24, 24, 24, 20, 23, 22, 23, 24, 24, 24, 24, 24, 24, 24, 23, 21, 23, 22, 23, 24, 24, 24, 22, 24, 24, 24, 23, 22, 24, 24, 25, 23, 25, 25, 23, 24, 25, 25, 24, 22, 25, 25, 25, 24, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 23, 25, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 22, 25, 25, 23, 25, 25, 20, 24, 25, 24, 25, 25, 22, 24, 25, 24, 25, 24, 25, 25, 24, 25, 25, 25, 25, 22, 25, 25, 25, 24, 25, 24, 25, 18 ];
		
	};
	
	flash.addDescription("flash.filters.BitmapFilter", d, null, s, null);
	
}
());
