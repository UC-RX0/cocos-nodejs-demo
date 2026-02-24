System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, nodeClsMap, btclass;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "8ac4dUwPl1OeIXkrxzwfynE", "decorator", undefined);

      _export("nodeClsMap", nodeClsMap = new Map());
      /***
       * 收集被装饰的类，用来在运行时通过节点类型找到对应的class
       */


      _export("btclass", btclass = name => {
        return function (target) {
          nodeClsMap.set(name, target);
        };
      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=4df87c605067e97b45676b744b4c609d70addf8f.js.map