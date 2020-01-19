// 输入框只能输入正整数，输入同时禁止了以0开始的数字输入
this.value.replace(/^(0+)|[^\d]+/g,'')

// 必须涵盖数字、字母、符号中两种组合, 6-16位
/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/  ||
/(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/

// 禁止输入中文
this.value.replace(/[\u0391-\uFFE5]/gi,'')

// 只能输入中文
this.value.replace(/[^\u4e00-\u9fa5]/g,'')

// 至少为字母、数字、下划线两种组合, 6-16位
/(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{6,16}$/

// 只能输入大小写字母、数字、下划线：
this.value.replace(/[^\w_]/g,'')
 
// 只能输入小写字母、数字、下划线：
this.value.replace(/[^a-z0-9_]/g,'')
 
// 只能输入数字和点
this.value.replace(/[^\d.]/g,'')
 
// 只能输入数字
this.value.replace(/\D/g,'')
  
// 只能输入英文
this.value.replace(/[^a-zA-Z]/g,'')
  
// 只能输入中文、数字、英文  
this.value.replace(/[^\w\u4E00-\u9FA5]/g, '') 
  
// 只能输入数字和字母
this.value.replace(/[\W]/g,'')
 
// 除了英文的标点符号以外, 其他的都可以中文, 英文字母, 数字, 中文标点
this.value=this.value.replace(/^[^!@#$%^&*()-=+]/g,'')
 
// 只能输入英文字母和数字, 不能输入中文
this.value.replace(/[^\w\.\/]/ig,'')