System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _crd, FsmParamTypeEnum, ParamsNameEnum, EventEnum, PrefabPathEnum, TexturePathEnum, EntityStateEnum, SceneEnum;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39328bCewlE0ZVfBJ5+Wzbq", "index", undefined);

      __checkObsolete__(['Prefab']);

      _export("FsmParamTypeEnum", FsmParamTypeEnum = /*#__PURE__*/function (FsmParamTypeEnum) {
        FsmParamTypeEnum["Number"] = "Number";
        FsmParamTypeEnum["Trigger"] = "Trigger";
        return FsmParamTypeEnum;
      }({}));

      _export("ParamsNameEnum", ParamsNameEnum = /*#__PURE__*/function (ParamsNameEnum) {
        ParamsNameEnum["Idle"] = "Idle";
        ParamsNameEnum["Run"] = "Run";
        ParamsNameEnum["Attack"] = "Attack";
        return ParamsNameEnum;
      }({}));

      _export("EventEnum", EventEnum = /*#__PURE__*/function (EventEnum) {
        EventEnum["WeaponShoot"] = "WeaponShoot";
        EventEnum["ExplosionBorn"] = "ExplosionBorn";
        EventEnum["BulletBorn"] = "BulletBorn";
        EventEnum["ClientSync"] = "ClientSync";
        EventEnum["JoinRoom"] = "JoinRoom";
        return EventEnum;
      }({}));

      _export("PrefabPathEnum", PrefabPathEnum = /*#__PURE__*/function (PrefabPathEnum) {
        PrefabPathEnum["Map"] = "Prefab/Map";
        PrefabPathEnum["Actor1"] = "Prefab/Actor";
        PrefabPathEnum["Weapon1"] = "Prefab/Weapon1";
        PrefabPathEnum["Bullet1"] = "Prefab/Bullet1";
        PrefabPathEnum["Bullet2"] = "Prefab/Bullet2";
        PrefabPathEnum["Explosion"] = "Prefab/Explosion";
        return PrefabPathEnum;
      }({}));

      _export("TexturePathEnum", TexturePathEnum = /*#__PURE__*/function (TexturePathEnum) {
        TexturePathEnum["Actor1Idle"] = "texture/actor/actor1/idle";
        TexturePathEnum["Actor1Run"] = "texture/actor/actor1/run";
        TexturePathEnum["Weapon1Idle"] = "texture/weapon/weapon1/idle";
        TexturePathEnum["Weapon1Attack"] = "texture/weapon/weapon1/attack";
        TexturePathEnum["Bullet1Idle"] = "texture/bullet/bullet1";
        TexturePathEnum["Bullet2Idle"] = "texture/bullet/bullet2";
        TexturePathEnum["ExplosionIdle"] = "texture/explosion";
        return TexturePathEnum;
      }({}));

      _export("EntityStateEnum", EntityStateEnum = /*#__PURE__*/function (EntityStateEnum) {
        EntityStateEnum["Idle"] = "Idle";
        EntityStateEnum["Run"] = "Run";
        EntityStateEnum["Attack"] = "Attack";
        return EntityStateEnum;
      }({}));

      _export("SceneEnum", SceneEnum = /*#__PURE__*/function (SceneEnum) {
        SceneEnum["Login"] = "Login";
        SceneEnum["Battle"] = "Battle";
        SceneEnum["Hall"] = "Hall";
        SceneEnum["Room"] = "Room";
        return SceneEnum;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c7a3e92048a4a4231657a559bb1233251b56e961.js.map