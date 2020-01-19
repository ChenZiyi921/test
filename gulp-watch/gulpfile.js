var gulp = require("gulp"),
    cssmin = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    connect = require("gulp-connect"),
    assetRev = require('gulp-asset-rev');

gulp.task("css", function () {
    gulp.src("./src/css/*.css")
        // 压缩
        .pipe(gulp.dest("./dist/css"))
        .pipe(cssmin())
        // 重命名
        // .pipe(rename(function (filename) {
        //     filename.basename += "min"
        // }))
        .pipe(gulp.dest("./dist/css"));
})

gulp.task("copy", function () {
    gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"));
    gulp.src("./src/css/*.css")
        .pipe(gulp.dest("./dist/css"));
})

gulp.task("watch", function () {
    gulp.watch("./src/**/*.*", ["copy", 'css']);
    gulp.watch("./dist/**/*.*", ["reload"]);
})

gulp.task("reload", function () {
    gulp.src("./dist/*.html")
        .pipe(connect.reload());
})

gulp.task("server", function () {
    connect.server({
        root: "./dist",
        livereload: true,
        port: 8030
    })
})

gulp.task('rev',['revCss'],function() {
    gulp.src("./src/*.html")
        .pipe(assetRev())
        .pipe(gulp.dest('./dist'));
});
 
gulp.task('revCss',function () {
    gulp.src('./src/css/*.css')
        .pipe(assetRev())
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task("default", ['rev',"server", "watch"]);