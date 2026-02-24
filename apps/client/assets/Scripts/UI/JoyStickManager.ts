import { _decorator, Component, EventTouch, input, Input, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
/**
 * 这是负责摇杆的设置 并且向外界暴露一个input输出值V2 以移动人物位置
 * 包括touchStart 要获取屏幕当前的位置 确定当前摇杆的位置，随手指移动的随动摇杆
 * TouchMove 要获取当前移动的位置 计算偏移量 显示摇杆移动 并且要限制摇杆在半径内移动
 * TouchEnd 要恢复摇杆的位置至00位置
 */
@ccclass('JoyStickManager')
export class JoyStickManager extends Component {
    private Body: Node | null = null;
    private Stick: Node | null = null;
    private radius: number =0;
    private defaultPos = Vec3.ZERO;
    private _input: Vec2 = Vec2.ZERO; //对外输出的输入向量
    public get input(): Vec2 {
        return this._input;
    }
    public set input(value: Vec2) {
        this._input = value;
    }
    onLoad () {
        this.Body = this.node?.getChildByName('Body');
        this.Stick = this.Body?.getChildByName('Stick');
        this.radius = this.Body!.getComponent(UITransform).width / 2;//!.断言 说是一定有这个值
        this.defaultPos = this.Body!.getPosition();
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        // console.log(event.getLocation()); 
        this.Body?.setPosition(event.getLocationX(), event.getLocationY(), 0);
        // console.log(event.getUILocation());  // Location on UI space
        
    }
    onTouchMove(event: EventTouch) {
        const offsetV2:Vec2 = new Vec2(event.getLocationX() - this.Body!.getPosition().x, event.getLocationY() - this.Body!.getPosition().y);
        const len = offsetV2.length();
        if (len > this.radius) {
            offsetV2.multiplyScalar(this.radius / len);
        }
        this.Stick?.setPosition(offsetV2.x, offsetV2.y, 0);//计算偏移量 这样小圆圈就能有随动的效果
        this.input = offsetV2.clone().normalize();//对外输出的input是一个单位向量
    }
    onTouchEnd(event: EventTouch) {
        this.Stick?.setPosition(0, 0, 0);
        this.Body?.setPosition(this.defaultPos);
        this.input = Vec2.ZERO;
    }
}


