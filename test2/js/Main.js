/*class  Main*/
/*
import flash.display.Sprite;
import flash.events.Event;
import flash.events.ProgressEvent;
import flash.net.Socket;
import flash.utils.ByteArray;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/d/*var*/.socket/*flash.net.Socket*/ = null;
	/*private*/d/*var*/.dataBuffer/*flash.utils.ByteArray*/ = null;
	/*private*/d/*var*/.anotherBuffer/*flash.utils.ByteArray*/ = null;
	/*private*/d/*var*/.currentPacketPosition/*int*/ = 0;
	/*private*/d/*var*/.context/*XorProtectionContext*/ = null;
	/*private*/d/*var*/.length/*int*/ = 0;
	
	
	/*public*/d.Main = function ()
	{
		this.socket = new flash.net.Socket();
		this.dataBuffer = new flash.utils.ByteArray();
		this.anotherBuffer = new flash.utils.ByteArray();
		
		this.Sprite_constructor();
		if (this.get_stage())
		{
			this.init()
		}
		
		else 
		{
			this.addEventListener(flash.events.Event.ADDED_TO_STAGE, flash.bindFunction(this, this.init))
		}
		
		
	};
	
	/*private*/d.init = function (e/*flash.events.Event*/)/*void*/
	{
		if (e == undefined) e = null;
		
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE, flash.bindFunction(this, this.init));
		this.socket.connect('146.59.110.195', 1337);
		this.socket.addEventListener(flash.events.ProgressEvent.SOCKET_DATA, flash.bindFunction(this, this.onDataSocket));
		this.socket.addEventListener(flash.events.Event.CONNECT, flash.bindFunction(this, this.onConnected));
		
	};
	
	/*private*/d.onConnected = function (e/*flash.events.Event*/)/*void*/
	{
		console.log(e.toString());
		
	};
	
	/*private*/d.onDataSocket = function (e/*flash.events.Event*/)/*void*/
	{
		this.socket.readBytes(this.dataBuffer, this.dataBuffer.get_length());
		this.check();
		
	};
	
	/*public*/d.wrap = function (buffer/*flash.utils.ByteArray*/)/*void*/
	{
		var testBuffer/*flash.utils.ByteArray*/ = null;
		var startPosition/*int*/ = 0;
		var packetLength/*int*/ = 0;
		var lastPosition/*int*/ = 0;
		
		testBuffer = new flash.utils.ByteArray();
		startPosition = buffer.get_position();
		packetLength = 8;
		buffer.writeInt(packetLength);
		buffer.writeInt( - 1864333717);
		packetLength += this.encode(testBuffer, "en");
		this.context.encrypt(testBuffer);
		buffer.writeBytes(testBuffer);
		testBuffer.clear();
		testBuffer.set_position(0);
		lastPosition = buffer.get_position();
		buffer.set_position(startPosition);
		buffer.writeInt(packetLength);
		buffer.set_position(lastPosition);
		this.length = packetLength;
		
	};
	
	/*public*/d.encode = function (buffer/*flash.utils.ByteArray*/, object/*Object*/)/*int*/
	{
		var bytes/*flash.utils.ByteArray*/ = null;
		var length/*int*/ = 0;
		
		if (this.testBuff(buffer, object))
		{
			return 1
		}
		
		bytes = new flash.utils.ByteArray();
		bytes.writeUTFBytes(String(object));
		length = bytes.get_length();
		buffer.writeInt(length);
		buffer.writeUTFBytes(String(object));
		return length + 5;
		
	};
	
	/*public*/d.testBuff = function (buffer/*flash.utils.ByteArray*/, value/*Object*/)/*Boolean*/
	{
		var boolean/*Boolean*/ = false;
		
		boolean = value == null;
		buffer.writeBoolean(boolean);
		return boolean;
		
	};
	
	/*private*/d.check = function ()/*void*/
	{
		var packetLength/*int*/ = 0;
		var packetId/*int*/ = 0;
		var payloadLength/*int*/ = 0;
		var length/*int*/ = 0;
		var data/*Vector.<int>*/ = null;
		var i/*int*/ = 0;
		var byteArray/*flash.utils.ByteArray*/ = null;
		var length/*int*/ = 0;
		var length2/*int*/ = 0;
		
		packetLength = 0;
		packetId = 0;
		payloadLength = 0;
		this.dataBuffer.set_position(this.currentPacketPosition);
		if (this.dataBuffer.get_bytesAvailable() == 0)
		{
			return 
		}
		
		while (this.dataBuffer.get_bytesAvailable() >= 8)
		{
			packetLength = this.dataBuffer.readInt();
			packetId = this.dataBuffer.readInt();
			payloadLength = packetLength - 8;
			console.log(packetId, packetLength, payloadLength);
			if (this.dataBuffer.get_bytesAvailable() < payloadLength)
			{
				return 
			}
			
			if (payloadLength > 0)
			{
				this.dataBuffer.readBytes(this.anotherBuffer, 0, payloadLength)
			}
			
			if (packetId == 2001736388)
			{
				length = this.anotherBuffer.readInt();
				console.log("hashLen", length);
				data = new Array(length, true);
				for (i = 0; i < length; i ++ )
				{
					data[i] = this.anotherBuffer.readByte()
				}
				
				this.context = new XorProtectionContext(data);
				if (this.socket.get_connected())
				{
					byteArray = new flash.utils.ByteArray();
					this.wrap(byteArray);
					console.log(this.length);
					console.log("LENGTH", byteArray.get_length());
					this.socket.writeBytes(byteArray, 0, this.length);
					this.socket.flush()
				}
				
				
			}
			
			else if(packetId ==  - 1715719586)
			{
				this.context.decrypt(this.anotherBuffer);
				this.anotherBuffer.set_position(0);
				console.log(this.anotherBuffer.get_position());
				this.anotherBuffer.readBoolean();
				console.log(this.anotherBuffer.get_position(), "ТУ");
				length = this.anotherBuffer.readInt();
				console.log(this.anotherBuffer.get_position(), "ТУ2");
				console.log(length);
				console.log(this.anotherBuffer.readUTFBytes(length));
				this.anotherBuffer.readBoolean();
				length2 = this.anotherBuffer.readInt();
				console.log("VK", length2);
				console.log(this.anotherBuffer.readUTFBytes(length2))
			}
			
			else if(packetId == 321971701)
			{
				console.log("POS", this.anotherBuffer.get_position());
				this.context.decrypt(this.anotherBuffer);
				this.anotherBuffer.set_position(0);
				console.log("captchaLocation count", this.anotherBuffer.readInt())
			}
			
			this.anotherBuffer.clear();
			if (this.dataBuffer.get_bytesAvailable() == 0)
			{
				this.dataBuffer.clear();
				this.currentPacketPosition = 0;
				return 
			}
			
			this.currentPacketPosition = this.dataBuffer.get_position()
		}
		
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*//*public*/this.prototype.Sprite_constructor = this.__base__;
		
		
		
	};
	
	
	
	
	flash.addDescription("Main", d, "flash.display.Sprite", s, null, ["flash.net.Socket", "flash.utils.ByteArray", "flash.events.Event", "flash.events.ProgressEvent", "XorProtectionContext"]);
	
}
());
