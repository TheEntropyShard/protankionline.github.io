/*class  XorProtectionContext*/
/*
import flash.utils.ByteArray;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/d/*var*/.serverSequence/*Vector.<int>*/ = null;
	/*private*/d/*var*/.clientSequence/*Vector.<int>*/ = null;
	/*private*/d/*var*/.serverSelector/*int*/ = 0;
	/*private*/d/*var*/.clientSelector/*int*/ = 0;
	/*private*/d/*var*/.initialSeed/*int*/ = 0;
	
	
	/*public*/d.XorProtectionContext = function (data/*Vector.<int>*/)
	{
		
		var i/*int*/ = 0;
		var j/*int*/ = 0;
		
		console.log(data);
		this.serverSequence = new Array(XorProtectionContext.SEQUENCE_LENGTH, true);
		this.clientSequence = new Array(XorProtectionContext.SEQUENCE_LENGTH, true);
		/*this.Object_constructor(*/;
		for (i = 0; i < data.length; i ++ )
		{
			this.initialSeed ^  = data[i]
		}
		
		console.log(this.initialSeed);
		for (j = 0; j < XorProtectionContext.SEQUENCE_LENGTH; j ++ )
		{
			this.clientSequence[j] = this.initialSeed ^ j << 3;
			this.serverSequence[j] = this.initialSeed ^ j << 3 ^ 87
		}
		
		
	};
	
	/*public*/d.encrypt = function (data/*flash.utils.ByteArray*/)/*void*/
	{
		var value/*int*/ = 0;
		var i/*int*/ = 0;
		
		console.log(data.get_length(), "lenbytearray");
		value = 0;
		for (i = 0; i < data.get_length(); i ++ )
		{
			value = /*int*/flash.int(data[i]);
			data[i] = value ^ this.serverSequence[this.serverSelector];
			this.serverSequence[this.serverSelector] = value;
			this.serverSelector ^  = value & 7
		}
		
		
	};
	
	/*public*/d.decrypt = function (data/*flash.utils.ByteArray*/)/*void*/
	{
		var value/*int*/ = 0;
		var i/*int*/ = 0;
		
		value = 0;
		for (i = 0; i < data.get_length(); i ++ )
		{
			value = /*int*/flash.int(data[i]);
			this.clientSequence[this.clientSelector] = value ^ this.clientSequence[this.clientSelector];
			data[i] = this.clientSequence[this.clientSelector];
			this.clientSelector ^  = this.clientSequence[this.clientSelector] & 7
		}
		
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*private*/this/*var*/.SEQUENCE_LENGTH/*int*/ = 8;
		
		
	};
	
	
	
	
	flash.addDescription("XorProtectionContext", d, null, s, null, null);
	
}
());
