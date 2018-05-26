import { minify } from "uglify-es";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";

const ugly = true;

export default {
  input: "src/index.ts",
  output: {
    exports: "named",
    file: "dist/tsquery.umd.js",
    format: "umd",
    name: "tsquery",
    sourcemap: true,
    intro: "function require() {return {} };",
    globals: {
      typescript: "ts"
    }
  },
  external: ["typescript"],
  plugins: [
    resolve({
      jsnext: true
    }),
    commonjs({
      namedExports: {
        "node_modules/esquery/esquery.js": ["parse"]
      },
      ignore: ["./package.json"]
    }),
    typescript(),
    babel({
      babelrc: false,
      presets: [
        [
          "env",
          {
            modules: false
          }
        ]
      ],
      plugins: ["external-helpers", "inline-json-import"]
    }),
    ...(ugly
      ? [
          uglify(
            {
              warnings: true,
              toplevel: true,
              sourceMap: true,
              mangle: true
            },
            minify
          )
        ]
      : []),
    filesize()
  ]
};
