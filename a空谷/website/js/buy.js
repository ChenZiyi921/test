(function ($) {
	$.fn.purchasing = function (options) {

		var defaults = {
			checksin: ".checksin",
			pric_id: ".pric_id"
		};
		var endOptions = $.extend(defaults, options);
		var $_this = $(this);
		var checksin = $_this.find(".checksin");
		var pric_id = $_this.find(".pric_id");

		$_this.find(".dian").click(function () {
			console.log("112121313");
		})


		// 计算函数
		function result() {

			var allprice = 0;
			var allnum = 0;
			pric_id.each(function () {
				if ($(this).find(".chec_tk")[0].checked == true) {
					var num = parseInt($(this).find(".numchange").val());
					var price = parseFloat($(this).find(".price_un").children("span").html());
					var all = num * price;
					allprice += all;
					allnum += num;
				} else {
					allprice += 0;
					allnum += 0;
				}
			});
			var zong = allprice.toFixed(2);
			$_this.find(".num_sho").html(allnum);
			$_this.find(".num_tal").html(zong);

			/*
			var av=$_this.find(".provs_cont input:checked").length;  
			if(av==0){ 
			   $_this.find(".aggregate").removeClass("locking");  
			}else{
			$_this.find(".aggregate").addClass("locking");
			}*/
		}
		/*小计*/
		function subsmall() {
			pric_id.each(function () {
				var tiy = 0;
				var num = parseInt($(this).find(".numchange").val());
				var price = parseFloat($(this).find(".price_un").children("span").html());
				tiy = num * price
				var zong = tiy.toFixed(2);
				$(this).find(".plan_sml").find("span").html(zong);
			})

		}

		window.onload = function () {
			/*默认小计*/
			subsmall();

			/*全选*/
			$_this.find(".checkall").on("click", function () {
				var flag = $(this)[0].checked;
				$_this.find(".checksin").each(function () {
					$(this)[0].checked = flag;
				})
				result();
			});
			/*单个勾选*/
			checksin.click(function () {
				console.log("00000");
				var i = 0;
				checksin.each(function () {
					// 存在一个未选中，则，全选按钮未选中
					if ($(this)[0].checked == false) {
						$_this.find(".checkall")[0].checked = false;

					} else {
						// 如果是选中的，累加，和全部长度比较
						i += 1;
						if (i == checksin.length) {
							$_this.find(".checkall")[0].checked = true;
						}
					}
				});
				result();
			});
			$_this.find(".subs").click(function () {
				$(this).next().val(parseInt($(this).next().val()) - 1);
				if (parseInt($(this).next().val()) <= 1) {
					$(this).next().val(1);
				}
				result();
				subsmall();
			})
			$_this.find(".plus").click(function () {
				$(this).prev().val(parseInt($(this).prev().val()) + 1);
				result();
				subsmall();
			})

			layui.use("layer", function () {
				var $ = layui.jquery;
				$_this.find(".operating a").click(function () {

				})
			})


			$_this.find(".delet_sel").click(function () {

				var av = $_this.find(".provs_cont input:checked").length;
				if (av == 0) {
					layer.confirm('请至少选择一个商品再进行改操作', {
						title: '删除商品', skin: 'tipsing', area: ['580px', '220px'], yes: function (index) {
							layer.close(layer.index);
						}
					});
				} else {
					layer.confirm('确认要删除这些商品吗？', {
						title: '删除商品', skin: 'tipsing', area: ['580px', '220px'], btn: ['确定', '取消'], yes: function (index) {
							dell();
							layer.close(layer.index);
						}
					});
				}
			})
			$_this.find(".operating a").click(function () {
				var $dis = $(this).parent().parent().parent();
				layer.confirm('確定要删除这些商品吗？', {
					title: '删除商品', skin: 'tipsing', area: ['580px', '220px'], yes: function (index) {
						$dis.remove();
						layer.close(layer.index);
					},
					cancel: function (index, layero) {

					}
				});
			})
		}

		/*删除某项*/
		function dell() {
			pric_id.each(function () {
				console.log("00");
				$_this.find(".pric_id").each(function () {
					if ($(this).find(".checksin")[0].checked == true) {
						$(this).remove();
					} else {

					}
				})

			})
			result();
		}
	}
})(jQuery);