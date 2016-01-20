$(document).ready(function(){
	$('.cartoon,.cartoonGif,.cartoonBg,.second1').css({'height':$(window).height(),'width':$(window).width()})
	firstPage();
	$(".container").css('height',$(window).height());
	
	$('.cartoonBtn').click(function(){
		$('.page').css('display','block');
		$(".firstPage").css('display','none');
		$(".second1").css('display','block').addClass('fadeIn');
	});
	$('.page2-1').click(function(){
		$('.page2-1-2').css('display','block');
		$('.page2-2-2').css('display','block');
		$('.page2-4').css('display','none');
		$('.page2-5').css('display','block');
		$('.page2-1').css('display','none');
		$('.page2-2').removeClass('flip')
	});
	$('.page2-2-2').click(function(){
		$('.page2-2-2').css('display','none');
		$('.page2-1-2').css('display','none');
		$('.page2-2').css('display','block').addClass('flip')
		$('.page2-4').css('display','block');
		$('.page2-5').css('display','none');
		$('.page2-1').css('display','block');
	});
	var num=0;
	$('.page6-3').click(function(){
		$('.page6-5').css('display','block').removeClass('bounceOut').addClass('bounceIn');
		$('.page5-bg').css('display','block');
	});
	$('.page5-bg').click(function(){
		$('.page5-bg').css('display','none');
	})
	$('.page6-5').click(function(){
		$(this).addClass('bounceOut').css('display','none');
		$('.page5-bg').css('display','none');
	});
	$('.page6-4').click(function(){
		$('.page6-6').css('display','block').removeClass('bounceOut').addClass('bounceIn');
		$('.page5-bg').css('display','block');
	});
	$('.page6-6').click(function(){
		$(this).addClass('bounceOut').css('display','none');
		$('.page5-bg').css('display','none');
	});
	
	$('.music').click(function(){
		if ($('#musicAudio').pause) {
			$('#musicAudio').play();
		}else{
			$('#musicAudio').pause();
		};
	});
	
	$(".page8-btn").click(function(){
		window.location.href="../templates/index.html";
	});

	
	
	//接口
	var BASE_URL = 'http://ctfeshop-test.limijiaoyin.com';

	var gifts = {
		dataline:"数据线",
		storageBox:'收纳盒',
		Upan:'U盘'
	};
	var userId = 0;
	var ownId = $("ownid").val();

	//获取登录用户id
	$.get(BASE_URL+"/api/user/",function(data){
		userId = data.id;
	});

	//提交用户信息
	$("form#userPost input#sub").click(function(e){
		//获取用户填的数据，生成json对象
		var user = {
			name : $("_name").val(),
			phone : $("_phone").val(),
			address: $("_address").val(),
			force : userId
		}
		//向后端发post请求以及数据，根据返回的json对象参数判断是否保存成功。
		$.post(BASE_URL+"/api/person/",user,function(data){
			if(data.personId){
				alert("保存成功！")
			}else{
				alert(data.messages);
			}
		});

		return false;
	});


	//抽奖
	$("input#page6-info").click(function(){
		//点击抽奖按钮后，向后端发get请求，返回中奖信息的json对象，判断是否中奖。
		$.get(BASE_URL+"/api/reward/",function (data) {
			if(data.reward){//中奖
				for(x in gifts){
					if(data.reward==x){
						$('#page6-info').val(gifts[x]);
						$('#page6-img img').attr("src","../static/img"+x+".png");
					}
				}
			}else{
				$('#page6-info').val("未中奖");
			}
		});
	});

	//收集元气
	$('.page6-2').click(function(){
			//点击收集元气按钮后，向后端发post请求及数据，根据返回对象的参数，及参数值的大小。判断投票次数，及后续行为。
			$.post(BASE_URL+"/api/force/"+ownId,function(data){
				if(data.personId){//投票低于十次,可以再投
					num+=10;
					$('.progress').css('width',num+'%');
				}else{
					alert(data.messages);
				}
			});
	});

	//自定义分享
	$.get('http://slide.cm/wechat/config', {
	    url: location.href.split('#')[0]
	},function(data) {
	    wx.config({
	        debug: false,
	        appId: 'wx82a5d90838b461ba',
	        timestamp: data.config.timestamp,
	        nonceStr: data.config.nonceStr,
	        signature: data.config.signature,
	        jsApiList: [
	            'onMenuShareTimeline', //分享给好友
       			'onMenuShareAppMessage', //分享到朋友圈
	        ]
	    });
	    wx.ready(function() {
	        wx.onMenuShareTimeline({
				link: BASE_URL+"/share/"+userId+"/"
	        });

	        wx.onMenuShareAppMessage({
				link: BASE_URL+"/share/"+userId+"/"
	        });
	    });

	    wx.error(function(res) {
	        alert('error');
	    });
	}, 'json');













	//如果奖品是周大福优惠券
	var youhuquan =$('#page6-info').val()
	if (youhuquan=='周大福网络旗舰店优惠券') {
		$('.page6 form').remove();
		$('.page6').append("<div class='youhui-page'><p>领取时间：2016年1月22日-1月31日使用时间：2016年1月22日-2月29日周大福网络旗舰店，50元无门槛全店通用优惠券（除特殊产品外：e购金、e购钻、裸钻、周年庆产品、10k金产品、金条金币金章）</p><a href='http://a1919.oadz.com/link/C/1919/3171/QoOYgsTA-3xOtzFURMXVRo1Aht8_/a/0/http://m.ctfeshop.com.cn/special/theme.aspx?fn=619edm20' id='tiaozhuan'/>");
	}

});//结束

function firstPage(){
	$(".cartoon").addClass("zoomIn");
	setTimeout(function(){
		$('.cartoon').removeClass('zoomIn').addClass('bounceOut');
	},3000);
	setTimeout(function(){
		$('.cartoonGif').css('display','block');
	},4000);
	setTimeout(function(){
		$('.cartoonGif').addClass('fadeOut');
	},8000);
	setTimeout(function(){
		$('.cartoonBg').css('display','block');
		$('.cartoonBg').addClass('fadeIn');
	},9000);
	setTimeout(function(){
		$('.boat1').css('display','block');
		$('.boat1').addClass('zoomIn');
	},9000);
	setTimeout(function(){
		$('.boat2,.boat4,.boat6,.boat8').css('display','block');
		$('.boat2,.boat4,.boat6,.boat8').addClass('zoomIn');
	},9500);
	setTimeout(function(){
		$('.boat3,.boat9,.boat5,.boat7').css('display','block');
		$('.boat3,.boat9,.boat5,.boat7').addClass('zoomIn');
	},10000);
	setTimeout(function(){
		$('.cartoonTitle').css('display','block');
		$('.cartoonTitle').addClass('zoomIn');
	},11000);
	setTimeout(function(){
		$('.cartoonBtn').css('display','block');
		$('.cartoonBtn').addClass('bounceInUp');
	},11000);
	
};
function playPause() {    
    var music = document.getElementById('music2');    
    var music_btn = document.getElementById('music_btn2');    
    if (music.paused){    
        music.play();    
        music_btn.src = '../static/img/music.png';    
    }    
    else{    
        music.pause();    
        music_btn.src = '../static/img/music1.png';     
    }    
}   
