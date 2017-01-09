# global-store

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

A version locked global store.

Global state is bad.
You should avoid using any global state as much as possible.
This includes singleton, global namespace data and **private module data**.

Furthermore, with version resolution mechanism provided by package manager, such as `npm`, you have [a even bigger problem](#multi-versions-issue).

In general, avoid any mutable global state.
It will make your code hard to test and hard to maintain.

**I can't stress that enough**.

Then why am I making this library?

There are some situation you do need to have some global states.
It is ok to have global state only if it does not affect your codes testability and maintainability.

This library provides a holy ground for those global states.

It is an in-memory store, and will ever only be an in-memory store.

This library will move to version `1.0` as soon as possible.
But once it reaches `1.0`, it will never update to other major or minor releases.
i.e. there will be no `1.1` or `2.0` of this library.

It may release patches to add misc info, e.g. improve typings, fix typos, or add `flow` support, but that's it.

With the version locked, you can rest assure there will be one and only one version of this library ever available in any application.
So that even if there are multiple version of your library exists in an application, they will have access to the same global store.

To use this global store properly, your data structure should not change across versions.
One way to achieve this is to add versioning to your store to begin with.

## Usage

```ts
import { getStore } from 'global-store'

const defaultValue = { ... }
const store = getStore('my-module-key:some-store', defaultValue)

store.value....

```

## How does it different with <any store / data manager>

`global-store` itself is simple, in fact so dead simple that any one just starting to write program can create one.
It does not have any bells and whistles to do fancy thing.

Which is a GREAT THING.
It follows SRP to the core.
And it is very unlikely to change.

The main advantage of `global-store` is the promise of a locked version library.
So you can rely on there will only be one version of `global-store` exists in an application.

## About patch version increment

Patch version change may still cause problem if the a module lock the exact version of this library.
But it rarely happens, and we need some version flexibility to make improvements to the library.

So, any module / package author, you should not version lock your module. :tada:

## Multi-versions issue

Say your are writing `your-module-a`.
It has some mutable private module data, e.g.:

```ts
const cakeSold = 0

export function getCake() {
  cakeSold++
  return new Cake()
}

export function getCakeSold() {
  return cakeSold
}
```

You released `your-module-a@1.0`.

Someone else notice `your-module-a`, liked it, and start using it in his own module, `his-module-b`.

He released `his-module-b@1.5` using `your-module-a@1.0`.

Some time later, you have made some changes to `your-module-a`, and release it as `your-module-a@2.0`.
The `cakeSold`, `getCake()` and `getCakeSold()` were not changed.

Now I come in and create an application, using both `your-module-a@2.0` and `his-module-b@1.5`.

Since `his-module-b@1.5` uses `your-module-a@1.0`, my version tree looks like this:

```sh
- his-module-b@1.5
  - your-module-a@1.0
- your-module-a@2.0
```

As you can guess, in memory there will be two different `cakeSold` and your module stop working correctly.

## How about global namespace

You may wonder that global namespace "provides" the same functionality.
Yes it does, and it is funny that it sounds like we are going full circle back and realize the goodness of global namespace.

`global-store` provide the same functionality of global namespace in this regards, and it provide the same functionality when global namespace is not available, i.e. in NodeJS.

## What about cross process / iframe sharing

`global-store` does not do this in order to keep the version locked.
You can easily imagine if `global-store` support them, it will be a neverending story and version locking is just not possible.

If you need to share states between process / iframe, use the same old IPC, web worker, process, whatever, to share the data between those `global-store`s.

## Contribute

```sh
# right after clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# edit `webpack.config.dev.js` to exclude dependencies for the global build.

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

## Npm Commands

There are a few useful commands you can use during development.

```sh
# Run tests (and lint) automatically whenever you save a file.
npm run watch

# Run tests with coverage stats (but won't fail you if coverage does not meet criteria)
npm run test

# Manually verify the project.
# This will be ran during 'npm preversion' so you normally don't need to run this yourself.
npm run verify

# Build the project.
# You normally don't need to do this.
npm run build

# Run tslint
# You normally don't need to do this as `npm run watch` and `npm version` will automatically run lint for you.
npm run lint
```

Generated by [`generator-unional@0.4.0`](https://github.com/unional/unional-cli)

[npm-image]: https://img.shields.io/npm/v/global-store.svg?style=flat
[npm-url]: https://npmjs.org/package/global-store
[downloads-image]: https://img.shields.io/npm/dm/global-store.svg?style=flat
[downloads-url]: https://npmjs.org/package/global-store
[travis-image]: https://img.shields.io/travis/unional/global-store.svg?style=flat
[travis-url]: https://travis-ci.org/unional/global-store
[coveralls-image]: https://coveralls.io/repos/github/unional/global-store/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/global-store