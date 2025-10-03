export const getEnv = (key) => {
  try {
    const meta = new Function("return typeof import !== 'undefined' ? import.meta : undefined;")();
    if (meta?.env && key in meta.env) {
      return meta.env[key];
    }
  } catch (e) {
    // Ignore if not available
  }

  // ✅ fallback for Jest / Node
  return process.env[key];
};
