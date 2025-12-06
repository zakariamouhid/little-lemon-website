import "@testing-library/jest-dom";

// Polyfill for TextEncoder/TextDecoder (required by react-router in Node.js environment)
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
