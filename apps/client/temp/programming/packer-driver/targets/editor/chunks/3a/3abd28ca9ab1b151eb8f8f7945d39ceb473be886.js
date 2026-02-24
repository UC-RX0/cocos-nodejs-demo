System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _crd, INDEX_REG, getNumberWithinString, sortSpriteFrame, rad2Angle, deepClone;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2e2808uUqNGWqz1+0Eu9R1r", "index", undefined);

      __checkObsolete__(['SpriteFrame']);

      INDEX_REG = /\((\d+)\)/;

      getNumberWithinString = str => {
        var _str$match;

        return parseInt(((_str$match = str.match(INDEX_REG)) == null ? void 0 : _str$match[1]) || "0");
      };

      _export("sortSpriteFrame", sortSpriteFrame = spriteFrame => spriteFrame.sort((a, b) => getNumberWithinString(a.name) - getNumberWithinString(b.name)));

      _export("rad2Angle", rad2Angle = rad => rad * 180 / Math.PI);
      /**
       * 深拷贝
       * @param obj 
       * @returns 
       */


      _export("deepClone", deepClone = obj => {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }

        const res = Array.isArray(obj) ? [] : {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = deepClone(obj[key]);
          }
        }

        return res;
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3abd28ca9ab1b151eb8f8f7945d39ceb473be886.js.map