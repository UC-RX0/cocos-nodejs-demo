System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, instantiate, Node, Prefab, NetworkManager, ApiMsgEnum, PlayerManager, DataManager, EventEnum, SceneEnum, RoomManager, EventManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, HallManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfNetworkManager(extras) {
    _reporterNs.report("NetworkManager", "../Global/NetworkManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfApiMsgEnum(extras) {
    _reporterNs.report("ApiMsgEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIApiPlayerListRes(extras) {
    _reporterNs.report("IApiPlayerListRes", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIApiRoomListRes(extras) {
    _reporterNs.report("IApiRoomListRes", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "../UI/PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneEnum(extras) {
    _reporterNs.report("SceneEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoomManager(extras) {
    _reporterNs.report("RoomManager", "../UI/RoomManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Global/EventManager", _context.meta, extras);
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
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      NetworkManager = _unresolved_2.NetworkManager;
    }, function (_unresolved_3) {
      ApiMsgEnum = _unresolved_3.ApiMsgEnum;
    }, function (_unresolved_4) {
      PlayerManager = _unresolved_4.PlayerManager;
    }, function (_unresolved_5) {
      DataManager = _unresolved_5.default;
    }, function (_unresolved_6) {
      EventEnum = _unresolved_6.EventEnum;
      SceneEnum = _unresolved_6.SceneEnum;
    }, function (_unresolved_7) {
      RoomManager = _unresolved_7.RoomManager;
    }, function (_unresolved_8) {
      EventManager = _unresolved_8.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b78a9yb6FFBP7oMd2+eiCEW", "HallManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'instantiate', 'Label', 'Node', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HallManager", HallManager = (_dec = ccclass('HallManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Prefab), _dec(_class = (_class2 = class HallManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "PlayerList", _descriptor, this);

          _initializerDefineProperty(this, "PlayerPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "RoomList", _descriptor3, this);

          _initializerDefineProperty(this, "RoomPrefab", _descriptor4, this);
        }

        onLoad() {
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.listenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgPlayerList, this.renderPlayer, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.listenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoomList, this.renderRoom, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).JoinRoom, this.handleJoinRoom, this);
        }

        start() {
          this.RoomList.removeAllChildren();
          this.PlayerList.removeAllChildren();
          this.getPlayers();
          this.getRooms();
        }

        onDestroy() {
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.unListenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgPlayerList, this.renderPlayer, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.unListenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoomList, this.renderRoom, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).JoinRoom, this.handleJoinRoom, this);
        }

        async getPlayers() {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiPlayerList, {});

          if (!success) {
            console.log("加入失败", error);
            return;
          }

          this.renderPlayer(res);
        }

        async getRooms() {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiRoomList, {});

          if (!success) {
            console.log("加入失败", error);
            return;
          }

          this.renderRoom(res);
        }

        renderRoom({
          Rooms
        }) {
          for (const c of this.RoomList.children) {
            c.active = false;
          }

          while (this.RoomList.children.length < Rooms.length) {
            const c = instantiate(this.RoomPrefab);
            c.active = false;
            c.parent = this.RoomList;
          }

          for (let i = 0; i < Rooms.length; i++) {
            const data = Rooms[i];
            const node = this.RoomList.children[i];
            node.getComponent(_crd && RoomManager === void 0 ? (_reportPossibleCrUseOfRoomManager({
              error: Error()
            }), RoomManager) : RoomManager).init(data);
          }
        }

        async handleJoinRoom(rid) {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiRoomJoin, {
            rid
          });

          if (!success) {
            console.log("加入失败", error);
            return;
          }

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.roomInfo = res.room;
          console.log("创建房间成功", res);
          director.loadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
            error: Error()
          }), SceneEnum) : SceneEnum).Room);
        }

        renderPlayer({
          Players
        }) {
          for (const c of this.PlayerList.children) {
            c.active = false;
          }

          while (this.PlayerList.children.length < Players.length) {
            const c = instantiate(this.PlayerPrefab);
            c.active = false;
            c.parent = this.PlayerList;
          }

          for (let i = 0; i < Players.length; i++) {
            const data = Players[i];
            const node = this.PlayerList.children[i];
            node.getComponent(_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
              error: Error()
            }), PlayerManager) : PlayerManager).init(data);
          }
        }

        async handleCreateRoom() {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiRoomCreate, {});

          if (!success) {
            console.log("加入失败", error);
            return;
          }

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.roomInfo = res.room;
          console.log("创建房间成功", res);
          director.loadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
            error: Error()
          }), SceneEnum) : SceneEnum).Room);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PlayerList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "PlayerPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "RoomList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "RoomPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c6943f8abe2783ceed58933586a92ea50e8d149c.js.map