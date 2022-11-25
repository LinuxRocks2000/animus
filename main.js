var canvas = document.getElementById("card");
var ctx = canvas.getContext("2d");

var name = "John Doe";
var akas = ["John Deer", "John Dork"];

var notes = "N/A";

var alignment = 2;

var powers = {
    "telekenetic": "N/A",
    "telepathic": "N/A",
    "telechronic": "N/a"
};

var cW = 0;
var cH = 0;

var hash = new StringStream(window.location.hash);
hash.read(); // Purge the "#" symbol
name = decodeURIComponent(hash.readUntil("~"));
akas = [decodeURIComponent(hash.readUntil("~"))];
alignment = hash.read();
powers.telekenetic = hash.readUntil("~");
powers.telepathic = hash.readUntil("~");
powers.telechronic = hash.readUntil("~");
notes = decodeURIComponent(hash.readRemaining());

function resize(){
    canvas.width = cW;
    canvas.height = cH;
}

resize();

function checkText(text, x, y){
    var furthestW = ctx.measureText(text).width + x + 15; // Hard margin of 15 pixels
    var furthestH = ctx.measureText(text).height + y + 15;
    if (furthestW > cW){
        cW = furthestW;
    }
    if (furthestH > cH){
        cH > furthestH;
    }
}

function checkAndDraw(text, x, y){
    checkText(text, x, y);
    ctx.fillText(text, x, y);
}

function fancyAKAS(){
    var ret = "";
    akas.forEach((item, i) => {
        if (i > 0){
            ret += ", ";
        }
        ret += item;
    });
    return ret
}

function checkAndDrawBlock(text, x, y, fontHeight = 12){
    var words = text.split(" ");
    var line = "";
    var yOffset = 0;
    words.forEach((item, i) => {
        if (ctx.measureText(line + " " + item).width > cW - 30){
            checkAndDraw(line, x, y + yOffset);
            line = item;
            yOffset += fontHeight;
        }
        else{
            if (i > 0){
                line += " " + item;
            }
            else{
                line = item;
            }
        }
    });
    checkAndDraw(line, x, y + yOffset);
}

function loop(){
    resize();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cW, cH);
    cW = 300; // Reset to defaults
    cH = 450;

    ctx.fillStyle = "grey";
    ctx.fillRect(15, 15, 50, 50);
    ctx.fillStyle = "white";
    ctx.fillText("images", 15, 25);
    ctx.fillText("coming", 15, 36);
    ctx.fillText("soon", 15, 48);

    ctx.fillStyle = "black";
    ctx.font = 'bold 20px "Roboto Mono"';
    checkAndDraw(name, 80, 30);

    ctx.fillStyle = "red";
    ctx.font = 'bold 10px "Roboto Mono"';
    ctx.fillText("AKA", 15, 80);

    ctx.fillStyle = "blue";
    ctx.font = 'bold 11px monospace';
    checkAndDraw(fancyAKAS(), 40, 80);

    ctx.textAlign = "center";
    ctx.fillStyle = "purple";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText("ANIMUS", cW/2, 120);

    var baseline = 150;
    ctx.font = "16px sans-serif";
    Object.keys(powers).forEach((item, i) => {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(15, baseline, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.textAlign = "left";
        ctx.fillText(item, 20, baseline + 4);
        measured = ctx.measureText(item).width;
        ctx.textAlign = "right";
        ctx.fillText(powers[item], cW - 15, baseline + 4);
        measured2 = ctx.measureText(powers[item]).width;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(measured + 30, baseline);
        ctx.lineTo(cW - 20 - measured2, baseline);
        ctx.stroke();
        ctx.closePath();
        baseline += 30;
    });
    baseline += 10;
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.font = "bold 12px monospace";
    ctx.fillText("Alignment:", 15, baseline);
    var alignmentText = "";
    var alignmentColor = "";
    if (alignment == 0){
        alignmentText = "NEUTRAL";
        alignmentColor = "blue";
    }
    else if (alignment == 1){
        alignmentText = "ENEMY";
        alignmentColor = "red";
    }
    else if (alignment == 2){
        alignmentText = "ALLY";
        alignmentColor = "green";
    }
    ctx.fillStyle = alignmentColor;
    ctx.fillText(alignmentText, 100, baseline);
    baseline += 25;

    ctx.fillStyle = "maroon";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "left";
    ctx.fillText("NOTES:", 15, baseline);
    baseline += 20;
    ctx.fillStyle = "black";
    ctx.font = "bold 12px monospace";
    checkAndDrawBlock(notes, 15, baseline, 15);

    requestAnimationFrame(loop);
}

loop();


function expat(){
    canvas.toBlob((blob) => {
        console.log("YOS");
      navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
      ]);
    }, "image/png");
    alert("copied");
}
