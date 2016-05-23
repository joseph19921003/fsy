/**
 * Created by joseph on 2016/5/19.
 * 这是主函数，东西都在里面执行
 */
require.config({
    paths: {
        jquery: ["../../bower_components/jquery/dist/jquery"],
        test: "../test"
    },
    baseUrl: "js",
    shim: {

    }
});

require(["test", "logIt"], function(anything, logIt) {
    logIt("fuck");
    console.log(3);
});
