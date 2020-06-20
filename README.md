# @livelybone/use-async-data
[![NPM Version](http://img.shields.io/npm/v/@livelybone/use-async-data.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/use-async-data)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/use-async-data.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/use-async-data)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A react hook for deal data that generated asynchronously

## repository
https://github.com/livelybone/use-async-data.git

## Demo
https://github.com/livelybone/use-async-data#readme

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/use-async-data.git`
2. Go to the directory `cd use-asyn-data`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/use-async-data
```

## Global name - The variable the module exported in `umd` bundle
`useAsyncData`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```typescript jsx
import useAsyncData from '@livelybone/use-async-data'

function getAsyncData(arg1: any, arg2: any): Promise<any> {
  // get data asynchronously via fetch/xhr/mock
}

const App = () => {
  // `setData` is used to update data manually
  const { data, getData, isFetching, setData } = useAsyncData(
    getAsyncData,
    {},
    console.error,
  )

  return (
    <article>
      <button
        onClick={() =>
          getData('first argument', 'second argument').catch(console.error)
        }
      >
        Get Data
      </button>

      <p>Is Fetching: {isFetching}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </article>
  )
}
```

## CDN
Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/@livelybone/use-async-data/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/use-async-data/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/use-async-data/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/use-async-data/lib/umd/<--module-->.js"></script>
```
