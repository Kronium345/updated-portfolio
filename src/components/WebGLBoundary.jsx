import React, { Component } from 'react';

let webglSupportCache;

// Returns true if the browser can currently create a WebGL context.
// Chrome returns null here when it has blocked WebGL for the page
// (e.g. "Web page caused context loss and was blocked").
export const isWebGLAvailable = () => {
  if (webglSupportCache !== undefined) return webglSupportCache;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    webglSupportCache = !!gl;
    // Release the probe context immediately so it doesn't count toward the browser's context limit.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglSupportCache = false;
  }
  return webglSupportCache;
};

/**
 * Wraps any WebGL/Three.js content. If WebGL is unavailable, or the scene throws
 * while rendering (e.g. "Error creating WebGL context"), renders `fallback`
 * instead of crashing the whole app.
 */
class WebGLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: !isWebGLAvailable() };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('[WebGLBoundary] 3D scene disabled:', error?.message ?? error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default WebGLBoundary;
