System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, FsmParamTypeEnum, _dec, _class, _crd, ccclass, getInitParamsTrigger, getInitParamsNumber, StateMachine;

  function _reportPossibleCrUseOfFsmParamTypeEnum(extras) {
    _reporterNs.report("FsmParamTypeEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfState(extras) {
    _reporterNs.report("State", "./State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSubStateMachine(extras) {
    _reporterNs.report("SubStateMachine", "./SubStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      FsmParamTypeEnum = _unresolved_2.FsmParamTypeEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "665381FD89O0o5HoKaI3a88", "StateMachine", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component']);

      ({
        ccclass
      } = _decorator); //联合类型用作状态的转换

      //定义了translate 的形态
      _export("getInitParamsTrigger", getInitParamsTrigger = () => {
        return {
          type: (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
            error: Error()
          }), FsmParamTypeEnum) : FsmParamTypeEnum).Trigger,
          value: false
        };
      });

      _export("getInitParamsNumber", getInitParamsNumber = () => {
        return {
          type: (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
            error: Error()
          }), FsmParamTypeEnum) : FsmParamTypeEnum).Number,
          value: 0
        };
      });
      /***
      * 流动图
      * 1.entity的state或者direction改变触发setter
      * 2.setter里触发fsm的setParams方法
       * 3.setParams执行run方法（run方法由子类重写）
       * 4.run方法会更改currentState，然后触发currentState的setter
      * 5-1.如果currentState是子状态机，继续执行他的run方法，run方法又会设置子状态机的currentState，触发子状态run方法
      * 5-2.如果是子状态，run方法就是播放动画
      */
      //混合树 状态机 子状态机 translate   状态机与状态机之间存在转换 状态机与子状态机也存在转换

      /***
       * 有限状态机基类 状态机之间的总处理中心 根据状态机的名字调用对应的状态机
       */


      _export("default", StateMachine = (_dec = ccclass("StateMachine"), _dec(_class = class StateMachine extends Component {
        constructor() {
          super(...arguments);

          /***
             * 当前状态 
             */
          this._currentState = null;
          this.params = new Map();
          //用于存储转换条件
          this.stateMachines = new Map();
          //用于存储状态机和对应方向的子状态机
          this.animationComponent = void 0;
          this.type = void 0;
        }

        //是谁的状态机在做
        getParams(paramName) {
          if (this.params.has(paramName)) {
            return this.params.get(paramName).value;
          }
        }

        setParams(paramName, value) {
          if (this.params.has(paramName)) {
            //设置状态机之间的translate的值 根据名字和类型调整状态机与状态机之间的转换
            this.params.get(paramName).value = value; //执行状态机

            this.run(); //状态机之间如果是双向的 应该是前往下一个状态之后(执行完当前状态机所对应的动画)返回到上一个状态机
            //即使是初始状态start 与idle 之间也是无限触发状态才对 只是每次播放完idle动画 回到start状态后 都会再次回到idle状态机中

            this.resetTrigger();
          } else {
            console.error("\u72B6\u6001\u673A" + this.type + "\u4E2D\u4E0D\u5B58\u5728\u53C2\u6570" + paramName);
            return;
          }
        }

        get currentState() {
          return this._currentState;
        }

        set currentState(newState) {
          if (!newState) {
            return;
          }

          this._currentState = newState;

          this._currentState.run();
        }
        /***
         * 清空所有trigger
         */


        resetTrigger() {
          for (var [, value] of this.params) {
            if (value.type === (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
              error: Error()
            }), FsmParamTypeEnum) : FsmParamTypeEnum).Trigger) {
              value.value = false;
            }
          }
        }
        /***
         * 由子类重写，方法目标是根据当前状态和参数修改currentState
         */


      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6fafba7177bbe6d8057e382fda951022d4a4c647.js.map