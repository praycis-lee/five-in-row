window.onload=function(){
	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
    
var begin = function(){
  var y = 20.5;
    for(var i=0;i<15;i++){
    var li = ctx.createLinearGradient(0,0,560,0);
    li.addColorStop(0.3,'#ff6700');
    li.addColorStop(1,'black');
     // ctx.lineWidth = 6;
        // ctx.lineCap = 'round';
        // ctx.strokeStyle = lingrad;
    ctx.strokeStyle = li;
        ctx.beginPath();
    ctx.moveTo(20.5,i*40+y);
    ctx.lineTo(580,i*40+y);
    ctx.stroke();
    }
        var x = 20.5;
    for(var i=0;i<15;i++){
    var li = ctx.createLinearGradient(0,0,560,0);
    li.addColorStop(0.3,'#000');
    li.addColorStop(1,'#ff6700');
    ctx.strokeStyle = li;
    ctx.beginPath();
    ctx.moveTo(x+i*40,20.5);
    ctx.lineTo(x+i*40,580);
    ctx.stroke();
    }
        
    ctx.beginPath(); 
    ctx.arc(300.5,300.5,3,0,Math.PI*2);
    ctx.fill();
        var Z=[140.5,460.5];
        for(var i = 0;i<Z.length;i++){
          for(var j = 0;j<Z.length;j++){
            ctx.beginPath();
            ctx.arc(Z[i],Z[j],3,0,Math.PI*2);
            ctx.fill();
          }
        }
}
begin();
        

  var canvas1 = document.querySelector('#canvas1');
  var ctx1 = canvas1.getContext('2d');
        var luozi = function(x,y,color){
        var zx = 40*x + 20.5;
        var zy = 40*y + 20.5;

        var white = ctx1.createRadialGradient(zx-7,zy-7,1,zx,zy,18)
        white.addColorStop(0.3,'#fff');
        white.addColorStop(1,'#ccc');

        var black = ctx1.createRadialGradient(zx-7,zy-7,1,zx,zy,18)
        black.addColorStop(0.1,'#ccc');
        black.addColorStop(1,'#000');

        ctx1.fillStyle = color?black:white;
        ctx1.beginPath();
        ctx1.arc(40*x+20.5,40*y+20.5,17,0,Math.PI*2);
        ctx1.fill();
        }
        
        var qizi = {};
        var kaiguan  = localStorage.x?false:true;
        canvas1.onclick=function(e){
        var x = Math.round((e.offsetX-20.5)/40);
        var y = Math.round((e.offsetY-20.5)/40);
        if(qizi[x+'_'+y]){return;}
        luozi(x,y,kaiguan)
        qizi[x+'_'+y] = true;
        kaiguan = !kaiguan;
        qizi[x+'_'+y] = kaiguan?'black':'white';
        localStorage.data = JSON.stringify(qizi);//对象转换成字符串或者数组转换成字符串
        
        if(kaiguan){
        if( win(x,y,'black') ){
          alert('白棋胜利');
          if(confirm('是否再来一局?')){
             localStorage.clear();
             location.reload();
             qizi = {};
             kaiguan = true;
             return;
          }else{
             canvas1.onclick  = null;
          }
        }
      }else{
        if( win(x,y,'white')){
           alert('黑棋胜利');
          if(confirm('是否再来一局?')){
            localStorage.clear();
            location.reload();
            qizi = {};
            kaiguan = true;
            return;
          }else{
             canvas1.onclick  = null;
          }
        }
      }

      if(!kaiguan){
          localStorage.x = 1;
        }else{
          localStorage.removeItem('x');
        }

        document.querySelector('.huiqi').onclick = function(){
          var newqizi = {};
          for(var i in qizi){
            if(i != (x+'_'+y)){
              newqizi[i] = qizi[i]
            }
          }
          qizi = newqizi;
          kaiguan = !kaiguan;
          ctx1.clearRect(x*40+3,y*40+3,35,35);
        }
    }
      
      
      var win=function(x,y,color){
        var shuju = filter(color);
        var tx,ty,H = 1,S = 1,ZX = 1,YX= 1;

        tx = x;ty = y;while(shuju[moshi(tx-1,ty)]){tx--;H++}
        tx = x;ty = y;while(shuju[moshi(tx+1,ty)]){tx++;H++}
        if(H >= 5){return true}

        tx = x;ty = y;while(shuju[moshi(tx,ty-1)]){ty--;S++}
        tx = x;ty = y;while(shuju[moshi(tx,ty+1)]){ty++;S++}
        if(S >= 5){return true}
        
        tx = x;ty = y;while(shuju[moshi(tx-1,ty-1)]){ty--;tx--;ZX++}
        tx = x;ty = y;while(shuju[moshi(tx+1,ty+1)]){ty++;tx++;ZX++}
        if(ZX >= 5){return true}

        tx = x;ty = y;while(shuju[moshi(tx+1,ty-1)]){ty--;tx++;YX++}
        tx = x;ty = y;while(shuju[moshi(tx-1,ty+1)]){ty++;tx--;YX++}
        if(YX >= 5){return true}
      }
      
      var moshi = function(x,y){
        return x+'_'+y;
      }

      var filter = function(color){
        var r = {};
        for(var i in qizi){
          if(qizi[i] == color){
             r[i] = qizi[i]
          }
        }
        return r;
      }

      canvas1.ondblclick = function(ev){
        ev.stopPropagation();
      }
      
      if(localStorage.data){
      	qizi = JSON.parse(localStorage.data);//字符串转换成对象
      	for(var i in qizi){
      		var x = i.split('_')[0];
      		var y = i.split('_')[1];
      		luozi(x,y,(qizi[i]=='white')?true:false);
      	}
      }
      
      document.querySelector('.chongzhi').onclick = function(){
      	localStorage.clear();
        location.reload();
      }

  
}