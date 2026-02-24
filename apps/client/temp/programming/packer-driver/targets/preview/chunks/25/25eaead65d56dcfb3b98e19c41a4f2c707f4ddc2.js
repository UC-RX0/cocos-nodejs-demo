System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, InputTypeEnum, EventManager, EventEnum, DataManager, _crd, MOVE_SPEED, BULLET_SPEED, MAP_WIDTH, MAP_HEIGHT, PLAYER_RADIUS, BULLET_RADIUS, ATTACK, MAX_HP;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientInput(extras) {
    _reporterNs.report("clientInput", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIroom(extras) {
    _reporterNs.report("Iroom", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIstate(extras) {
    _reporterNs.report("Istate", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorManager(extras) {
    _reporterNs.report("ActorManager", "../Entity/Actor/ActorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletManager(extras) {
    _reporterNs.report("BulletManager", "../Entity/Bullet/BulletManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "./EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../Enum", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EventManager = _unresolved_4.default;
    }, function (_unresolved_5) {
      EventEnum = _unresolved_5.EventEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1682e0WTk9Gs4rKkrrs0wud", "DataManager", undefined);

      __checkObsolete__(['input', 'director', 'Prefab', 'SpriteFrame', 'Node']);

      MOVE_SPEED = 150;
      BULLET_SPEED = 600;
      MAP_WIDTH = 960;
      MAP_HEIGHT = 640;
      PLAYER_RADIUS = 60;
      BULLET_RADIUS = 10;
      ATTACK = 5;

      _export("MAX_HP", MAX_HP = 100);

      _export("default", DataManager = class DataManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this.frameID = 1;
          this.roomInfo = void 0;
          this.lasteState = void 0;
          this._stage = null;
          this._actorMap = new Map();
          // key:actorID value:ActorManager实例
          this._prefabMap = new Map();
          // key:资源路径 value:Prefab实例
          this._textureMap = new Map();
          // key:资源路径 value:SpriteFrame实例数组
          this._bulletMap = new Map();
          // key:bulletID value:BulletManager实例
          this.playerID = 1;
          this._jm = void 0;
          //记录当前游戏中的所有玩家信息
          this.state = {
            actor: [// {
              //   id: 1,
              //   position: { x: -150, y: -150 },
              //   direction: { x: 1, y: 0 },
              //   Type: EntityTypeEnum.Actor1,
              //   weaponType: EntityTypeEnum.Weapon1,
              //   bulletType: EntityTypeEnum.Bullet2,
              //   hp: 100
              // },
              // {
              //   id: 2,
              //   position: { x: 150, y: 150 },
              //   direction: { x: -1, y: 0 },
              //   Type: EntityTypeEnum.Actor1,
              //   weaponType: EntityTypeEnum.Weapon1,
              //   bulletType: EntityTypeEnum.Bullet2,
              //   hp: 100
              // },
            ],
            bullets: [],
            nextBulletID: 1
          };
        }

        static get Instance() {
          return super.GetInstance();
        }

        //当前玩家ID
        get bulletMap() {
          return this._bulletMap;
        }

        setBulletManager(key, value) {
          this._bulletMap.set(key, value);
        }

        get stage() {
          return this._stage;
        }

        set stage(value) {
          this._stage = value;
        }

        get textureMap() {
          return this._textureMap;
        }

        setTextureMap(key, value) {
          this._textureMap.set(key, value);
        }

        get prefabMap() {
          return this._prefabMap;
        }

        setprefabMap(key, value) {
          this._prefabMap.set(key, value);
        }

        get jm() {
          return this._jm;
        }

        set jm(value) {
          this._jm = value;
        }

        get actorMap() {
          return this._actorMap;
        }

        setActorManager(id, actor) {
          this._actorMap.set(id, actor);
        }

        /**
         * @description 
         * @param input 
         */
        applyInput(input) {
          switch (input.type) {
            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).ActorMove:
              {
                var {
                  id,
                  direction: {
                    x,
                    y
                  },
                  dt
                } = input; //找到包里的需要修改的玩家ID 然后修改位置和方向

                var actor = this.state.actor.find(v => v.id === id);

                if (actor) {
                  actor.direction.x = x;
                  actor.direction.y = y;
                  var length = Math.sqrt(x * x + y * y);

                  if (length > 0) {
                    actor.position.x += x / length * MOVE_SPEED * dt;
                    actor.position.y += y / length * MOVE_SPEED * dt;
                  }
                }

                break;
              }

            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).WeaponShoot:
              {
                var _this$actorMap$get;

                var {
                  owner,
                  position: {
                    x: _x,
                    y: _y
                  },
                  direction: {
                    x: dx,
                    y: dy
                  }
                } = input;
                var bullet = {
                  id: this.state.nextBulletID++,
                  owner,
                  position: {
                    x: _x,
                    y: _y
                  },
                  direction: {
                    x: dx,
                    y: dy
                  },
                  bulletType: (_this$actorMap$get = this.actorMap.get(owner)) == null ? void 0 : _this$actorMap$get.bulletType
                };
                (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                  error: Error()
                }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                  error: Error()
                }), EventEnum) : EventEnum).BulletBorn, owner);
                this.state.bullets.push(bullet);
                break;
              }

            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).TimePast:
              {
                var {
                  dt: _dt
                } = input;

                for (var _bullet of this.state.bullets) {
                  _bullet.position.x += _bullet.direction.x * BULLET_SPEED * _dt;
                  _bullet.position.y += _bullet.direction.y * BULLET_SPEED * _dt; //碰撞检测 子弹是否有与物体接触
                  // 遍历所有玩家 检查是否与玩家碰撞

                  for (var _actor of this.state.actor) {
                    if (_actor.id === _bullet.owner) continue; // 跳过自己

                    var distance = Math.sqrt((_bullet.position.x - _actor.position.x) ** 2 + (_bullet.position.y - _actor.position.y) ** 2);

                    if (distance < PLAYER_RADIUS + BULLET_RADIUS) {
                      // 碰撞检测成功 销毁子弹 激活爆炸特效 TODO玩家扣血功能
                      this.state.bullets.splice(this.state.bullets.indexOf(_bullet), 1);
                      (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                        error: Error()
                      }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                        error: Error()
                      }), EventEnum) : EventEnum).ExplosionBorn, _bullet.id, {
                        x: _bullet.position.x,
                        y: _bullet.position.y
                      });
                      _actor.hp -= ATTACK; //玩家扣血 计算公式要*一个攻击系数

                      break;
                    }
                  } //判断是否超出地图边界 超出则销毁 


                  if (Math.abs(_bullet.position.x) > MAP_WIDTH / 2 || Math.abs(_bullet.position.y) > MAP_HEIGHT / 2) {
                    this.state.bullets.splice(this.state.bullets.indexOf(_bullet), 1);
                    (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                      error: Error()
                    }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                      error: Error()
                    }), EventEnum) : EventEnum).ExplosionBorn, _bullet.id, {
                      x: _bullet.position.x,
                      y: _bullet.position.y
                    });
                  }
                }
              }

            default:
              break;
          }
        }

      });

      DataManager.DataManager = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=25eaead65d56dcfb3b98e19c41a4f2c707f4ddc2.js.map