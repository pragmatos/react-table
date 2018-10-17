var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classnames from 'classnames';
//
export default {
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent,
  asPx: asPx
};

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var comp = funcs[i];
      var desc = dirs[i] === false || dirs[i] === 'desc';
      var sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0] ? rowA[indexKey] - rowB[indexKey] : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
      return arguments.length <= i ? undefined : arguments[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass, displayName) {
  if (!displayName) {
    throw new Error('No displayName found for template component:', compClass);
  }
  var cmp = function cmp(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({ className: classnames(compClass, className) }, rest),
      children
    );
  };
  cmp.displayName = displayName;
  return cmp;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : value + 'px';
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest || {}
  };
}

function compactObject(obj) {
  var newObj = {};
  if (obj) {
    Object.keys(obj).map(function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? React.createElement(Comp, params) : Comp(params) : fallback;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImNsYXNzbmFtZXMiLCJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJnZXRGaXJzdERlZmluZWQiLCJzdW0iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJncm91cEJ5IiwiaXNBcnJheSIsInNwbGl0UHJvcHMiLCJjb21wYWN0T2JqZWN0IiwiaXNTb3J0aW5nRGVzYyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsImFzUHgiLCJvYmoiLCJwYXRoIiwiZGVmIiwicGF0aE9iaiIsIm1ha2VQYXRoQXJyYXkiLCJ2YWwiLCJyZWR1Y2UiLCJjdXJyZW50IiwicGF0aFBhcnQiLCJlIiwidmFsdWUiLCJrZXlzIiwia2V5UGFydCIsImN1cnNvciIsInNoaWZ0IiwibGVuZ3RoIiwiYXJyIiwibiIsInN0YXJ0Iiwic2xpY2UiLCJpIiwicHVzaCIsImZ1bmNzIiwiZGlycyIsImluZGV4S2V5Iiwic29ydCIsInJvd0EiLCJyb3dCIiwiY29tcCIsImRlc2MiLCJzb3J0SW50IiwiYSIsImIiLCJmaWx0ZXIiLCJvIiwiciIsInNwbGljZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImtleSIsInRvU3RyaW5nIiwiY29tcENsYXNzIiwiZGlzcGxheU5hbWUiLCJFcnJvciIsImNtcCIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwicmVzdCIsInhzIiwicnYiLCJ4IiwicmVzS2V5IiwiTnVtYmVyIiwiaXNOYU4iLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwiT2JqZWN0IiwibWFwIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwidW5kZWZpbmVkIiwiZCIsImFzYyIsIkNvbXAiLCJwYXJhbXMiLCJmYWxsYmFjayIsImdldFByb3RvdHlwZU9m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VUgsTUFBVixDQURGLEdBR0VELEtBQUtDLE1BQUwsQ0FKRyxHQU9MQyxRQVBGO0FBU0QiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXHJcbi8vXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXQsXHJcbiAgc2V0LFxyXG4gIHRha2VSaWdodCxcclxuICBsYXN0LFxyXG4gIG9yZGVyQnksXHJcbiAgcmFuZ2UsXHJcbiAgcmVtb3ZlLFxyXG4gIGNsb25lLFxyXG4gIGdldEZpcnN0RGVmaW5lZCxcclxuICBzdW0sXHJcbiAgbWFrZVRlbXBsYXRlQ29tcG9uZW50LFxyXG4gIGdyb3VwQnksXHJcbiAgaXNBcnJheSxcclxuICBzcGxpdFByb3BzLFxyXG4gIGNvbXBhY3RPYmplY3QsXHJcbiAgaXNTb3J0aW5nRGVzYyxcclxuICBub3JtYWxpemVDb21wb25lbnQsXHJcbiAgYXNQeCxcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0IChvYmosIHBhdGgsIGRlZikge1xyXG4gIGlmICghcGF0aCkge1xyXG4gICAgcmV0dXJuIG9ialxyXG4gIH1cclxuICBjb25zdCBwYXRoT2JqID0gbWFrZVBhdGhBcnJheShwYXRoKVxyXG4gIGxldCB2YWxcclxuICB0cnkge1xyXG4gICAgdmFsID0gcGF0aE9iai5yZWR1Y2UoKGN1cnJlbnQsIHBhdGhQYXJ0KSA9PiBjdXJyZW50W3BhdGhQYXJ0XSwgb2JqKVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIC8vIGNvbnRpbnVlIHJlZ2FyZGxlc3Mgb2YgZXJyb3JcclxuICB9XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnID8gdmFsIDogZGVmXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldCAob2JqID0ge30sIHBhdGgsIHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5cyA9IG1ha2VQYXRoQXJyYXkocGF0aClcclxuICBsZXQga2V5UGFydFxyXG4gIGxldCBjdXJzb3IgPSBvYmpcclxuICB3aGlsZSAoKGtleVBhcnQgPSBrZXlzLnNoaWZ0KCkpICYmIGtleXMubGVuZ3RoKSB7XHJcbiAgICBpZiAoIWN1cnNvcltrZXlQYXJ0XSkge1xyXG4gICAgICBjdXJzb3Jba2V5UGFydF0gPSB7fVxyXG4gICAgfVxyXG4gICAgY3Vyc29yID0gY3Vyc29yW2tleVBhcnRdXHJcbiAgfVxyXG4gIGN1cnNvcltrZXlQYXJ0XSA9IHZhbHVlXHJcbiAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5mdW5jdGlvbiB0YWtlUmlnaHQgKGFyciwgbikge1xyXG4gIGNvbnN0IHN0YXJ0ID0gbiA+IGFyci5sZW5ndGggPyAwIDogYXJyLmxlbmd0aCAtIG5cclxuICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBsYXN0IChhcnIpIHtcclxuICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXVxyXG59XHJcblxyXG5mdW5jdGlvbiByYW5nZSAobikge1xyXG4gIGNvbnN0IGFyciA9IFtdXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpICs9IDEpIHtcclxuICAgIGFyci5wdXNoKG4pXHJcbiAgfVxyXG4gIHJldHVybiBhcnJcclxufVxyXG5cclxuZnVuY3Rpb24gb3JkZXJCeSAoYXJyLCBmdW5jcywgZGlycywgaW5kZXhLZXkpIHtcclxuICByZXR1cm4gYXJyLnNvcnQoKHJvd0EsIHJvd0IpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgY29tcCA9IGZ1bmNzW2ldXHJcbiAgICAgIGNvbnN0IGRlc2MgPSBkaXJzW2ldID09PSBmYWxzZSB8fCBkaXJzW2ldID09PSAnZGVzYydcclxuICAgICAgY29uc3Qgc29ydEludCA9IGNvbXAocm93QSwgcm93QilcclxuICAgICAgaWYgKHNvcnRJbnQpIHtcclxuICAgICAgICByZXR1cm4gZGVzYyA/IC1zb3J0SW50IDogc29ydEludFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBVc2UgdGhlIHJvdyBpbmRleCBmb3IgdGllIGJyZWFrZXJzXHJcbiAgICByZXR1cm4gZGlyc1swXSA/IHJvd0FbaW5kZXhLZXldIC0gcm93QltpbmRleEtleV0gOiByb3dCW2luZGV4S2V5XSAtIHJvd0FbaW5kZXhLZXldXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlIChhLCBiKSB7XHJcbiAgcmV0dXJuIGEuZmlsdGVyKChvLCBpKSA9PiB7XHJcbiAgICBjb25zdCByID0gYihvKVxyXG4gICAgaWYgKHIpIHtcclxuICAgICAgYS5zcGxpY2UoaSwgMSlcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb25lIChhKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeShhLCAoa2V5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBhXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGaXJzdERlZmluZWQgKC4uLmFyZ3MpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGlmICh0eXBlb2YgYXJnc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGFyZ3NbaV1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1bSAoYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlVGVtcGxhdGVDb21wb25lbnQgKGNvbXBDbGFzcywgZGlzcGxheU5hbWUpIHtcclxuICBpZiAoIWRpc3BsYXlOYW1lKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRpc3BsYXlOYW1lIGZvdW5kIGZvciB0ZW1wbGF0ZSBjb21wb25lbnQ6JywgY29tcENsYXNzKVxyXG4gIH1cclxuICBjb25zdCBjbXAgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbXBDbGFzcywgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbiAgY21wLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWVcclxuICByZXR1cm4gY21wXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdyb3VwQnkgKHhzLCBrZXkpIHtcclxuICByZXR1cm4geHMucmVkdWNlKChydiwgeCwgaSkgPT4ge1xyXG4gICAgY29uc3QgcmVzS2V5ID0gdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJyA/IGtleSh4LCBpKSA6IHhba2V5XVxyXG4gICAgcnZbcmVzS2V5XSA9IGlzQXJyYXkocnZbcmVzS2V5XSkgPyBydltyZXNLZXldIDogW11cclxuICAgIHJ2W3Jlc0tleV0ucHVzaCh4KVxyXG4gICAgcmV0dXJuIHJ2XHJcbiAgfSwge30pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzUHggKHZhbHVlKSB7XHJcbiAgdmFsdWUgPSBOdW1iZXIodmFsdWUpXHJcbiAgcmV0dXJuIE51bWJlci5pc05hTih2YWx1ZSkgPyBudWxsIDogYCR7dmFsdWV9cHhgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQXJyYXkgKGEpIHtcclxuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKVxyXG59XHJcblxyXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuLy8gTm9uLWV4cG9ydGVkIEhlbHBlcnNcclxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcblxyXG5mdW5jdGlvbiBtYWtlUGF0aEFycmF5IChvYmopIHtcclxuICByZXR1cm4gZmxhdHRlbkRlZXAob2JqKVxyXG4gICAgLmpvaW4oJy4nKVxyXG4gICAgLnJlcGxhY2UoL1xcWy9nLCAnLicpXHJcbiAgICAucmVwbGFjZSgvXFxdL2csICcnKVxyXG4gICAgLnNwbGl0KCcuJylcclxufVxyXG5cclxuZnVuY3Rpb24gZmxhdHRlbkRlZXAgKGFyciwgbmV3QXJyID0gW10pIHtcclxuICBpZiAoIWlzQXJyYXkoYXJyKSkge1xyXG4gICAgbmV3QXJyLnB1c2goYXJyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBmbGF0dGVuRGVlcChhcnJbaV0sIG5ld0FycilcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ld0FyclxyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdFByb3BzICh7IGNsYXNzTmFtZSwgc3R5bGUsIC4uLnJlc3QgfSkge1xyXG4gIHJldHVybiB7XHJcbiAgICBjbGFzc05hbWUsXHJcbiAgICBzdHlsZSxcclxuICAgIHJlc3Q6IHJlc3QgfHwge30sXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYWN0T2JqZWN0IChvYmopIHtcclxuICBjb25zdCBuZXdPYmogPSB7fVxyXG4gIGlmIChvYmopIHtcclxuICAgIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmXHJcbiAgICAgICAgb2JqW2tleV0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBvYmpba2V5XSAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgKSB7XHJcbiAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXR1cm4gbmV3T2JqXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzU29ydGluZ0Rlc2MgKGQpIHtcclxuICByZXR1cm4gISEoZC5zb3J0ID09PSAnZGVzYycgfHwgZC5kZXNjID09PSB0cnVlIHx8IGQuYXNjID09PSBmYWxzZSlcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChDb21wLCBwYXJhbXMgPSB7fSwgZmFsbGJhY2sgPSBDb21wKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBDb21wID09PSAnZnVuY3Rpb24nID8gKFxyXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXApLmlzUmVhY3RDb21wb25lbnQgPyAoXHJcbiAgICAgIDxDb21wIHsuLi5wYXJhbXN9IC8+XHJcbiAgICApIDogKFxyXG4gICAgICBDb21wKHBhcmFtcylcclxuICAgIClcclxuICApIDogKFxyXG4gICAgZmFsbGJhY2tcclxuICApXHJcbn1cclxuIl19