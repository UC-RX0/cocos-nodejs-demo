System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, InputTypeEnum, EntityTypeEnum, ApiMsgEnum;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5db65jOzCREkLj/oe+eXO6I", "Enum", undefined);

      // import { nodeClsMap } from './../../../extensions/Behavior Eden/src/runtime/core/decorator';
      _export("InputTypeEnum", InputTypeEnum = /*#__PURE__*/function (InputTypeEnum) {
        InputTypeEnum["ActorMove"] = "ActorMove";
        InputTypeEnum["WeaponShoot"] = "WeaponShoot";
        InputTypeEnum["TimePast"] = "TimePast";
        return InputTypeEnum;
      }({}));

      _export("EntityTypeEnum", EntityTypeEnum = /*#__PURE__*/function (EntityTypeEnum) {
        EntityTypeEnum["Map"] = "Map";
        EntityTypeEnum["Actor1"] = "Actor1";
        EntityTypeEnum["Weapon1"] = "Weapon1";
        EntityTypeEnum["Bullet1"] = "Bullet1";
        EntityTypeEnum["Bullet2"] = "Bullet2";
        EntityTypeEnum["Explosion"] = "Explosion";
        return EntityTypeEnum;
      }({}));

      _export("ApiMsgEnum", ApiMsgEnum = /*#__PURE__*/function (ApiMsgEnum) {
        ApiMsgEnum["ApiPlayerJoin"] = "ApiPlayerJoin";
        ApiMsgEnum["MsgClientSync"] = "MsgClientSync";
        ApiMsgEnum["MsgServerSync"] = "MsgServerSync";
        ApiMsgEnum["ApiPlayerList"] = "ApiPlayerList";
        ApiMsgEnum["MsgPlayerList"] = "MsgPlayerList";
        ApiMsgEnum["MsgRoom"] = "MsgRoom";
        ApiMsgEnum["ApiRoomLeave"] = "ApiRoomLeave";
        ApiMsgEnum["ApiRoomCreate"] = "ApiRoomCreate";
        ApiMsgEnum["ApiRoomList"] = "ApiRoomList";
        ApiMsgEnum["ApiRoomJoin"] = "ApiRoomJoin";
        ApiMsgEnum["MsgRoomList"] = "MsgRoomList";
        ApiMsgEnum["ApiRoomStart"] = "ApiRoomStart";
        ApiMsgEnum["MsgRoomStart"] = "MsgRoomStart";
        return ApiMsgEnum;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=932eb2d94ead485c444a3669a6d0816611db9be7.js.map