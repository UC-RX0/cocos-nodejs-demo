System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, UITransform, Vec2, DataManager, InputTypeEnum, EntityManager, EntityStateEnum, EventEnum, WeaponStateMachine, EventManager, _dec, _class, _crd, ccclass, property, WeaponManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIActor(extras) {
    _reporterNs.report("IActor", "../../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponStateMachine(extras) {
    _reporterNs.report("WeaponStateMachine", "./WeaponStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../../Global/EventManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      EntityStateEnum = _unresolved_5.EntityStateEnum;
      EventEnum = _unresolved_5.EventEnum;
    }, function (_unresolved_6) {
      WeaponStateMachine = _unresolved_6.WeaponStateMachine;
    }, function (_unresolved_7) {
      EventManager = _unresolved_7.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1f765dI1xxATaY81iOLlQHV", "WeaponManager", undefined);

      __checkObsolete__(['_decorator', 'director', 'Node', 'UITransform', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WeaponManager", WeaponManager = (_dec = ccclass('WeaponManager'), _dec(_class = class WeaponManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor() {
          super(...arguments);
          this.body = void 0;
          this.anchor = void 0;
          this.point = void 0;
          this.owner = void 0;
        }

        /**
         * @description 初始化武器信息
         * @param data 
         */
        init(data) {
          this.owner = data.id;
          this.body = this.node.getChildByName('Body');
          this.anchor = this.body.getChildByName('Anchor');
          this.point = this.anchor.getChildByName('Point');
          this.fsm = this.body.addComponent(_crd && WeaponStateMachine === void 0 ? (_reportPossibleCrUseOfWeaponStateMachine({
            error: Error()
          }), WeaponStateMachine) : WeaponStateMachine); //添加状态机组件 多态

          this.fsm.init(data.weaponType); //初始化状态机

          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle; //设置初始状态

          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).WeaponShoot, this.handleShoot, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).BulletBorn, this.handleBulletBorn, this);
        }

        handleBulletBorn(owner) {
          if (owner !== this.owner) return;
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Attack;
        }

        handleShoot() {
          if (this.owner !== (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.playerID) return; //不是当前玩家 不处理
          //将point 的世界坐标位置转化到Stage节点坐标 对其生成位置

          var pointPos = this.point.worldPosition;
          var stagePos = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointPos);
          var anchorPos = this.anchor.worldPosition;
          var direction = new Vec2(pointPos.x - anchorPos.x, pointPos.y - anchorPos.y);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).ClientSync, {
            owner: this.owner,
            type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).WeaponShoot,
            position: {
              x: stagePos.x,
              y: stagePos.y
            },
            direction: direction.normalize()
          });
          console.log((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.bullets);
        }

        onDestroy() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).WeaponShoot, this.handleShoot, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).BulletBorn, this.handleBulletBorn, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ea665854e5afeafee769f42ed8e1cd41a69f01e2.js.map