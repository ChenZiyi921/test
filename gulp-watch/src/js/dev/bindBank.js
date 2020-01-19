class bindBank {
    constructor() {
        let t = location.hostname;
        /^dev/.test(t) ? t = "dev." : /^test/.test(t) ? t = "test-" : /^pre/.test(t) ? t = "pre." : /^mall/.test(t) && (t = "");
        this.host = `${location.protocol}//${t}pay.juzifenqi.com${t != "test-" ? '/juzi-pay' : ''}`;
        this.jzHost = `${location.protocol}//${location.hostname}`;
        this.userId = localStorage.getItem('userId') || '';
        this.bankCodeId = localStorage.getItem('bankCodeId') || '';
        this.bankChannel = localStorage.getItem('bankChannel') || '';
        this.orderId = JZFQ.getQueryString('orderId') || localStorage.getItem('orderId') || '';
        this.bindEvent();
    }
    bindEvent() {
        let stagesBtn = document.getElementById('stagesBtn');
        stagesBtn.addEventListener('click', e => {
            let target = (e = e || window.event).target || e.srcElement;
            !/gray/.test(target.className) && /active/.test(checkbox.className) ?
                JZFQ.ajax({
                    url: `${this.host}/creditCard/confirmBind`,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        application: 'shangcheng',
                        customerId: this.userId,
                        bankCodeId: this.bankCodeId,
                        cardNo: cardNumber.value,
                        orderId: this.orderId,
                        bankChannel: this.bankChannel
                    },
                    success: data => {
                        if (data.code == '000000') {
                            let obj = data.data;

                        }
                        JZFQ.tips(data.msg);
                    },
                    error: () => console.log('error')
                }) : /active/.test(checkbox.className) || JZFQ.tips('请勾选协议')
        });
    }
}
new bindBank;