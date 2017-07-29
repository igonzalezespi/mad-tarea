function addProperties(dst, src) {
        Object.keys(src).forEach(function(p) {
            Object.defineProperty(dst, p, {
                value: src[p],
                configurable: p == 'next'
            });
        });
    }
function hideProperty(o, p) {
        Object.defineProperty(o, p, {
            writable: true
        });
    }
function baseN(ary, nelem, fun) {
                if (!nelem) nelem = ary.length;
        if (nelem < 1) throw new RangeError;
        var base = ary.length,
                size = Math.pow(base, nelem);
        var sizeOf = function() {
                return size;
            },
            that = Object.create(ary.slice(), {
                length: {
                    get: sizeOf
                }
            });
        hideProperty(that, 'index');
        addProperties(that, {
            valueOf: sizeOf,
            init: function() {
                that.index = 0;
            },
            nth: function(n) {
                if (n >= size) return;
                var result = [];
                for (var i = 0; i < nelem; i++) {
                    var d = n % base;
                    result.push(ary[d])
                    n -= d; n /= base
                }
                return (typeof (that._lazyMap) === 'function')?that._lazyMap(result):result;
            },
            next: function() {
                return this.nth(this.index++);
            }
        });
        that.init();
        return (typeof (fun) === 'function') ? that.map(fun) : that;
    }


var a = baseN([0,1], 9);

while (e = a.next()) console.log(e);
