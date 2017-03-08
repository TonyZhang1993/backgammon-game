
var me = true; //表示黑子 flase表示白子
var chessBoard = [];
var over = false;
//赢法数组
var wins = [];

//赢法统计数组
var myWin = [];
var computerWin = [];

for(var i=0;i<15;i++){
	chessBoard[i] = [];
	for(var j=0;j<15;j++)
		chessBoard[i][j]=0;
}   //判断坐标是否已经有子

for(var i=0;i<15;i++){
	wins[i] = [];
	for(var j=0;j<15;j++)
		wins[i][j]=[];
}
var count = 0;  //表示第几种赢法
//所有横线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		//win[0][0][0] = true
		//win[0][1][0] = true
		//win[0][2][0] = true
		//win[0][3][0] = true
		//win[0][4][0] = true
		//
		for(var k=0;k<5;k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
	
}
//所有竖线赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		//win[0][0][0] = true
		//win[1][0][0] = true
		//win[2][0][0] = true
		//win[3][0][0] = true
		//win[4][0][0] = true
		//
		for(var k=0;k<5;k++){
			wins[j+k][i][count] = true;
		}

		count++;
	}
	
}
//斜线赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count] = true;
		}
		count++;	
	}
	
}
//反斜线
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count] = true;
		}
		count++;	
	}
	
}

console.log(count);

for(var i=0;i<count;i++){
	myWin [i] = 0;
	computerWin [i] = 0;

}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#bfbfbf"; //设置或返回用于笔触的颜色、渐变或模式

var drawChessBoard = function(){   //封装成一个函数，画棋盘
	for(var i=0;i<15;i++){
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		//context.stroke();               //横线
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();                // 描边  纵线
	}
}
 
var logo = new Image();   //画背景图片
logo.src = "shuiyin.png";
logo.onload = function(){   //加载完成后回调方法
	context.drawImage(logo,100,100,300,200); //向画布上绘制图像、画布或视频
	drawChessBoard();   //使得先画背景，在画线条
}

var onStep =function(i,j,me){      //为每一步画子
	context.beginPath();   //起始一条路径，或重置当前路径
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);//圆心位置，半径，起始弧度，结束弧度
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);//第一个圆圆心坐标，半径，第二个。。
	if(me){
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636766");
	} else {
		gradient.addColorStop(0,"#d1d1d1");
	    gradient.addColorStop(1,"#f9f9f9");   //h黑白棋子
	}

	context.fillStyle = gradient;
	context.fill();  //填充当前轨迹
}
//context.moveTo(0,0);   //把路径移动到画布中的指定点，不创建线条
//context.lineTo(450,450);   //添加一个新点，然后在画布中创建从该点到最后指定点的线条
//context.stroke();    //绘制已定义的路径
//14*14  30px   blank 15px   


chess.onclick = function(e){
	if(over){return;}
	var x= e.offsetX;
	var y= e.offsetY;   //获得相对于棋盘的坐标
	var i =Math.floor(x/30);
	var j =Math.floor(y/30);   //向下取整
	if(chessBoard[i][j]==0){   
		onStep(i,j,me);
		if(me){
			chessBoard[i][j]=1;//表示落得黑子
		} else{
			chessBoard[i][j]=2;//落得白子
		}
	    
	    for(var k=0;k<count;k++){
	    	if(me){
		    	if(wins[i][j][k]){
		    		myWin[k]++;
		    		computerWin[k]=6;
		    		if(myWin[k]==5){
		    			window.alert("you win!");
		    			over = true;
		    		}
		    	}
	    	}else{
	    		if(wins[i][j][k]){
		    		computerWin[k]++;
		    		myWin[k]=6;
		    		if(computerWin[k]==5){
		    			window.alert("he win!");
		    			over = true;
		    		}
		    	}
	    	}
		}	
	}
	me = !me;



}



