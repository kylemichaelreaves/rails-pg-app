// Polyfills required for MSW v2 to run under jest's jsdom environment.
// jsdom does not provide the Fetch API / Streams globals that MSW's request
// interceptors depend on, so we source them from Node before MSW loads.
// See: https://mswjs.io/docs/migrations/1.x-to-2.x/#frequent-issues (jest + jsdom)

// All Node built-in globals must be present on globalThis BEFORE requiring
// undici, since undici references them at module-evaluation time.
const { TextEncoder, TextDecoder } = require('node:util')
const { ReadableStream, TransformStream, WritableStream } = require('node:stream/web')
const { BroadcastChannel } = require('node:worker_threads')
const { Blob, File } = require('node:buffer')

Object.defineProperties(globalThis, {
  TextEncoder: { value: TextEncoder, writable: true, configurable: true },
  TextDecoder: { value: TextDecoder, writable: true, configurable: true },
  ReadableStream: { value: ReadableStream, writable: true, configurable: true },
  TransformStream: { value: TransformStream, writable: true, configurable: true },
  WritableStream: { value: WritableStream, writable: true, configurable: true },
  BroadcastChannel: { value: BroadcastChannel, writable: true, configurable: true },
  Blob: { value: Blob, writable: true, configurable: true },
  File: { value: File, writable: true, configurable: true },
})

const { fetch, Headers, FormData, Request, Response } = require('undici')

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  Headers: { value: Headers, writable: true, configurable: true },
  FormData: { value: FormData, writable: true, configurable: true },
  Request: { value: Request, writable: true, configurable: true },
  Response: { value: Response, writable: true, configurable: true },
})
