

Start by reviewing [Rollup.js Plugins](https://rollupjs.org/guide/en/#plugins-overview) since they influence the vite
plugin model and in many cases they are compatible.

Properties
Build Hooks
Output Generation Hooks
Conventions


## Conventions

- Plugins should have a clear name with rollup-plugin- prefix.
- Include rollup-plugin keyword in package.json.
- Plugins should be tested. We recommend mocha or ava which support Promises out of the box.
- Use asynchronous methods when it is possible.
- Document your plugin in English.
- Make sure your plugin outputs correct source mappings if appropriate.
- If your plugin uses 'virtual modules' (e.g. for helper functions), prefix the module ID with \0. This prevents other
  plugins from trying to process it.

## Properties

- `name` : String; The name of the plugin.

## [Build Hooks](https://rollupjs.org/guide/en/#build-hooks)

- `async`: The hook may also return a Promise resolving to the same type of value; otherwise, the hook is marked
  as `sync`.
- `first`:  If several plugins implement this hook, the hooks are run sequentially until a hook returns a value other
  than `null` or `undefined`.
- `sequential`: If several plugins implement this hook, all of them will be run in the specified plugin order.  IF a 
  hook is `async`, subsequent hooks of this kind will wait until the current hook is resolved.
- `parallel`: If several plugins implement this hook, all of them will be run in parallel and not wait for the the
  current hook.

Build hooks are run during the build phase, which is triggered by `rollup.rollup( inputOptions )`.  They are mainly
concerned with locating, providing and transforming input files before they are processed by Rollup. The first hook
of the build phase is `options`, the last one is always `buildEnd`.  If there is a build error, `closeBundle` will
be called after that.


`buildEnd`: The last hook in the build phase. The output from here goes straight to the output options to start the
output phase.

`buildStart`: Called at the start of each `rollup.rollup`. It's recommended to tap into this one if you want clean
original options from the start of the process.

`closeWatcher`: This can be triggered at any time during build or output phase (as can `watcher`).

`load`, `moduleParsed`, `options`, `resolveDynamicImport`, 


## [Output Hooks](https://rollupjs.org/guide/en/#output-generation-hooks)

`augmentChunkHash`, `banner`, `closeBundle`, `footer`, `generateBundle`,  `intro`, `outputOptions`, `outro`, `renderChunk`,
`renderDynamicImport`, `renderError`, `renderStart`, `resolveFileUrl`, `resolveImportMeta`, `writeBundle`, 


## Plugin Context

A number of utility functions and informational bits can be accessed from within most `hooks` via `this`:

`this.addWatchFile`, `this.emitFile`, `this.error`, `this.getCombinedSourceMap`, `this.getFileName`, `this.getModuleIds`,
`this.getModuleInfo`, `this.getWatchFiles`, `this.load`, `this.meta`, `this.resolve`, `this.setAssetStore`, `this.warn`


