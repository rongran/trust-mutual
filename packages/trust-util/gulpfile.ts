/* eslint-disable @typescript-eslint/no-var-requires */
import { src, dest, parallel, series, watch } from 'gulp';
const ESbuild = require('gulp-esbuild');
const ts = require('gulp-typescript');
const DIST_DIR = 'dist/';
const ES_DIR = 'es/';
const LIB_DIR = 'lib/';
const bundleDIST = async (cb: () => void) => {
  await src('src/**/*.ts')
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
        // bundle: true,
        splitting: true,
      }),
    )
    .pipe(dest(ES_DIR));
  watch('dist/', () => {
    src('dist/**/*.d.ts').pipe(dest(ES_DIR));
  });
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
const build = series(bundleDIST, bundleLIB, bundleES);
export default build;
