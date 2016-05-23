/**
 * Created by joseph on 2016/5/19.
 */


/**
 * 非独立模块，依赖多的时候可以这么写
 */
define(function(require) {
    var $ = require("jquery");
    require("test");
    function logIt(msg) {
        $(function() {
            console.log(msg);
        });
    }
    alert(123);
    console.log(2);
    return logIt;
});
