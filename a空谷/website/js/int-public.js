function browserInfo() {
	return {
		isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
	}
}
if (browserInfo().isPhone) {
	window.location.href = "https://www.baidu.com/";
}

layui.use(['element', 'form', 'carousel', 'layer', 'laydate', 'util', 'upload'], function () {
	var $ = layui.jquery,
		element = layui.element,
		carousel = layui.carousel,
		layer = layui.layer,
		form = layui.form,
		util = layui.util,
		laydate = layui.laydate,
		upload = layui.upload;


	/*回滚顶部*/

	laydate.render({
		elem: '#test6'
		, range: true
		, trigger: 'click'
	});

	/*$(window).scroll(function(){
		if($(window).scrollTop() > ($(window).height()-500)){
		   $(".topping").fadeIn();
		}
		else{
		   $(".topping").fadeOut();
		}
	  })*/
	$(".topping").on("click", function () {
		$("html,body").animate({ scrollTop: 0 }, 500);
	})


	var i = 0;
	$('.mob_icontop').on('click', function () {
		$('.mobile_nav').show();
		if (i == 0) {
			$('.mobile_nav').animate({ right: '0px' });
			i++;
		} else {
			$('.mobile_nav').animate({ right: '-150' });
			i--;
		}
	})
	$('.mob_close').on('click', function () {
		$('.mobile_nav').animate({ right: '-150' });
	})

	var wholBox = document.querySelectorAll(".whol_boxLi");;
	var whatsDetails = document.querySelectorAll(".whats-details")
	for (var i = 0; i < wholBox.length; i++) {
		wholBox[i].index = i;
		wholBox[i].addEventListener("mouseover", function () {
			for (let j = 0; j < whatsDetails.length; j++) {
				whatsDetails[j].style.display = "none";
			}
			whatsDetails[this.index].style.display = "block";
		})
		wholBox[i].addEventListener("mouseout", function () {
			for (let j = 0; j < whatsDetails.length; j++) {
				whatsDetails[j].style.display = "none";
			}
		})
	}

})

$(function () {
	$(".kinderga li.action").hover(function () {
		$(".mask_bx").show();
	}, function () {
		$(".mask_bx").hide();

	})
})
