System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Prefab, SpriteFrame, DataManager, ResourceManager, EntityTypeEnum, PrefabPathEnum, TexturePathEnum, BattleController, _crd;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceManager(extras) {
    _reporterNs.report("ResourceManager", "../Global/ResourceManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorManager(extras) {
    _reporterNs.report("ActorManager", "../Entity/Actor/ActorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIActor(extras) {
    _reporterNs.report("IActor", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPrefabPathEnum(extras) {
    _reporterNs.report("PrefabPathEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTexturePathEnum(extras) {
    _reporterNs.report("TexturePathEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletManager(extras) {
    _reporterNs.report("BulletManager", "../Entity/Bullet/BulletManager", _context.meta, extras);
  }

  _export("BattleController", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Prefab = _cc.Prefab;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      ResourceManager = _unresolved_3.ResourceManager;
    }, function (_unresolved_4) {
      EntityTypeEnum = _unresolved_4.EntityTypeEnum;
    }, function (_unresolved_5) {
      PrefabPathEnum = _unresolved_5.PrefabPathEnum;
      TexturePathEnum = _unresolved_5.TexturePathEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e2e47rzuMxD171jBQtdmTju", "BattleController", undefined);

      __checkObsolete__(['Prefab', 'SpriteFrame']);

      _export("BattleController", BattleController = class BattleController {
        static setJoyStickData(joyStickData) {
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm = joyStickData;
        }

        static renderActor() {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.actor) {
            const {
              id,
              Type
            } = data;
            const actor = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.get(id);

            if (!actor) {
              const actorPrefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.prefabMap.get(Type);

              if (actorPrefab) {
                const render = {
                  data: data,
                  prefab: actorPrefab
                };
                return render;
              }
            } else {
              actor.render(data);
            }
          }

          return null;
        }

        static renderBullet() {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.bullets) {
            const {
              id,
              bulletType
            } = data;
            const bullet = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.bulletMap.get(id);

            if (!bullet) {
              const bulletPrefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.prefabMap.get(bulletType);

              if (bulletPrefab) {
                const render = {
                  data: data,
                  prefab: bulletPrefab
                };
                return render;
              }
            } else {
              bullet.render(data);
            }
          }

          return null;
        }

        static initMap() {
          //地图初始化
          const mapPrefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Map);

          if (!mapPrefab) {
            console.error("Map prefab not found! EntityTypeEnum.Map:", (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
              error: Error()
            }), EntityTypeEnum) : EntityTypeEnum).Map); // 可以返回一个默认值或者抛出明确错误

            throw new Error(`Map prefab not found for type: ${(_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
              error: Error()
            }), EntityTypeEnum) : EntityTypeEnum).Map}`);
          }

          return mapPrefab;
        } //加载资源


        static loadRes() {
          const list = [];

          for (const type in _crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum) {
            const p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
              error: Error()
            }), ResourceManager) : ResourceManager).Instance.loadRes((_crd && PrefabPathEnum === void 0 ? (_reportPossibleCrUseOfPrefabPathEnum({
              error: Error()
            }), PrefabPathEnum) : PrefabPathEnum)[type], Prefab).then(res => (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.setprefabMap(type, res));
            list.push(p);
          }

          for (const type in _crd && TexturePathEnum === void 0 ? (_reportPossibleCrUseOfTexturePathEnum({
            error: Error()
          }), TexturePathEnum) : TexturePathEnum) {
            const p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
              error: Error()
            }), ResourceManager) : ResourceManager).Instance.loadDir((_crd && TexturePathEnum === void 0 ? (_reportPossibleCrUseOfTexturePathEnum({
              error: Error()
            }), TexturePathEnum) : TexturePathEnum)[type], SpriteFrame).then(res => (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.setTextureMap(type, res));
            list.push(p);
          }

          return list;
        }

        static setActorManager(id, actor) {
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.setActorManager(id, actor);
        }

        static setBulletManager(id, bullet) {
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.setBulletManager(id, bullet);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4d02bd19434c0b61b4041e0b5c20554765117159.js.map