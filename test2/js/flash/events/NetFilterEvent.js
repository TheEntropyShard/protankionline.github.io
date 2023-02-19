/*class flash.events.NetFilterEvent*/
/*
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.data/*ByteArray*/ = null;
	d.header/*ByteArray*/ = null;
	
	
	d.NetFilterEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, header/*ByteArray*/, data/*ByteArray*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (header == undefined) header = null;
		if (data == undefined) data = null;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.data = data;
		this.header = header;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.NetFilterEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.header, this.data);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("NetTransformEvent", "type", "bubbles", "cancelable", "eventPhase", "header", "data");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.events.NetFilterEvent", d, "flash.events.Event", s, null);
	
}
());
