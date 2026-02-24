System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, EntityManager;

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "./StateMachine", _context.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2e4ee1T0blC75eqjQqNqSf3", "EntityManager", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * @description 实体状态机基类 凡是想要使用状态机的实体都需要继承这个类 中间连接状态机与实体
       * 
       */

      _export("EntityManager", EntityManager = (_dec = ccclass("EntityManager"), _dec(_class = class EntityManager extends Component {
        constructor(...args) {
          super(...args);
          this.fsm = void 0;
          this._state = void 0;
        }

        get state() {
          return this._state;
        }

        set state(newState) {
          this._state = newState;
          this.fsm.setParams(newState, true);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1b9a572ef49dc55bfa46a9d0b8694a515c169743.js.map