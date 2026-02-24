System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, input, Input, UITransform, Vec2, Vec3, _dec, _class, _crd, ccclass, property, JoyStickManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      input = _cc.input;
      Input = _cc.Input;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6f6b9S2PJtMTIGDadmou77K", "JoyStickManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTouch', 'input', 'Input', 'Node', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 这是负责摇杆的设置 并且向外界暴露一个input输出值V2 以移动人物位置
       * 包括touchStart 要获取屏幕当前的位置 确定当前摇杆的位置，随手指移动的随动摇杆
       * TouchMove 要获取当前移动的位置 计算偏移量 显示摇杆移动 并且要限制摇杆在半径内移动
       * TouchEnd 要恢复摇杆的位置至00位置
       */

      _export("JoyStickManager", JoyStickManager = (_dec = ccclass('JoyStickManager'), _dec(_class = class JoyStickManager extends Component {
        constructor() {
          super(...arguments);
          this.Body = null;
          this.Stick = null;
          this.radius = 0;
          this.defaultPos = Vec3.ZERO;
          this._input = Vec2.ZERO;
        }

        //对外输出的输入向量
        get input() {
          return this._input;
        }

        set input(value) {
          this._input = value;
        }

        onLoad() {
          var _this$node, _this$Body;

          this.Body = (_this$node = this.node) == null ? void 0 : _this$node.getChildByName('Body');
          this.Stick = (_this$Body = this.Body) == null ? void 0 : _this$Body.getChildByName('Stick');
          this.radius = this.Body.getComponent(UITransform).width / 2; //!.断言 说是一定有这个值

          this.defaultPos = this.Body.getPosition();
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onTouchStart(event) {
          var _this$Body2;

          // console.log(event.getLocation()); 
          (_this$Body2 = this.Body) == null || _this$Body2.setPosition(event.getLocationX(), event.getLocationY(), 0); // console.log(event.getUILocation());  // Location on UI space
        }

        onTouchMove(event) {
          var _this$Stick;

          var offsetV2 = new Vec2(event.getLocationX() - this.Body.getPosition().x, event.getLocationY() - this.Body.getPosition().y);
          var len = offsetV2.length();

          if (len > this.radius) {
            offsetV2.multiplyScalar(this.radius / len);
          }

          (_this$Stick = this.Stick) == null || _this$Stick.setPosition(offsetV2.x, offsetV2.y, 0); //计算偏移量 这样小圆圈就能有随动的效果

          this.input = offsetV2.clone().normalize(); //对外输出的input是一个单位向量
        }

        onTouchEnd(event) {
          var _this$Stick2, _this$Body3;

          (_this$Stick2 = this.Stick) == null || _this$Stick2.setPosition(0, 0, 0);
          (_this$Body3 = this.Body) == null || _this$Body3.setPosition(this.defaultPos);
          this.input = Vec2.ZERO;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3e8435126cb42d4e5ac5c352770306faaab8f156.js.map