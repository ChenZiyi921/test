function modelTost() {
	let tem = "";
	let imgArr = [];
	let tems = '<div class="modelTost">' +
		'<div class="modelTostChile">' +
		'<p><span class="modelClose"><img src="images/index/colse.png"</span></p>' +
		'<div class="swiper-container bullet">' +
		'<div class="swiper-wrapper"></div>' +
		'</div>' +
		'<div class="swiper-button-next"></div>' +
		'<div class="swiper-button-prev"></div>' +
		'</div>' +
		'</div>'

	function imgClick() {
		$('.ambience img').click(function () {
			console.log("000");
			tem = ''//初始化防止多追加；
			imgArr = [];
			let slideIndex = 0;
			let attrs = $(this).attr('src');
			//	点击在body中追加弹框
			$('.citizen07').append(tems);
			//	找到当前图片的最外层父元素下的所有图片
			let imgArrList = $(this).parents('.ambience').find('img');
			//	追加图片数组
			for (var i = 0; i < imgArrList.length; i++) {
				imgArr.push(imgArrList.eq(i).attr('src'))
			}
			//	图片数组与点击src做匹配,获取对应index
			imgArr.forEach((item, index) => {
				if (attrs === item) {
					slideIndex = index
				}
			})
			//	弹框中追加对应数组swiper
			for (var i = 0; i < imgArrList.length; i++) {
				tem += "<div class='swiper-slide'><img src='" + imgArr[i] + "'></div>"
			}
			$(".bullet .swiper-wrapper").append(tem);
			$('.modelTost').fadeIn(500);

			var mySwiper = new Swiper('.bullet', {
				slidesPerView: 5,
				spaceBetween: 10,
				centeredSlides: true,
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				observer: true,
				observeParents: true,
				initialSlide: slideIndex
			});
			$('.bullet').children('.swiper-notification').eq(0).siblings('.swiper-notification').remove()
		})
	}
	$('body').on('click', '.modelClose', function () {
		$('.modelTost').remove();
	})
	imgClick()
}