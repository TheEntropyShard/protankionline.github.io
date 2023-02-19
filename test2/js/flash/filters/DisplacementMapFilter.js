/*class flash.filters.DisplacementMapFilter*/
/*
import flash.display.*;
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_alpha = function ()/*Number*/
	{
		
	};
	
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_color = function ()/*uint*/
	{
		
	};
	
	d.set_color = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_componentX = function ()/*uint*/
	{
		
	};
	
	d.set_componentX = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_componentY = function ()/*uint*/
	{
		
	};
	
	d.set_componentY = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_mapBitmap = function ()/*BitmapData*/
	{
		
	};
	
	d.set_mapBitmap = function (value/*BitmapData*/)/*void*/
	{
		
	};
	
	d.get_mapPoint = function ()/*Point*/
	{
		
	};
	
	d.set_mapPoint = function (value/*Point*/)/*void*/
	{
		
	};
	
	d.get_mode = function ()/*String*/
	{
		
	};
	
	d.set_mode = function (value/*String*/)/*void*/
	{
		
	};
	
	d.get_scaleX = function ()/*Number*/
	{
		
	};
	
	d.set_scaleX = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_scaleY = function ()/*Number*/
	{
		
	};
	
	d.set_scaleY = function (value/*Number*/)/*void*/
	{
		
	};
	
	
	d.DisplacementMapFilter = function (mapBitmap/*BitmapData*/, mapPoint/*Point*/, componentX/*uint*/, componentY/*uint*/, scaleX/*Number*/, scaleY/*Number*/, mode/*String*/, color/*uint*/, alpha/*Number*/)
	{
		this.BitmapFilter_constructor();
		if (mapBitmap == undefined) mapBitmap = null;
		if (mapPoint == undefined) mapPoint = null;
		if (componentX == undefined) componentX = 0;
		componentX = /*uint*/Math.floor(componentX);
		if (componentY == undefined) componentY = 0;
		componentY = /*uint*/Math.floor(componentY);
		if (scaleX == undefined) scaleX = 0;
		if (scaleY == undefined) scaleY = 0;
		if (mode == undefined) mode = "wrap";
		if (color == undefined) color = 0;
		color = /*uint*/Math.floor(color);
		if (alpha == undefined) alpha = 0;
		
		
		if (mapBitmap != null)
		{
			this.set_mapBitmap(mapBitmap);
			
		}
		
		if (mapPoint != null)
		{
			this.set_mapPoint(mapPoint);
			
		}
		this.set_componentX(componentX);
		this.set_componentY(componentY);
		this.set_scaleX(scaleX);
		this.set_scaleY(scaleY);
		this.set_mode(mode);
		this.set_color(color);
		this.set_alpha(alpha);
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.DisplacementMapFilter(this.get_mapBitmap(), this.get_mapPoint(), this.get_componentX(), this.get_componentY(), this.get_scaleX(), this.get_scaleY(), this.get_mode(), this.get_color(), this.get_alpha());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.DisplacementMapFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
