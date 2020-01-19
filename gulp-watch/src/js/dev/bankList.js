let bankListWrap = document.querySelector('.bank-list');
let amount = aspenLib.getQueryString('amount') || localStorage.getItem('amount') || '0';
class bankList {
    constructor() {
        let t = location.hostname;
        /^dev/.test(t) ? t = "dev." : /^test/.test(t) ? t = "test-" : /^pre/.test(t) ? t = "pre." : /^mall/.test(t) && (t = "");
        this.host = `${location.protocol}//${t}pay.juzifenqi.com${t != "test-" ? '/juzi-pay' : ''}`;
        this.getBankList();
    }
    getBankList() {
        let tips = document.querySelector('.tips');
        if (amount < 500 && amount > 0) {
            tips.innerHTML = `<p class="bank-tips">订单金额满${amount >= 100 ? '500' : amount < 100 ? '100' : ''}元，可以选择更多信用卡哦~</p>`;
        } else {
            tips.innerHTML = '';
        }
        aspenLib.ajax({
            url: `${this.host}/creditCard/supportList`,
            type: 'post',
            dataType: 'json',
            data: {
                application: 'shangcheng',
                amount: amount,
            },
            success: data => {
                if (data.code == '000000' && !!data.data.creditCardSupportList) {
                    let list = data.data.creditCardSupportList;
                    let listHtml = '';
                    for (let i of list) {
                        listHtml += `<li data-period="${i.supportPeriod[0]}" data-bankCodeId="${i.bankCodeId}"><i class="bank-icon"><img src="${i.backImg}" /></i><strong>${i.bankName || ''}  信用卡</strong><em>${i.supportPeriod.join('、')}期</em></li>`;
                    }
                    bankListWrap.innerHTML = listHtml;
                    this.bindEvent()
                } else {
                    aspenLib.tips(data.msg);
                }
            },
            error: () => {
                console.log('error');
            }
        });
    }
    bindEvent() {
        let li = bankListWrap.querySelectorAll('li');
        li.forEach(function (item) {
            item.addEventListener('click', function () {
                localStorage.setItem('bankCodeId', this.getAttribute('data-bankCodeId'));
                localStorage.setItem('backImg', this.querySelector('.bank-icon img').src);
                localStorage.setItem('bankName', this.querySelector('strong').innerText.split(' ')[0]);
                localStorage.setItem('period', this.getAttribute('data-period'));
                location.href = './selectStages.html?path=bankList';
            })
        })

    }
}
new bankList