declare var aspenLib: any;

/**
 * 入口
 */
class Main {
    static dpr: number = window.devicePixelRatio; // 屏幕像素比
    static clientWidth: number = document.documentElement.clientWidth; // 屏幕宽度
    static token: string = aspenLib.getUrlValue('token') || localStorage.getItem('token') || '';
    static imei: string = aspenLib.getUrlValue('imei') || localStorage.getItem('imei') || '';
    /**
     * 750设计图尺寸转换为px单位
     * @param val 750设计稿尺寸
     */
    static transformPx(val: number): number {
        return (val / 750) * Main.clientWidth * Main.dpr;
    }
    /**
     * 生成一个随机整数
     * @param min 最小值
     * @param max 最大值
     */
    static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    /**
     * 图片预加载、缓存
     * @param urlList 图片 url 数据
     */
    static loadImages(urlList: Array<{ key: string, path: string, cache: boolean }>) {
        console.log(urlList);
        return new Promise((resolve, reject) => {
            let count = 0;
            // 遍历图片数组，加载所有图片，cache === true 时，缓存图片对象
            const len = urlList.length;
            let result = {};
            for (let i = 0; i < len; i++) {
                // 创建图片对象
                const image = new Image();
                // 成功的异步回调
                image.onload = () => {
                    if (urlList[i].cache === true) result[urlList[i].key] = image;
                    count++;
                    // 这里说明 整个图片数组arr里面的图片全都加载好了
                    if (~~count === ~~len) {
                        resolve(result);
                    }
                };
                image.onerror = e => {
                    reject('图片加载失败');
                };
                image.src = urlList[i].path;
            }
        });
    }
    /**
     * 检查登录状态
     */
    static checkLogin() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (true) {
                    resolve();
                } else {
                    reject()
                }
            }, 300)
        });
    }
    /**
     * 获取当前时间剩余机会
     */
    static getGrabTimes() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (true) {
                    let data: { times: number, date: number } = {
                        times: 1,
                        date: 5
                    }
                    resolve(data);
                } else {
                    reject()
                }
            }, 300)


        });
    }
    public imageResource: any;
    private currentPage: Page;
    constructor() {
        this.currentPage = new HomePage('home-page', this.changePage);
    }
    public init() {
        console.log(this.currentPage);
        this.currentPage.create();
    }
    private changePage = (e) => {
        console.log(e)
        this.currentPage.destroy();

        this.currentPage = new RainPage('rain-page');
        console.log(this.currentPage);
        this.currentPage.create();
    }
}
abstract class Page {
    public ele: HTMLElement;
    constructor(id: string) {
        this.ele = document.getElementById(id) as HTMLElement;
    }
    /**
     * 初始化页面
     */
    public abstract create(): void;
    /**
     * 销毁页面，清除定时器等任务
     */
    public abstract destroy(): void;

}

/**
 * 首页
 */
class HomePage extends Page {
    private startBtn: HTMLElement | null;
    private leaveEvent: Function | null;
    private timerDom: HTMLCollectionOf<Element> | null;
    private timer: number | null = null;
    private remainingTime: number = 0;
    private isStart: boolean;
    private noStartDom: HTMLElement | null;
    private closeBtns: NodeList | null;
    constructor(id: string, leaveEvent: Function) {
        super(id);
        this.startBtn = document.getElementById('start-btn') as HTMLElement;
        this.leaveEvent = leaveEvent;
        this.timerDom = document.getElementsByClassName('start-count-down');
        this.isStart = false;
        this.noStartDom = document.getElementById('no-start-dialog');
        this.closeBtns = document.querySelectorAll('#no-start-dialog .close-btn');
    }
    public create() {
        this.ele.style.display = 'block';
        this.getPageData();

    }
    public destroy() {
        this.startBtn && this.startBtn.removeEventListener('click', this.startEvent, false);
        this.ele.style.display = 'none';
        this.startBtn = null;
        this.leaveEvent = null;
        this.timerDom = null;
        this.timer && clearInterval(this.timer);
        this.noStartDom = null;
    }

    private startEvent = (): void => {
        Main.checkLogin()
            .then(() => {
                console.log('已登录');
                this.showRainPage();
            })
            .then(() => {
                console.log('未登录');
            });
    }
    private showRainPage(): void {
        console.log('showRainPage');
        if (this.isStart) {
            typeof this.leaveEvent === 'function' && this.leaveEvent('showRainPage');
        } else {
            this.noStartDom && (this.noStartDom.style.display = 'block');
            if (this.closeBtns === null) return;
            for (let i = 0; i < this.closeBtns.length; i++) {
                this.closeBtns[i].addEventListener('click', () => {
                    this.noStartDom && (this.noStartDom.style.display = 'none');
                }, false);
            }
        }

    }
    private getPageData(): void {
        Main.getGrabTimes().then((data: any) => {
            console.log(data)
            this.remainingTime = data.date;
            this.startTimer();


            this.startBtn && this.startBtn.addEventListener('click', this.startEvent, false);
        }).then(() => {

        })
    }
    private startTimer(): void {
        this.timer && clearInterval(this.timer);
        let runderDom = (timeNum: number): void => {
            //计算出小时数
            let hours: number = Math.floor(timeNum / (3600));
            //计算相差分钟数
            let residue_1: number = timeNum % (3600); //计算小时数后剩余的分钟数
            let minutes: number = Math.floor(residue_1 / (60));
            //计算相差秒数
            let seconds: number = residue_1 % (60); //计算分钟数后剩余的秒数
            const html = `
                            <span class="text">倒计时</span>
                            <span class="colon">:</span>
                            <span class="num">${hours > 9 ? hours : '0' + hours}</span>
                            <span class="colon">:</span>
                            <span class="num">${minutes > 9 ? minutes : '0' + minutes}</span>
                            <span class="colon">:</span>
                            <span class="num">${seconds > 9 ? seconds : '0' + seconds}</span>
                        `
            if (this.timerDom === null) return;
            for (let i = 0; i < this.timerDom.length; i++) {
                this.timerDom[i].innerHTML = html;
            }
        }
        runderDom(this.remainingTime);
        this.timer = setInterval(() => {
            console.log(this.remainingTime);
            if (this.remainingTime > 0) {
                this.remainingTime--;
                runderDom(this.remainingTime);
            } else {
                if (this.timerDom === null) return;
                for (let i = 0; i < this.timerDom.length; i++) {
                    this.timerDom[0].innerHTML = '';
                }
                this.isStart = true;
                this.noStartDom && (this.noStartDom.style.display = 'none');
                this.timer && clearInterval(this.timer);
            }
        }, 1000);
    }
}
class RainPage extends Page {
    static readonly noWinDom = document.getElementById(
        'no-win-dialog'
    ) as HTMLElement;
    static readonly winDom = document.getElementById('win-dialog') as HTMLElement;
    private readonly animateDom: HTMLElement;
    private readonly readyDom: HTMLElement;
    private readonly canvasParentDom: HTMLElement;
    constructor(id: string) {
        super(id);
        this.animateDom = document.getElementById('num-img') as HTMLElement;
        this.readyDom = document.getElementsByClassName(
            'ready-animation'
        )[0] as HTMLElement;
        this.canvasParentDom = document.getElementsByClassName(
            'arena-container'
        )[0] as HTMLElement;
    }
    public create() {
        this.ele.style.display = 'block';
        this.animateDom.addEventListener(
            'animationend',
            this.animationEndEvent.bind(this),
            false
        );
    }
    public destroy() {
        this.ele.style.display = 'none';
    }

    private animationEndEvent() {
        console.log('log at end of numImg animation', this);
        this.readyDom.style.display = 'none';
        this.canvasParentDom.style.display = 'block';
        const rainArena = new RainArena('rain-arena', mainPage.imageResource, 0);
        console.log(rainArena);
        rainArena.init();
    }
}
/**
 * 红包类
 */
class RedPacketItem {
    public position: string;
    public x: number;
    public y: number;
    public img: HTMLImageElement;
    public isHit: boolean;
    public readonly ySpeed: number;
    constructor(position: string, imgData: any) {
        let margin = Main.transformPx(imgData[position].width / 2);

        this.x =
            position === 'left'
                ? Main.random(margin, (Main.clientWidth / 2) * Main.dpr)
                : Main.random(
                    (Main.clientWidth / 2) * Main.dpr + margin,
                    Main.clientWidth * Main.dpr - margin
                );
        this.y = -margin * 2;
        this.isHit = false;
        this.ySpeed = Main.random(8, 20);
        this.position = position;
        this.img = imgData[position];
    }
}
/**
 * 红包雨容器类
 */
class RainArena {
    private readonly ele: HTMLCanvasElement;
    private readonly startTime: number;
    private readonly totalTime: number;
    private pushFlag: number;
    private readonly clientWidth: number;
    private readonly clientHeight: number;
    private readonly imageResource: any;
    private readonly width: number;
    private readonly height: number;
    private readonly grade: number; // 点击难度等级(0-1)
    private readonly ctx: CanvasRenderingContext2D;
    private redPacketList: Array<RedPacketItem>;
    private getNum: number;
    constructor(id: string, images: any, grade = 0) {
        this.ele = document.getElementById(id) as HTMLCanvasElement;
        this.startTime = new Date().getTime();
        this.totalTime = 10 * 1000;
        this.pushFlag = 0;
        this.clientWidth = this.ele.clientWidth;
        this.clientHeight = this.ele.clientHeight;
        this.imageResource = images;
        this.width = this.clientWidth * Main.dpr;
        this.height = this.clientHeight * Main.dpr;
        this.grade = (10 - grade) / 10;
        this.ele.setAttribute('width', this.width.toString()); // 设置画布宽度
        this.ele.setAttribute('height', this.height.toString()); // 设置画布高度
        this.ctx = this.ele.getContext('2d') as CanvasRenderingContext2D;
        this.redPacketList = [];
        this.getNum = 0;
    }
    public init() {
        let self = this;
        for (let i = 0; i < 6; i++) {
            this.redPacketList.push(
                new RedPacketItem(i % 2 === 0 ? 'left' : 'right', this.imageResource)
            );
        }
        this.draw();
        let positionFlag = true;
        function render() {
            self.draw();
            if (new Date().getTime() - self.startTime - self.pushFlag > 200) {
                self.redPacketList.push(
                    new RedPacketItem(positionFlag ? 'left' : 'right', self.imageResource)
                );
                positionFlag = !positionFlag;
                self.pushFlag = new Date().getTime() - self.startTime;
            }
            if (new Date().getTime() - self.startTime < self.totalTime) {
                window.requestAnimationFrame(render);

            } else {
                console.log('红包雨结束');
                if (self.getNum > 0) {
                    RainPage.winDom.style.display = 'block';
                } else {
                    RainPage.noWinDom.style.display = 'block';
                }
            }
        }
        window.requestAnimationFrame(render);

        // 绑定监听事件
        this.ele.addEventListener('click', this.computeClickResult.bind(this), false)
    }
    private draw() {
        // console.log(this.redPacketList.length);
        // 绘制前先清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);
        // 遍历红包实例列表，循环绘制每个红包实例
        this.redPacketList.forEach((item, index, array) => {
            // 根据当前红包实例的速度改变，改变位置
            array[index].y = item.y + item.ySpeed;
            this.ctx.drawImage(
                item.img,
                item.x - Main.transformPx(item.img.width / 2),
                item.y - Main.transformPx(item.img.height / 2),
                Main.transformPx(item.img.width),
                Main.transformPx(item.img.height)
            );
        });
        // 设置上方倒计时和红包个数文字样式
        this.ctx.fillStyle = '#d34e03';
        this.ctx.font = `normal normal bold ${Main.transformPx(26)}px Tahoma`;
        //绘制左上角倒计时
        this.ctx.drawImage(
            this.imageResource.button,
            Main.transformPx(26),
            Main.transformPx(30),
            Main.transformPx(192),
            Main.transformPx(66)
        );

        this.ctx.fillText(
            `倒计时: ${Math.ceil(
                (this.totalTime - (new Date().getTime() - this.startTime)) / 1000
            )}s`,
            Main.transformPx(48),
            Main.transformPx(70)
        );

        //绘制右上角获得红包个数
        this.ctx.drawImage(
            this.imageResource.button,
            this.width - Main.transformPx(26 + 192),
            Main.transformPx(30),
            Main.transformPx(192),
            Main.transformPx(66)
        );
        this.ctx.fillText(
            `已抢到: ${this.getNum > 9 ? this.getNum : '0' + this.getNum}`,
            this.width - Main.transformPx(192),
            Main.transformPx(70)
        );
        // 移除超出屏幕红包实例
        this.redPacketList = this.redPacketList.filter((item, index, array) => {
            return item.y < this.height * 1.2;
        });
    }
    private computeClickResult(e): void {
        console.log(this, e);
        let clientX = e.clientX * Main.dpr;
        let clientY = e.clientY * Main.dpr;
        console.log(clientX, clientY, this.redPacketList.length);
        // 每次点击画布倒序遍历红包实例列表，计算当前击中的是哪个红包（第一个符合要求的）
        for (let i = this.redPacketList.length - 1; i >= 0; i--) {
            const item = this.redPacketList[i];
            if (item.isHit) {
                continue;
            } else {
                if (
                    Math.abs(item.x - clientX) <
                    Main.transformPx(140 / 2) * this.grade &&
                    Math.abs(item.y - clientY) <
                    Main.transformPx(126 / 2) * this.grade
                ) {
                    item.isHit = true;
                    item.img = this.imageResource[item.position + '_hit'];
                    this.getNum++;
                    break;
                }
            }
        }
        console.log(this.redPacketList);

    }
}

const mainPage = new Main();
aspenLib.CreateLoading();
Main.loadImages([
    {
        key: 'ready_num_1',
        path: 'images/rain_page/ready_status/num_1.png',
        cache: false
    },
    {
        key: 'ready_num_2',
        path: 'images/rain_page/ready_status/num_2.png',
        cache: false
    },
    {
        key: 'ready_num_3',
        path: 'images/rain_page/ready_status/num_3.png',
        cache: false
    },
    {
        key: 'button',
        path: 'images/rain_page/red_packet/button_img.png',
        cache: true
    },
    {
        key: 'left',
        path: 'images/rain_page/red_packet/left.png',
        cache: true
    },
    {
        key: 'left_hit',
        path: 'images/rain_page/red_packet/left_hit.png',
        cache: true
    },
    {
        key: 'right',
        path: 'images/rain_page/red_packet/right.png',
        cache: true
    },
    {
        key: 'right_hit',
        path: 'images/rain_page/red_packet/right_hit.png',
        cache: true
    }
])
    .then(data => {
        mainPage.imageResource = data;
        console.log(mainPage);
        mainPage.init();
        aspenLib.RemoveLoading();
    })
    .catch(error => {
        console.log(error);
        aspenLib.RemoveLoading();
    });
