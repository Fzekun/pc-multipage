/**
 * Created by fengzekun on 16/12/5.
 */
var path = require('path');
var glob = require('glob');

module.exports = {
    //获取多个文件
    getEntry : function(globPath){
        var entries = {},
            basename, tmp, pathname;

        glob.sync(globPath).forEach(function (entry) {
            basename = path.basename(entry, path.extname(entry));

            tmp = entry.split('/').splice(-3);
            pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径

            entries[pathname] = entry;
        });

        return entries;
    }
};
