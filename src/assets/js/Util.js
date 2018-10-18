
/*
  Maps string representation of common
  JS datatypes to type name
 */

(function() {
  var Util, class2type;

  class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object"
  };


  /*
    A shim to enable micro precision timer if available
    Otherwise, fallbacks to Date.now
   */

  if (typeof window !== "undefined" && window !== null) {
    if (window.performance == null) {
      window.performance = Date;
    }
  }

  Util = {
    toString: Function.prototype.call.bind(Object.prototype.toString),
    hasOwn: Function.prototype.call.bind(Object.prototype.hasOwnProperty),
    push: Function.prototype.call.bind(Array.prototype.push),
    slice: Function.prototype.call.bind(Array.prototype.slice),
    filter: Function.prototype.call.bind(Array.prototype.filter),
    splice: Function.prototype.call.bind(Array.prototype.splice),
    indexOf: Function.prototype.call.bind(Array.prototype.indexOf),
    trim: Function.prototype.call.bind(String.prototype.trim),

    /*
      Useful and common meta helpers
     */
    type: function(obj) {
      if (obj == null) {
        return String(obj);
      }
      return class2type[Util.toString(obj)] || "object";
    },
    isPlainObject: function(obj) {
      var e, error, j, key, len;
      if ((obj != null) || Util.type(obj) !== "object" || (obj.nodeType != null)) {
        return false;
      }
      try {
        if ((obj.constructor != null) && !Util.hasOwn(obj, "constructor") && !Util.hasOwn(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (error) {
        e = error;
        return false;
      }
      key = void 0;
      for (j = 0, len = obj.length; j < len; j++) {
        key = obj[j];
        continue;
      }
      return (key == null) || Util.hasOwn(obj, key);
    },
    isFunction: function(obj) {
      return Util.type(obj) === "function";
    },
    isArray: Array.isArray || function(obj) {
      return Util.type(obj) === "array";
    },
    isWindow: function(obj) {
      return (obj != null) && obj === obj.window;
    },
    isNumeric: function(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    randomIntFromInterval: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /*
      Array helpers ahead
     */
    randomValueFromArray: function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    chunk: function(arr, chunkSize) {
      var i;
      i = 0;
      return ((function() {
        var results;
        results = [];
        while (i < arr.length) {
          results.push(arr.slice(i, i += chunkSize));
        }
        return results;
      })());
    },
    findOne: function(arr, key, val) {
      return Util.find(arr, key, val)[0];
    },
    find: function(arr, key, val) {
      return arr.filter(function(el) {
        var prop, pval;
        if (Util.type(key) !== "object") {
          return el[key] === val;
        }
        for (prop in key) {
          pval = key[prop];
          if (el[prop] !== pval) {
            return false;
          }
        }
        return true;
      });
    },
    findOneAndRemove: function(arr, key, val) {
      var ind, t;
      t = Util.findOne(arr, key, val);
      ind = arr.indexOf(arr, t);
      return arr.splice(arr, ind, 1);
    },
    remove: function(arr, t) {
      var ind;
      ind = arr.indexOf(arr, t);
      return arr.splice(arr, ind, 1);
    },
    flatten: function(arr, level) {
      var elem, j, len, out;
      out = [];
      if (level === 0) {
        return arr;
      }
      level--;
      for (j = 0, len = arr.length; j < len; j++) {
        elem = arr[j];
        if (Util.isArray(elem)) {
          out = out.concat(Util.flatten(elem, level));
        } else {
          out.push(elem);
        }
      }
      return out;
    },

    milisecondsToTime: function (miliseconds) {
      var out;
      out = {};
      if (miliseconds != null) {
        out.seconds = Math.floor((miliseconds / 1000) % 60);
        out.minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
        out.hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);

        if (out.seconds < 10) {
          out.seconds = "0" + out.seconds;
        }
        if (out.minutes < 10) {
          out.minutes = "0" + out.minutes;
        }
        if (out.hours < 10) {
          out.hours = "0" + out.hours;
        }
      }
      return out;
    },

    milisecondsToDayHourMinuteSecond: function(miliseconds) {
        var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        cm = 60 * 1000,
        d = Math.floor(miliseconds / cd),
        h = Math.floor( (miliseconds - d * cd) / ch),
        m = Math.floor( (miliseconds - d * cd - h * ch) / 60000),
        s = Math.floor( (miliseconds - d * cd - h * ch - m * cm) / 1000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
        if ( m === 60 ) {
          h++;
          m = 0;
        }
        if ( h === 24 ) {
          d++;
          h = 0;
        }
        var label = (d > 1) ? " days" : " day";
        return (d == 0) ? pad(h)+":"+pad(m)+":"+pad(s) : d + label + " " + pad(h)+":"+pad(m)+":"+pad(s);
    },

    milisecondsToDayHourMinute: function(miliseconds) {
        var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        cm = 60 * 1000,
        d = Math.floor(miliseconds / cd),
        h = Math.floor( (miliseconds - d * cd) / ch),
        m = Math.floor( (miliseconds - d * cd - h * ch) / 60000),
        //s = Math.floor( (miliseconds - d * cd - h * ch - m * cm) / 1000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
        if ( m === 60 ) {
          h++;
          m = 0;
        }
        if ( h === 24 ) {
          d++;
          h = 0;
        }
        var label = "d";
        return (d == 0) ? pad(h)+"h:"+pad(m)+"m" : d + label + " " + pad(h)+"h:"+pad(m)+"m";
    },

    dateObjToTime: function (dateObj) {
      var hrs, mins, secs;
      hrs = dateObj.getHours().toString();
      mins = dateObj.getMinutes().toString();
      secs = dateObj.getSeconds().toString();

      if (hrs.length == 1) {
        hrs += "0"
      }

      if (mins.length == 1) {
        mins += "0"
      }

      if (secs.length == 1) {
        secs += "0"
      }
      return hrs + ":" + mins + ":" + secs
    },

    gmtTimeToTime: function (timeWithGMT) {
      var hrs, mins, dateObj;
      dateObj = new Date.parse(timeWithGMT);
      hrs = dateObj.getHours().toString();
      mins = dateObj.getMinutes().toString();

      if (hrs.length == 1) {
        hrs += "0"
      }

      if (mins.length == 1) {
        mins += "0"
      }

      return hrs + ":" + mins
    },

    /*
      Ripped off jquery
      Extend or merge one object with another
      Goes deep too.
     */
    extend: function() {
      var clone, copy, copyIsArray, deep, i, length, name, options, src, target;
      target = arguments[0] || {};
      length = arguments.length;
      deep = false;
      i = 1;
      if (Util.type(target) === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (Util.type(target) !== "object" && !Util.isFunction(target)) {
        target = {};
      }
      if (length === i) {
        target = this;
        --i;
      }
      while (i < length) {
        if ((options = arguments[i++]) == null) {
          continue;
        }
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (Util.isPlainObject(copy) || (copyIsArray = Util.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Util.isArray(src) ? src : [];
            } else {
              clone = src && Util.isPlainObject(src) ? src : {};
            }
            target[name] = Util.extend(deep, clone, copy);
          } else if (copy != null) {
            target[name] = copy;
          }
        }
      }
      return target;
    },
    groupBy: function(attrib, objArray) {
      var j, key, len, obj, out;
      out = {};
      for (j = 0, len = objArray.length; j < len; j++) {
        obj = objArray[j];
        if (obj[attrib] == null) {
          continue;
        }
        key = obj[attrib];
        out[key] || (out[key] = []);
        out[key].push(obj);
      }
      return out;
    },
    mixin: function(obj, mixincls) {
      var method, name;
      for (name in mixincls) {
        method = mixincls[name];
        obj[name] = method;
      }
      return obj;
    },
    uniq: function(array) {
      var newArray;
      return newArray = array.filter(function(item, pos) {
        return array.indexOf(item) === pos;
      });
    },
    include: function(cls, mixincls) {
      return Util.mixin(cls.prototype, mixincls.prototype);
    },
    search: function(obj, filterfunc) {
      var key, val;
      if (Util.isPlainObject(obj)) {
        return (function() {
          var results;
          results = [];
          for (key in obj) {
            val = obj[key];
            if (filterfunc(val)) {
              results.push(val);
            }
          }
          return results;
        })();
      } else if (Util.isArray(obj)) {
        return obj.filter(filterfunc);
      } else {
        return null;
      }
    },
    lookup: function(obj, str, data) {
      var field, fields, nref, ref;
      fields = str.split(".");
      ref = obj;
      while (((field = fields.shift()) != null) && (ref != null)) {
        nref = ref[field];
        if (data == null) {
          ref = nref;
          continue;
        }
        if (fields.length === 0) {
          if (nref == null) {
            nref = ref[field] = {};
          }
          if (Util.isPlainObject(data)) {
            nref = Util.extend(true, ref[field], data);
          } else {
            nref = ref[field] = data;
          }
          return nref;
        }
        if (nref == null) {
          nref = ref[field] = {};
        }
        ref = nref;
      }
      return ref;
    },
    splay: function(objD, deep) {
      var key, paths, splayRec, val;
      if (deep == null) {
        deep = false;
      }
      paths = [];
      splayRec = function(obj, root) {
        var key, res, val;
        for (key in obj) {
          val = obj[key];
          if (Util.isPlainObject(val)) {
            res = splayRec(val, root + "." + key);
            if (deep) {
              paths.push(res);
            }
          } else {
            paths.push(root + "." + key);
          }
        }
        return root;
      };
      for (key in objD) {
        val = objD[key];
        if (Util.isPlainObject(val)) {
          splayRec(val, "" + key);
        } else {
          paths.push(key);
        }
      }
      return paths;
    },
    searchTree: function(element, matchingId) {
      if (element.id == matchingId) {
        return element;
      } else if (element.Categories != null) {
        var i;
        var result = null;

        for (i = 0; result == null && i < element.Categories.length; i++) {
          result = this.searchTree(element.Categories[i], matchingId);
        }

        return result;
      }

      return null;
    }
  };

  String.prototype.format = String.prototype.f = function() {
    var args, i, s;
    if (arguments[0] instanceof Array) {
      args = arguments[0];
    } else {
      args = arguments;
    }
    i = args.length;
    s = this;
    while (i--) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
  };

  String.prototype.endsWith = function(str) {
    return this.lastIndexOf(str) + str.length === this.length;
  };

  String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0;
  };

  if (typeof define === "function" && (define.amd != null)) {
    define(function() {
      return window["Util"] = Util;
    });
  } else if (typeof module !== "undefined" && (module.exports != null)) {
    module.exports = Util;
  } else {
    window["Util"] = Util;
  }

}).call(this);
