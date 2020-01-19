export default {
	trim(input) {
		return input.replace(/^\s+|\s+$/, '');
	},
	//去空格，去null
	trimToEmpty(input) {
		return input == null ? "" : this.trim(input);
	},
	//检查是否包含
	contains(input, searchSeq) {
		return input.indexOf(searchSeq) >= 0;
	},
	//是否相等
	equals(input1, input2) {
		return input1 == input2;
	},
	//是否相等 （不区分大小写）
	equalsIgnoreCase(input1, input2) {
		return input1.toLocaleLowerCase() == input2.toLocaleLowerCase();
	},
	//是否包含空格
	containsWhitespace(input) {
		return this.contains(input, ' ');
	},
	//只包含字母
	isAlpha(input) {
		return /^[a-z]+$/i.test(input);
	},
	//只包含字母、空格
	isAlphaSpace(input) {
		return /^[a-z\s]*$/i.test(input);
	},
	//只包含字母、数字
	isAlphanumeric(input) {
		return /^[a-z0-9]+$/i.test(input);
	},
	//只包含字母、数字和空格
	isAlphanumericSpace(input) {
		return /^[a-z0-9\s]*$/i.test(input);
	},
	//数字
	isNumeric(input) {
		return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
	},
	//小数
	isDecimal(input) {
		return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
	},
	//负小数
	isNegativeDecimal(input) {
		return /^\-(?:0|[1-9]\d*)\.\d+$/.test(input);
	},
	//正小数
	isPositiveDecimal(input) {
		return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
	},
	//整数
	isInteger(input) {
		return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
	},
	//正整数
	isPositiveInteger(input) {
		return /^\+?(?:0|[1-9]\d*)$/.test(input);
	},
	//负整数
	isNegativeInteger(input) {
		return /^\-(?:0|[1-9]\d*)$/.test(input);
	},
	//只包含数字和空格
	isNumericSpace(input) {
		return /^[\d\s]*$/.test(input);
	},
	//删掉特殊字符(英文状态下)
	removeSpecialCharacter(input) {
		return input.replace(/[!-/:-@\[-`{-~]/g, "");
	},
	//中文校验
	isChinese(input) {
		return /^[\u4E00-\u9FA5]+$/.test(input);
	},
	//去掉中文字符
	removeChinese(input) {
		return input.replace(/[\u4E00-\u9FA5]+/gm, "");
	},
	//转义元字符
	escapeMetacharacter(input) {
		var metacharacter = "^$()*+.[]|\\-?{}";
		if (metacharacter.indexOf(input) >= 0) {
			input = "\\" + input;
		}
		return input;
	},
	//检测密码强度
	checkPwd(str) {
		var Lv = 0;
		if (str.length < 6) {
			return Lv
		}
		if (/[0-9]/.test(str)) {
			Lv++
		}
		if (/[a-z]/.test(str)) {
			Lv++
		}
		if (/[A-Z]/.test(str)) {
			Lv++
		}
		if (/[\.|-|_]/.test(str)) {
			Lv++
		}
		return Lv;
	},
	/*检测类名*/
	hasClass(ele, name) {
		return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
	},
	/*添加类名*/
	addClass(ele, name) {
		if (!this.hasClass(ele, name)) ele.className += " " + name;
	},
	/*删除类名*/
	removeClass(ele, name) {
		if (this.hasClass(ele, name)) {
			var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
			ele.className = ele.className.replace(reg, '');
		}
	},
	/*替换类名*/
	replaceClass(ele, newName, oldName) {
		this.removeClass(ele, oldName);
		this.addClass(ele, newName);
	}
}

