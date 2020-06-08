
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
}

function random(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
}

class DragController {
    constructor() {
        this.circles = [];
        this.canvas;
        this.context;
        this.previousSelectedCircle;
        this.isDragging = false;

        window.onload = () => {
            this.canvas = document.getElementById("dragCanvas");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context = this.canvas.getContext("2d");

            this.canvas.onmousedown = this.canvasClick.bind(this);
            this.canvas.onmouseup = this.stopDragging.bind(this);
            this.canvas.onmouseout = this.stopDragging.bind(this);
            this.canvas.onmousemove = this.dragCircle.bind(this);
        };
    }
    addNode(radius, color) {
        let [x, y] = [random(0, this.canvas.width), random(0, this.canvas.height)];
        let circle = new Circle(x, y, radius, color);

        this.circles.push(circle);
        console.log(this.circles)
        this.drawCircles();
    }
    clearCanvas() {
        console.log(JSON.stringify(this.circles))
        this.circles = [];
        this.drawCircles();
    }
    drawCircles() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.circles.length; i++) {
            let circle = this.circles[i];
            this.context.globalAlpha = 0.85;
            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            this.context.fillStyle = circle.color;
            this.context.fill();
            this.context.stroke();
        }
    }
    canvasClick(e) {
        // debugger
        // 取得画布上被单击的点
        let clickX = e.pageX - this.canvas.offsetLeft;
        let clickY = e.pageY - this.canvas.offsetTop;

        // 查找被单击的圆圈
        for (let i = this.circles.length - 1; i >= 0; i--) {
            let circle = this.circles[i];
            //使用勾股定理计算这个点与圆心之间的距离
            let distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
            // 判断这个点是否在圆圈中
            if (distanceFromCenter <= circle.radius) {
                // 清除之前选择的圆圈
                if (this.previousSelectedCircle != null) this.previousSelectedCircle.isSelected = false;
                this.previousSelectedCircle = circle;

                //选择新圆圈
                circle.isSelected = true;

                // 使圆圈允许拖拽
                this.isDragging = true;

                this.drawCircles();
                console.log(circle)
                return
            }
        }
    }
    dragCircle(e) {
        // 判断圆圈是否开始拖拽
        if (this.isDragging == true) {
            // 判断拖拽对象是否存在
            if (this.previousSelectedCircle != null) {
                // 取得鼠标位置
                let x = e.pageX - this.canvas.offsetLeft;
                let y = e.pageY - this.canvas.offsetTop;

                // 将圆圈移动到鼠标位置
                this.previousSelectedCircle.x = x;
                this.previousSelectedCircle.y = y;

                this.drawCircles();
            }
        }
    }
    stopDragging() {
        this.isDragging = false;
    }
}
