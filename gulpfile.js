const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const errorify = require('errorify');
const del = require('del');
const tsify = require('tsify');
const gulpTypings = require('gulp-typings');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function createBrowserifier(entry) {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [entry],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .plugin(watchify)
    .plugin(errorify);
}

function bundle(browserifier, bundleName, destination) {
    return browserifier
        .bundle()
        .pipe(source(bundleName))
        .pipe(gulp.dest(destination));
}

gulp.task('clean', () => {
    return del('./javascript/**/*')
});

gulp.task('installTypings', () => {
    return gulp.src('typings.json').pipe(gulpTypings());
});

gulp.task('tsc-browserify-client-phone-src', () => {
    return bundle(
        createBrowserifier('./typescript/client/phone/main.ts'),
        'bundle.js',
        'javascript/client/phone');
});

gulp.task('tsc-browserify-client-desktop-src', () => {
    return bundle(
        createBrowserifier('./typescript/client/desktop/main.ts'),
        'bundle.js',
        'javascript/client/desktop');
});

gulp.task('tsc-compile', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("javascript/server"));
})

gulp.task('default', (done) => {
    runSequence(['clean', 'installTypings'], ['tsc-browserify-client-desktop-src', 
                                              'tsc-browserify-client-phone-src',
                                             'tsc-compile'], () => {
            console.log('Watching...')
            gulp.watch(['typescript/**/*.ts'], 
                       [
                       'tsc-browserify-client-desktop-src',
                       'tsc-browserify-client-phone-src',
                       'tsc-compile']);		
    });
});
