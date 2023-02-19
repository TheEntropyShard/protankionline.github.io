/*class flash.filters.BlurFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._blurX = 0;
	d._blurY = 0;
	d._quality = 1;
	
	
	d.get_blurX = function ()/*Number*/
	{
		return this._blurX;
	};
	
	d.set_blurX = function (value/*Number*/)/*void*/
	{
		this._blurX = value;
	};
	
	d.get_blurY = function ()/*Number*/
	{
		return this._blurY;
	};
	
	d.set_blurY = function (value/*Number*/)/*void*/
	{
		this._blurY = value;
	};
	
	d.get_quality = function ()/*int*/
	{
		return this._quality;
	};
	
	d.set_quality = function (value/*int*/)/*void*/
	{
		this._quality = value;
	};
	
	
	d.BlurFilter = function (blurX/*Number*/, blurY/*Number*/, quality/*int*/)
	{
		this.BitmapFilter_constructor();
		
		if (blurX == undefined) blurX = 4;
		if (blurY == undefined) blurY = 4;
		if (quality == undefined) quality = 1;
		
		quality = /*int*/Math.floor(quality);
		
		this._blurX = blurX;
		this._blurY = blurY;
		this._quality = quality;
		
	};
	
	/*override*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.BlurFilter(this._blurX, this._blurY, this._quality);
	};
	
	d._toValue = function ()/*String*/
	{
		return this._blurX + "_" + this._blurY + "_" + this._quality;
	};
	
	/*override*/
	d._apply = function (d/*Array*/, w/*Number*/, h/*Number*/)/*void*/
	{
		if (this._blurX < 2 || this._blurY < 2) return;
		
		this._fastBlur(d, w, h, this._blurX / 2, this._quality);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	flash.addDescription("flash.filters.BlurFilter", d, "flash.filters.BitmapFilter", s, null);
}
());
