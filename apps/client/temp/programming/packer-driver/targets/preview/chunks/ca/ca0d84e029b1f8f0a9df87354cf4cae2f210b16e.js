System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, ccclass, property, BehaviorEditor;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "64ef9+65wZI64eIiRsKlTdC", "BehaviorEditor", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);
      /***
       * 方便用户打开插件面板，配合插件的contributions.inspector使用
       * 详见：https://docs.cocos.com/creator/manual/zh/editor/extension/inspector.html
       */

      _export("BehaviorEditor", BehaviorEditor = (_dec = ccclass("BehaviorEditor"), _dec(_class = class BehaviorEditor extends Component {}) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=ca0d84e029b1f8f0a9df87354cf4cae2f210b16e.js.map