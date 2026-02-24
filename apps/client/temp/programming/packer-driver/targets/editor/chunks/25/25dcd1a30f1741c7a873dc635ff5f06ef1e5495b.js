System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, EditBox, NetworkManager, ApiMsgEnum, DataManager, SceneEnum, _dec, _class, _crd, ccclass, property, LoginManager;

  function _reportPossibleCrUseOfNetworkManager(extras) {
    _reporterNs.report("NetworkManager", "../Global/NetworkManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfApiMsgEnum(extras) {
    _reporterNs.report("ApiMsgEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneEnum(extras) {
    _reporterNs.report("SceneEnum", "../Enum", _context.meta, extras);
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
      director = _cc.director;
      EditBox = _cc.EditBox;
    }, function (_unresolved_2) {
      NetworkManager = _unresolved_2.NetworkManager;
    }, function (_unresolved_3) {
      ApiMsgEnum = _unresolved_3.ApiMsgEnum;
    }, function (_unresolved_4) {
      DataManager = _unresolved_4.default;
    }, function (_unresolved_5) {
      SceneEnum = _unresolved_5.SceneEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "479f4Omm6pGXq5QTCKZ0uQf", "LoginManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'EditBox', 'Node', 'Scene']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginManager", LoginManager = (_dec = ccclass('LoginManager'), _dec(_class = class LoginManager extends Component {
        constructor(...args) {
          super(...args);
          this.editBox = void 0;
        }

        onLoad() {
          this.editBox = this.getComponentInChildren(EditBox);
          director.preloadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
            error: Error()
          }), SceneEnum) : SceneEnum).Hall);
        }

        async start() {
          await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.connect();
        }

        async handleClick() {
          const nickname = this.editBox.string;

          if (!(_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.inConnection) {
            console.log("未连接");
            await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
              error: Error()
            }), NetworkManager) : NetworkManager).Instance.connect();
            return;
          }

          if (nickname.length === 0) {
            console.log("请输入昵称");
            return;
          }

          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiPlayerJoin, {
            nickname
          });

          if (!success) {
            console.log("加入失败", error);
            return;
          }

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.playerID = res.player.id;
          console.log("加入成功", res.player.id);
          director.loadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
            error: Error()
          }), SceneEnum) : SceneEnum).Hall);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=25dcd1a30f1741c7a873dc635ff5f06ef1e5495b.js.map