/*class flash.display.GraphicsBitmapFill*/
/*
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.bitmapData/*BitmapData*/ = null;
	d.matrix/*Matrix*/ = null;
	d.repeat/*Boolean*/ = false;
	d.smooth/*Boolean*/ = false;
	
	
	d.GraphicsBitmapFill = function (param1/*BitmapData*/, param2/*Matrix*/, param3/*Boolean*/, param4/*Boolean*/)
	{
		if (param1 == undefined) param1 = null;
		if (param2 == undefined) param2 = null;
		if (param3 == undefined) param3 = true;
		if (param4 == undefined) param4 = false;
		
		this.bitmapData = param1;
		this.matrix = param2;
		this.repeat = param3;
		this.smooth = param4;
		
	};
	
	flash.addDescription("flash.display.GraphicsBitmapFill", d, null, null, [ "flash.display.IGraphicsFill", "flash.display.IGraphicsData" ]);
	
}
());
