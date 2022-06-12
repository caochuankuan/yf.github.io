class Firework {
    constructor(x, y) {//x,y鼠标的位置
        this.x = x;//将水平位置赋值给this.x属性。
        this.y = y;//将垂直位置赋值给this.y属性。
        this.ch = document.documentElement.clientHeight;//可视区的高度
    }
    init() {
        //1.创建烟花节点。
        this.firebox = document.createElement('div');
        this.firebox.style.cssText = `width:5px;height:5px;background:#fff;position:absolute;left:${this.x}px;top:${this.ch}px;`;
        document.body.appendChild(this.firebox);
        this.firemove();//创建完成，直接运动。
    }
    //2.烟花节点运动
    firemove() {
        bufferMove(this.firebox, { top: this.y }, () => {
            document.body.removeChild(this.firebox);
            //当烟花节点消失的时候，创建烟花碎片
            this.createfires()
        });
    }
    //3.当前鼠标点击的位置，随机产生30-60个盒子。(随机颜色)
    createfires() {
        for (let i = 1; i <= this.rannum(30, 60); i++) {
            this.fires = document.createElement('div');
            this.fires.style.cssText = `width:5px;height:5px;background:rgb(${this.rannum(0, 255)},${this.rannum(0, 255)},${this.rannum(0, 255)});position:absolute;left:${this.x}px;top:${this.y}px;`;
            document.body.appendChild(this.fires);
            this.fireboom(this.fires);//设计成一个一个运动，等到循环结束，出现整体结果。
        }
    }
    //4.烟花碎片运动。
    fireboom(obj) {
        //存储当前obj的初始值。
        let initx = this.x;
        let inity = this.y;

        //随机产生速度(水平和垂直方向都是随机的,符号也是随机的)。
        let speedx = parseInt((Math.random() > 0.5 ? '-' : '') + this.rannum(1, 15));
        let speedy = parseInt((Math.random() > 0.5 ? '-' : '') + this.rannum(1, 15));

        obj.timer = setInterval(() => {
            initx += speedx;
            inity += speedy++; //模拟重力加速度(垂直方向比水平方向快一些)
            if (inity >= this.ch) {
                document.body.removeChild(obj);
                clearInterval(obj.timer);
            }
            obj.style.left = initx + 'px';
            obj.style.top = inity + 'px';
        }, 1000 / 60);

    }
    //随机区间数
    rannum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}


document.onclick = function (ev) {
    var ev = ev || window.event;
    //ev.clientX,ev.clientY//获取的鼠标的位置
    new Firework(ev.clientX, ev.clientY).init();
}