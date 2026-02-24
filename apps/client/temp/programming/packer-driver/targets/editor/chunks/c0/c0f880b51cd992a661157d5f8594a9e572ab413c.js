System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, AnimationClip, EntityStateEnum, ParamsNameEnum, StateMachine, getInitParamsTrigger, State, _dec, _class, _crd, ccclass, property, BulletStateMachine;

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfParamsNameEnum(extras) {
    _reporterNs.report("ParamsNameEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "../../Base/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetInitParamsTrigger(extras) {
    _reporterNs.report("getInitParamsTrigger", "../../Base/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfState(extras) {
    _reporterNs.report("State", "../../Base/State", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      AnimationClip = _cc.AnimationClip;
    }, function (_unresolved_2) {
      EntityStateEnum = _unresolved_2.EntityStateEnum;
      ParamsNameEnum = _unresolved_2.ParamsNameEnum;
    }, function (_unresolved_3) {
      StateMachine = _unresolved_3.default;
      getInitParamsTrigger = _unresolved_3.getInitParamsTrigger;
    }, function (_unresolved_4) {
      State = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0c702poTN1LVpg10cN5wbuv", "BulletStateMachine", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'AnimationClip']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * @description 玩家状态机
       * 自己的理解:ActorStateMachine就是玩家自己的状态机, 凡是想使用动画系统的
       * 都必须在原有的UI控件基础上附带这个状态机信息 这个状态机系统的设定是使用了类混合树(不确定)
       * 就像创建动画系统一样 设置触发条件(Parames 状态名称 类型 数值) 设置状态机(StateMachine 总系统)
       * 子系统共有两个节点  子状态机(SubstateMachine 子系统附属于StateMachine)可包含state  state(子系统附属于SubstateMachine和stateMachine)
       * 可以理解为 单一状态机就设置为state 多状态就设置为SubstateMachine(含有state) 故我称之为类混合树
       * 其触发条件十分简单 首先是需要设置好状态机(参数 state substatemachine) 通过setParams
       * 触发总状态机 stateMachine的run方法 修改currentState选择当前状态机(state 或者是 subStateMachine 接着传递到state)
       * 来进行run方法(state为最终承接者) state采用对象轨道(改变对象的属性值)来完成动画系统
       * 
       *
       */

      _export("BulletStateMachine", BulletStateMachine = (_dec = ccclass('BulletStateMachine'), _dec(_class = class BulletStateMachine extends (_crd && StateMachine === void 0 ? (_reportPossibleCrUseOfStateMachine({
        error: Error()
      }), StateMachine) : StateMachine) {
        init(type) {
          this.type = type;
          this.animationComponent = this.node.addComponent(Animation);
          this.initParams();
          this.initStateMachines();
          this.initAnimationEvent();
        }

        initParams() {
          this.params.set((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
            error: Error()
          }), ParamsNameEnum) : ParamsNameEnum).Idle, (_crd && getInitParamsTrigger === void 0 ? (_reportPossibleCrUseOfgetInitParamsTrigger({
            error: Error()
          }), getInitParamsTrigger) : getInitParamsTrigger)());
        }

        initStateMachines() {
          this.stateMachines.set((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
            error: Error()
          }), ParamsNameEnum) : ParamsNameEnum).Idle, new (_crd && State === void 0 ? (_reportPossibleCrUseOfState({
            error: Error()
          }), State) : State)(this, `${this.type}${(_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle}`, AnimationClip.WrapMode.Loop));
        }

        initAnimationEvent() {}

        run() {
          switch (this.currentState) {
            case this.stateMachines.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
              error: Error()
            }), ParamsNameEnum) : ParamsNameEnum).Idle):
            default:
              this.currentState = this.stateMachines.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
                error: Error()
              }), ParamsNameEnum) : ParamsNameEnum).Idle);
              break;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c0f880b51cd992a661157d5f8594a9e572ab413c.js.map