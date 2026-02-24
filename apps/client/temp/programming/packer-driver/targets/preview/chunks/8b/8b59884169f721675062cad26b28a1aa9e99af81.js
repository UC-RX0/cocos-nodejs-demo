System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EntityManager, EntityStateEnum, ExplosionStateMachine, _dec, _class, _crd, ccclass, property, ExplosionManager;

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfExplosionStateMachine(extras) {
    _reporterNs.report("ExplosionStateMachine", "./ExplosionStateMachine", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      EntityManager = _unresolved_2.EntityManager;
    }, function (_unresolved_3) {
      EntityStateEnum = _unresolved_3.EntityStateEnum;
    }, function (_unresolved_4) {
      ExplosionStateMachine = _unresolved_4.ExplosionStateMachine;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e3db064tJHh7Z6tjwJim1h", "ExplosionManager", undefined);

      __checkObsolete__(['_decorator', 'instantiate', 'IVec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ExplosionManager", ExplosionManager = (_dec = ccclass('ExplosionManager'), _dec(_class = class ExplosionManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor() {
          super(...arguments);
          this.type = void 0;
        }

        /**
         * @description 初始化玩家信息
         * @param data 
         */
        init(type, _ref) {
          var {
            x,
            y
          } = _ref;
          this.type = type;
          this.node.setPosition(x, y);
          this.fsm = this.addComponent(_crd && ExplosionStateMachine === void 0 ? (_reportPossibleCrUseOfExplosionStateMachine({
            error: Error()
          }), ExplosionStateMachine) : ExplosionStateMachine); //添加状态机组件 多态

          this.fsm.init(type); //初始化状态机

          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle; //设置初始状态
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8b59884169f721675062cad26b28a1aa9e99af81.js.map