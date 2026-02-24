System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, toFix;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1e24beLsplGHLKPUMkE5wnG", "Util", undefined);

      _export("toFix", toFix = (num, fix = 3) => {
        const tempNum = num * 10 ** fix;
        const targetNum = Math.floor(tempNum) / 10 ** fix;
        return targetNum;
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=32f262365640b277faf690530fbb1b253e00df97.js.map