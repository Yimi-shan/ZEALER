// 轮播图
var oLarge = document.getElementById('large');
var oPic = document.getElementById('pic');
var aImg = oPic.getElementsByTagName('img');
var aA = oPic.getElementsByTagName('a');
var oSmall = document.getElementById('small');
var aLi = oSmall.getElementsByTagName('li');
var oLeft = document.getElementById('large_left');
var oRight = document.getElementById('large_right');
var speed = 0;/* 速度 */
var num = 1;
var step = 0;/* 步数 */
var max_step = 10;/* 最大步数 */
var time,time1;
var star,end;/* 当前位置 */
var img_num = 1;/* 当前图片 */
var execute = true;

 
     

/* 设置图片宽度/位置 */
function set(){
	for(var i = 0;i<aA.length;i++){
		aA[i].style.width = oLarge.offsetWidth+'px';
		aImg[i].style.left = (1920-oLarge.offsetWidth)/-2 + 'px'
		oSmall.style.left = (oLarge.offsetWidth- oSmall.offsetWidth)/2 +'px';
	}
}
set();
window.onresize = function(){
	set();
	if(oLarge.offsetWidth>=775){
		oNav.style.display = 'block';
	}else{
		oNav.style.display = 'none';
	}
	tool_a4.style.height = tool_a3.offsetHeight + 'px';
}

/* 图片滚动 */
star_time();
function star_time(){
	time = setTimeout(clock,1000);
}

function clock(){
	clearTimeout(time);		
	clearInterval(time1);
	position();

}

oPic.style.left = -oLarge.offsetWidth + 'px';
function position(){
	star = oPic.offsetLeft;
	end = (img_num+1) * oLarge.offsetWidth;
	speed = (end+star)/max_step;

	time1 = setInterval(move,30);

	function move(){
		
		if(step >= max_step){
			step = 0;
			/* num =1; */
			/* 重置图片的位置 */
			if(oPic.offsetLeft < -oLarge.offsetWidth*img_num && oPic.offsetLeft >= -oLarge.offsetWidth*(img_num+1) ){
				oPic.style.left = -oLarge.offsetWidth*(img_num+1) + 'px';
			}
			img_num++;
			if(img_num==aA.length-1 && execute == true){
				img_num=1;
				oPic.style.left = -oLarge.offsetWidth + 'px';
			}
			/* 设置长方形 */
			for(var j=0;j<aLi.length;j++){
					aLi[j].className = '';
				}
				if(img_num<=0){
					aLi[aLi.length].className = 'select';
				}else{
					aLi[img_num-1].className = 'select';
				}
			

			/* 下一张 */
			clearInterval(time1);
			star_time();
			execute = true;
			
		}else{
			oPic.style.left = oPic.offsetLeft - speed + 'px';
			step++;
		}	
	}

}


oLeft.onclick = function(){
	clearInterval(time1);

	if(img_num==1){			
		oPic.style.left = - oLarge.offsetWidth * (aA.length-1) + 'px';
		img_num = (aA.length-3);
		execute = false;
		
	}else{
		img_num -= 2;
		execute = true;
	}
	//console.log(img_num);

	clock();
}
oRight.onclick = function(){
	if(img_num == aA.length-2){
		oPic.style.left = 0;
		img_num=0;
	}
	clearInterval(time1);
	clock();
}



/* 长方形 */
for(var i=0;i<aLi.length;i++){
	aLi[i].onclick = (function (i){
		return function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className = '';
			}
			aLi[i].className = 'select';
			img_num =i;
			clearInterval(time1);
			clock();
		}
	})(i);
}

// 导航
var oEm = document.getElementById('em');
var oNav = document.getElementById('nav');
var oNav_big = document.getElementById('nav_big');
var nav_num=0;
var nav_step = 3;
var nav_time1,nav_time2;
var nav_step=430;

oEm.onclick = function (){
	nav_num++;
	
	if(nav_num % 2 == 0){
	 	clearInterval(nav_time1);
	 	clearInterval(nav_time2);
	 	oNav.style.top = 45 +'px';
	 	var nav_i=0;
	 	nav_time2 = setInterval(nav_move1,20);
	 	
		setTimeout(function(){
			oNav.style.display = 'none';
			oNav_big.className = ' main clear';
			oEm.className = 'em';
		}, 200);
		
	}else{
		oNav.style.display = 'block';
		oNav_big.className = ' main clear nav_big';
		oEm.className = 'em_1';
		
	 	clearInterval(nav_time1);
	 	clearInterval(nav_time2); 
	 	oNav.style.top = -350 +'px';
	 	var nav_i=0;	
	 	nav_time1 = setInterval(nav_move,20);
	}
	function nav_move(){
		
		if(oNav.offsetTop<45){
			var nav_num1 = Math.ceil(Math.sin(nav_i*Math.PI/180)*nav_step);
			oNav.style.top =  nav_num1 + 'px';
			nav_i += 2;
		}
	
	}
	function nav_move1(){
		if(oNav.offsetTop>-350){
			var nav_num1 = Math.ceil(Math.sin(nav_i*Math.PI/180)*nav_step);
			oNav.style.top =  -1*nav_num1 + 'px';
			nav_i += 4;
		}
	
	}
	
}

// 视频
var oVideo = document.getElementById('video');
var aVideo_Div = oVideo.getElementsByTagName('div');
var aVideo_B = oVideo.getElementsByTagName('b');
var aVideo_Em = oVideo.getElementsByTagName('em');

for(var i = 0;i<aVideo_Div.length;i++){
	aVideo_Div[i].onmouseover = (function(i){
		return function(){
			var num=0;
			var run_time1 = setInterval(run1,0);
			function run1(){
				if(num>=50){
					clearInterval(run_time1);
				}else{
					num += 2;
					aVideo_Em[i].style.opacity = num / 50; 
					aVideo_B[2*i].style.opacity = num / 50; 
					aVideo_B[2*i+1].style.opacity = num / 50; 
					aVideo_Em[i].style.top =  155 - num + 'px';
					aVideo_B[2*i].style.left = 60 + num +'px';
					aVideo_B[2*i+1].style.right = 60 + num +'px';

				}
			}

			
		}
	})(i);
		aVideo_Div[i].onmouseout = (function(i){
		return function(){
			var num=50;
			var run_time1 = setInterval(run1,0);
			function run1(){
				num -= 2;
				if(num<=0){
					clearInterval(run_time1); 
				}else{
					aVideo_Em[i].style.opacity =  num/50; 
					aVideo_B[2*i].style.opacity = num/50; 
					aVideo_B[2*i+1].style.opacity = num/50; 
					aVideo_Em[i].style.top =  155 - num + 'px';
					aVideo_B[2*i].style.left = 60 + num +'px';
					aVideo_B[2*i+1].style.right = 60 + num +'px';
				}
			}

			
		}
	})(i);

}


var tool_a1= document.getElementById('tool_a1');
var tool_a2= document.getElementById('tool_a2');
var tool_a3= document.getElementById('tool_a3');
var tool_a4= document.getElementById('tool_a4');


function tool(tool_a){
	tool_a.onmouseover = function(ev){
		var ev = ev || window.event;
		var tool_s_x = ev.clientX;
		var tool_s_y = ev.clientY;
		tool_a.onmousemove = function(ev){
			var ev = ev || window.event;
			tool_a.children[0].style.left = (ev.clientX -tool_s_x )/30 + 'px';
			tool_a.children[0].style.top = (ev.clientY -tool_s_y )/50 + 'px';
			
		}
	}	
}
tool(tool_a1);
tool(tool_a2);
tool(tool_a3);
tool(tool_a4);


var lab_div1 = document.getElementById('lab_div1');
var lab_div2 = document.getElementById('lab_div2');
var lab_div3 = document.getElementById('lab_div3');
var lab_div4 = document.getElementById('lab_div4');



 function lab_over(lab_div){
	var lab_num = 0 ;
	var lab_time1 = setInterval(function(){
		lab_num++;
		if(lab_num<50){
			lab_div.children[0].style.left = lab_div.children[0].offsetLeft +1 + 'px';
			lab_div.children[2].style.left = lab_div.children[2].offsetLeft -1 + 'px';
			lab_div.children[1].style.top = lab_div.children[1].offsetTop -1 + 'px';
		}
		
	},0);

}
function lab_out(lab_div){
	var lab_num = 0 ;
	var lab_time1 = setInterval(function(){
		lab_num++;
		if(lab_num<50){
			lab_div.children[0].style.left = lab_div.children[0].offsetLeft -1 + 'px';
			lab_div.children[2].style.left = lab_div.children[2].offsetLeft +1 + 'px';
			lab_div.children[1].style.top = lab_div.children[1].offsetTop +1 + 'px';
		}
		
	},0);

}

lab_div1.onmouseover = function(){lab_over(lab_div1)};
lab_div1.onmouseout = function(){lab_out(lab_div1)};
lab_div2.onmouseover = function(){lab_over(lab_div2)};
lab_div2.onmouseout = function(){lab_out(lab_div2)};
lab_div3.onmouseover = function(){lab_over(lab_div3)};
lab_div3.onmouseout = function(){lab_out(lab_div3)};
lab_div4.onmouseover = function(){lab_over(lab_div4)};
lab_div4.onmouseout = function(){lab_out(lab_div4)};


setTimeout(function(){
	tool_a4.style.height = tool_a3.offsetHeight + 'px'; 
},0);


