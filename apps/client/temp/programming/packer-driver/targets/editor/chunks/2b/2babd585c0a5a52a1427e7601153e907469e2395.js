System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, ProgressBar, Tween, Vec3, DataManager, MAX_HP, EntityTypeEnum, InputTypeEnum, EntityManager, ActorStateMachine, EntityStateEnum, EventEnum, WeaponManager, rad2Angle, EventManager, _dec, _class, _crd, ccclass, property, ActorManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMAX_HP(extras) {
    _reporterNs.report("MAX_HP", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common", _context.meta, extras);
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

  function _reportPossibleCrUseOfActorStateMachine(extras) {
    _reporterNs.report("ActorStateMachine", "./ActorStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponManager(extras) {
    _reporterNs.report("WeaponManager", "../Weapon/WeaponManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrad2Angle(extras) {
    _reporterNs.report("rad2Angle", "../../Utils", _context.meta, extras);
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
      instantiate = _cc.instantiate;
      ProgressBar = _cc.ProgressBar;
      Tween = _cc.Tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
      MAX_HP = _unresolved_2.MAX_HP;
    }, function (_unresolved_3) {
      EntityTypeEnum = _unresolved_3.EntityTypeEnum;
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      ActorStateMachine = _unresolved_5.ActorStateMachine;
    }, function (_unresolved_6) {
      EntityStateEnum = _unresolved_6.EntityStateEnum;
      EventEnum = _unresolved_6.EventEnum;
    }, function (_unresolved_7) {
      WeaponManager = _unresolved_7.WeaponManager;
    }, function (_unresolved_8) {
      rad2Angle = _unresolved_8.rad2Angle;
    }, function (_unresolved_9) {
      EventManager = _unresolved_9.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5adcbbxvI9Feahwxw4WOX6Y", "ActorManager", undefined);

      __checkObsolete__(['_decorator', 'instantiate', 'Node', 'ProgressBar', 'Sprite', 'Color', 'Tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ActorManager", ActorManager = (_dec = ccclass('ActorManager'), _dec(_class = class ActorManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor(...args) {
          super(...args);
          this.wm = void 0;
          this.bulletType = void 0;
          this.id = void 0;
          this.hpBar = void 0;
          this.targetPos = undefined;
          this.tw = void 0;
        }

        /**
         * @description 初始化玩家信息
         * @param data 
         */
        init(data) {
          this.node.active = false;
          this.id = data.id;
          this.bulletType = data.bulletType;
          this.fsm = this.addComponent(_crd && ActorStateMachine === void 0 ? (_reportPossibleCrUseOfActorStateMachine({
            error: Error()
          }), ActorStateMachine) : ActorStateMachine); //添加状态机组件 多态

          this.fsm.init(data.Type); //初始化状态机

          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle; //设置初始状态

          this.hpBar = this.node.getChildByName('Hp').getComponent(ProgressBar);
          const weaponPrefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Weapon1);

          if (weaponPrefab) {
            const weaponNode = instantiate(weaponPrefab);
            weaponNode.parent = this.node;
            weaponNode.setPosition(0, 0);
            this.wm = weaponNode.addComponent(_crd && WeaponManager === void 0 ? (_reportPossibleCrUseOfWeaponManager({
              error: Error()
            }), WeaponManager) : WeaponManager);
            this.wm.init(data);
          }
        }

        tick(dt) {
          if (this.id !== (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.playerID) return; //不是当前玩家 不处理

          const {
            x,
            y
          } = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm.input;

          if ((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm.input.length()) {
            (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
              error: Error()
            }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
              error: Error()
            }), EventEnum) : EventEnum).ClientSync, {
              id: (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.playerID,
              type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
                error: Error()
              }), InputTypeEnum) : InputTypeEnum).ActorMove,
              direction: {
                x: x,
                y: y
              },
              dt
            });
          } else {
            this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
              error: Error()
            }), EntityStateEnum) : EntityStateEnum).Idle;
          }
        }
        /**
         * @description 渲染玩家信息
         * @param data 
         */


        render(data) {
          this.renderPosition(data);
          this.renderAngle(data);
          this.renderHp(data);
        }

        renderPosition(data) {
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
            this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
              error: Error()
            }), EntityStateEnum) : EntityStateEnum).Run;
            this.tw = new Tween(this.node).to(0.1, {
              position: this.targetPos
            }).call(() => {
              this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
                error: Error()
              }), EntityStateEnum) : EntityStateEnum).Idle;
            }).start();
          }
        }

        renderAngle(data) {
          const {
            direction
          } = data;

          if (direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
            this.hpBar.node.setScale(direction.x > 0 ? 1 : -1, 1);
          }

          const side = Math.sign(direction.x ** 2 + direction.y ** 2);
          const angle = (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(Math.asin(direction.y / side));
          this.wm.node.setRotationFromEuler(0, 0, angle);
        }

        renderHp(data) {
          this.hpBar.progress = data.hp / (_crd && MAX_HP === void 0 ? (_reportPossibleCrUseOfMAX_HP({
            error: Error()
          }), MAX_HP) : MAX_HP);

          if (data.hp <= 0) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.delete(this.id);
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.state.actor.splice((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.state.actor.findIndex(a => a.id === this.id), 1);
            this.node.destroy();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2babd585c0a5a52a1427e7601153e907469e2395.js.map