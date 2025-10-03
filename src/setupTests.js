// Testing Library matchers
import '@testing-library/jest-dom';

// TextEncoder/TextDecoder for react-router and other libs
import { TextEncoder, TextDecoder } from 'util';
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// Fetch API (fetch, Headers, Request, Response)
import 'cross-fetch/polyfill';

// Provide Vite-style envs used in code under test
process.env.VITE_API_KEY = process.env.VITE_API_KEY || 'test-api-key';
process.env.VITE_AUTH_DOMAIN = process.env.VITE_AUTH_DOMAIN || 'test-auth-domain';
process.env.VITE_FIREBASE_DATABASE = process.env.VITE_FIREBASE_DATABASE || 'https://example.firebaseio.com';
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { fetch, Headers, Request, Response } from "whatwg-fetch";

if (!global.fetch) {
  global.fetch = fetch;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}

if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

if (!global.process) {
  global.process = { env: {} };
}

process.env.VITE_API_KEY = "test-api-key";
process.env.VITE_AUTH_DOMAIN = "test-auth-domain";
process.env.VITE_PROJECT_ID = "test-project-id";
process.env.VITE_STORAGE_BUCKET = "test-storage-bucket";
process.env.VITE_MESSAGING_SENDER_ID = "test-sender-id";
