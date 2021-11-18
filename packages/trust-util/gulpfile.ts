/* eslint-disable @typescript-eslint/no-var-requires */
import { src, dest, parallel } from 'gulp';
const ESbuild = require('gulp-esbuild');
const ts = require('gulp-typescript');
const DIST_DIR = 'dist/';
const ES_DIR = 'es/';
const LIB_DIR = 'lib/';
const bundleDIST = (cb: () => void) => {
  src('src/**/*.ts')
    .pipe(
      ts({
        noImplicitAny: true,
        declaration: true,
        removeComments: true,
      }),
    )
    .pipe(dest(DIST_DIR));
  cb();
};
const bundleES = (cb: () => void) => {
  src('src/**/*.ts')
    .pipe(
      ESbuild({
        format: 'esm',
        // minifyWhitespace: true,
        treeShaking: true,
        bundle: true,
      }),
    )
    .pipe(dest(ES_DIR));
  cb();
};
const bundleLIB = (cb: () => void) => {
  src('src/**/*.ts')
    .pipe(
      ESbuild({
        format: 'iife',
        // minifyWhitespace: true,
        treeShaking: true,
        bundle: true,
        globalName: 'trust',
      }),
    )
    .pipe(dest(LIB_DIR));
  cb();
};
const build = parallel(bundleDIST, bundleES, bundleLIB);
export default build;
