class StringStream {
    constructor(initial){
        this.buffer = "";
        this.position = 0;
        if (initial){
            this.push(initial);
        }
    }

    push(data){
        this.buffer += data;
    }

    _read(){
        if (!this.isEmpty()){
            this.position ++;
            return this.buffer[this.position - 1];
        }
        return "";
    }

    read (amount = 1){
        var ret = "";
        for (var i = 0; i < amount; i ++){
            ret += this._read();
        }
        return ret;
    }

    readUntil(character){
        var ret = "";
        var chr = this._read();
        while (chr != character && chr != ""){ // It returns "" when it's out of data, gotta catch 'em all!.
            ret += chr;
            chr = this._read();
        }
        return ret;
    }

    peek(){
        if (!this.isEmpty()){
            return this.buffer[this.position];
        }
        return "";
    }

    isEmpty(){
        return this.position >= this.buffer.length;
    }

    readNumber(){
        var ret = "";
        var chr = this._read();
        var reggie = (/[0-9]/gm);
        while (chr.match(reggie)){
            ret += chr;
            chr = this._read();
        }
        this.position --; // It went one character too far, so rewind one.
        return ret - 0; // It's stupid, yes, but very concise
    }

    readWord(){
        return this.readUntil(" ");
    }

    readWords(amount){
        var ret = [];
        for (var i = 0; i < amount; i ++){
            ret.push(this.readWord());
        }
        return ret;
    }

    readRemaining(){
        var ret = "";
        while (!this.isEmpty()){
            ret += this._read();
        }
        return ret;
    }
}
