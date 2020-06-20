# @livelybone/use-async-data
[![NPM Version](http://img.shields.io/npm/v/@livelybone/use-async-data.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/use-async-data)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/use-async-data.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/use-async-data)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A react hook for deal data that generated asynchronously

## repository
https://github.com/livelybone/use-async-data.git

## Demo
https://github.com/livelybone/use-async-data#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/use-async-data.git`
2. 进入本地克隆目录 `cd use-asyn-data`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/use-async-data
```

## Global name - The variable the module exported in `umd` bundle
`useAsyncData`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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
在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/use-async-data/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/use-async-data/lib/umd/<--module-->.js"></script>
```

或者，你也可以使用 [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/use-async-data/lib/umd/) 看到你能用到的所有 js 脚本
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/use-async-data/lib/umd/<--module-->.js"></script>
```
