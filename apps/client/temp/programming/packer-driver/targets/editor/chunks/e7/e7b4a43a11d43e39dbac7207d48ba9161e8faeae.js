System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, ExplosionManager, _decorator, Vec3, Tween, DataManager, EntityTypeEnum, EntityManager, EntityStateEnum, EventEnum, rad2Angle, BulletStateMachine, EventManager, ObjectPoolManager, _dec, _class, _crd, ccclass, property, BulletManager;

  function _reportPossibleCrUseOfExplosionManager(extras) {
    _reporterNs.report("ExplosionManager", "./../Explosion/ExplosionManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../../Common", _context.meta, extras);
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

  function _reportPossibleCrUseOfrad2Angle(extras) {
    _reporterNs.report("rad2Angle", "../../Utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletStateMachine(extras) {
    _reporterNs.report("BulletStateMachine", "./BulletStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../../Global/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectPoolManager(extras) {
    _reporterNs.report("ObjectPoolManager", "../../Global/ObjectPoolManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Vec3 = _cc.Vec3;
      Tween = _cc.Tween;
    }, function (_unresolved_2) {
      ExplosionManager = _unresolved_2.ExplosionManager;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.default;
    }, function (_unresolved_4) {
      EntityTypeEnum = _unresolved_4.EntityTypeEnum;
    }, function (_unresolved_5) {
      EntityManager = _unresolved_5.EntityManager;
    }, function (_unresolved_6) {
      EntityStateEnum = _unresolved_6.EntityStateEnum;
      EventEnum = _unresolved_6.EventEnum;
    }, function (_unresolved_7) {
      rad2Angle = _unresolved_7.rad2Angle;
    }, function (_unresolved_8) {
      BulletStateMachine = _unresolved_8.BulletStateMachine;
    }, function (_unresolved_9) {
      EventManager = _unresolved_9.default;
    }, function (_unresolved_10) {
      ObjectPoolManager = _unresolved_10.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d5133DzwCxOdK8aZF47KU7T", "BulletManager", undefined);

      __checkObsolete__(['_decorator', 'instantiate', 'IVec2', 'input', 'Vec3', 'Tween', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BulletManager", BulletManager = (_dec = ccclass('BulletManager'), _dec(_class = class BulletManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor(...args) {
          super(...args);
          this.bulletType = void 0;
          this.id = void 0;
          this.targetPos = undefined;
          this.tw = void 0;
        }

        /**
         * @description 初始化玩家信息
         * @param data 
         */
        init(data) {
          this.bulletType = data.bulletType;
          this.id = data.id;
          this.fsm = this.addComponent(_crd && BulletStateMachine === void 0 ? (_reportPossibleCrUseOfBulletStateMachine({
            error: Error()
          }), BulletStateMachine) : BulletStateMachine); //添加状态机组件 多态

          this.fsm.init(data.bulletType); //初始化状态机

          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle; //设置初始状态

          this.node.active = false;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).ExplosionBorn, this.handleExplosionBorn, this);
        }

        handleExplosionBorn(id, {
          x,
          y
        }) {
          if (id !== this.id) return; //确定子弹的ID是唯一的 逻辑上是 如果前面的子弹不销毁时 后续子弹不会对未销毁的子弹有影响 确保唯一性

          const explosion = (_crd && ObjectPoolManager === void 0 ? (_reportPossibleCrUseOfObjectPoolManager({
            error: Error()
          }), ObjectPoolManager) : ObjectPoolManager).Instance.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Explosion);
          const em = explosion.getComponent(_crd && ExplosionManager === void 0 ? (_reportPossibleCrUseOfExplosionManager({
            error: Error()
          }), ExplosionManager) : ExplosionManager) || explosion.addComponent(_crd && ExplosionManager === void 0 ? (_reportPossibleCrUseOfExplosionManager({
            error: Error()
          }), ExplosionManager) : ExplosionManager);
          em.init((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Explosion, {
            x,
            y
          });
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.bulletMap.delete(this.id);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).ExplosionBorn, this.handleExplosionBorn, this);
          (_crd && ObjectPoolManager === void 0 ? (_reportPossibleCrUseOfObjectPoolManager({
            error: Error()
          }), ObjectPoolManager) : ObjectPoolManager).Instance.ret(this.node);
        }

        tick(dt) {//todo
        }
        /**
         * @description 渲染子弹信息
         * @param data 
         */


        render(data) {
          this.renderPos(data);
          this.renderAngle(data);
        }

        renderPos(data) {
          const {
            position
          } = data;
          const newPos = new Vec3(position.x, position.y);

          if (!this.targetPos) {
            this.node.active = true;
            this.node.setPosition(newPos);
            this.targetPos = new Vec3(newPos);
          } else if (!this.targetPos.equals(newPos)) {
            var _this$tw;

            (_this$tw = this.tw) == null || _this$tw.stop();
            this.node.setPosition(this.targetPos);
            this.targetPos.set(newPos);
            this.tw = new Tween(this.node).to(0.1, {
              position: this.targetPos
            }).start();
          }
        }

        renderAngle(data) {
          const {
            direction
          } = data;
          const side = Math.sign(direction.x ** 2 + direction.y ** 2);
          const angle = direction.x > 0 ? (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(Math.asin(direction.y / side)) : (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(Math.asin(-direction.y / side)) + 180;
          this.node.setRotationFromEuler(0, 0, angle);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e7b4a43a11d43e39dbac7207d48ba9161e8faeae.js.map