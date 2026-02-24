System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Blackboard;

  _export("Blackboard", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "4e640b+9XpJobDd2f9IcEg8", "Blackboard", undefined);

      /***
       * 黑板用来存储行为树所有信息
       * 暴露静态方法方便用户使用
       */
      _export("Blackboard", Blackboard = class Blackboard {
        static write(key, value) {
          this.map.set(key, value);
        }

        static read(key) {
          return this.map.get(key);
        }

        static has(key) {
          return this.map.has(key);
        }

        static delete(key) {
          return this.map.delete(key);
        }

        static clear() {
          this.map.clear();
        }

      });

      Blackboard.map = new Map();

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=f74bf5fd5ea73d5cd3304811fca6f24f219134cb.js.map