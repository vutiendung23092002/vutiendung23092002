// Adapter for the real flower-sprite scene from the supplied index (3).html.
// Text, links and the portrait stay in HTML; the picture is the static fallback.
(() => {
  const garden = document.querySelector(".garden");
  const stage = document.querySelector(".garden-stage");
  const toggle = document.querySelector(".motion-toggle");
  const engine = window.ProfileValleyEngine;
  const root = document.documentElement;
  if (!garden || !stage || !toggle || !engine) {
    delete root.dataset.gardenOpening;
    return;
  }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const state = {
    paused: reducedMotion.matches,
    loaded: false,
    ready: false,
    contextLost: false,
    failed: false,
    scrollTarget: 0,
    scrollPosition: 0,
    scrollVelocity: 0,
    autoScroll: true,
    drift: 0,
    progress: 0,
    lastFrame: 0,
    lastMetadata: 0,
  };
  let valley;
  let resizeTimer;
  let touchY;
  let hoveredLink = null;

  // More coverage than the supplied file, without multiplying the entire scene.
  // Source: 2000 × 400 desktop and 1500 × 100 mobile, before its loop overlap.
  Object.assign(engine.quality, {
    rows: 1800,
    columns: 480,
    mobileRows: 1250,
    mobileColumns: 240,
    fullEffects: true,
    maxPixelRatio: 1.25,
    onError: fail,
    createScroller: () => ({
      getScrollPct: () => ({ normalized: state.progress, scrollVelocity: state.scrollVelocity }),
      toggleAutoScroll: enabled => { state.autoScroll = enabled; },
      start() {}, onStart() {}, onPause() {}, destroy() {},
    }),
  });

  function travel(pixels) {
    if (!state.ready || state.paused || state.contextLost) return;
    // The reference maps one fifth of each wheel delta onto its camera path.
    const pixelsPerLap = 5 * Math.min(15 * Math.max(innerWidth, innerHeight), 20_000);
    state.scrollTarget += pixels / pixelsPerLap;
  }

  function markReady() {
    if (state.contextLost || state.failed) return;
    state.ready = true;
    garden.classList.add("is-ready");
    garden.dataset.renderer = "flower-sprites";
    delete root.dataset.gardenOpening;
    updateLinkHover();
  }

  function updateLinkHover() {
    if (!state.ready || state.contextLost || state.failed) return;
    const keyboardFocus = document.activeElement?.matches(".social-link:focus-visible");
    const active = !state.paused && !document.hidden && Boolean(hoveredLink || keyboardFocus);
    if (active === valley.valleyScene.buttonHover) return;
    if (active) valley.startHoverTransition();
    else valley.stopHoverTransition();
  }

  function clearLinkHover() {
    hoveredLink = null;
    updateLinkHover();
  }

  function stop() {
    if (!valley) return;
    cancelAnimationFrame(valley.rafID);
    valley.rafID = 0;
  }

  function render() {
    const scene = valley.valleyScene;
    scene.onFrameAlwaysRun();
    scene.onFrame();
    valley.render();
  }

  function renderWithoutIntro() {
    const scene = valley.valleyScene;
    scene.hasStartedAnimatingIn = true;
    scene.isAnimatedIn = true;
    scene.introCameraAngle = 0;
    scene.breathContainer.rotation.x = 0;
    render();
    markReady();
  }

  function frame(now) {
    valley.rafID = 0;
    if (state.paused || state.contextLost || state.failed || document.hidden) return;
    const interval = finePointer.matches ? 1000 / 60 : 1000 / 30;
    const elapsed = now - state.lastFrame;
    if (elapsed >= interval - 0.5) {
      const dt = Math.min(elapsed / 1000, 0.05);
      const previous = state.scrollPosition;
      // Match the reference's 2% easing per 60 Hz frame at any refresh rate.
      state.scrollPosition += (state.scrollTarget - state.scrollPosition) * (1 - 0.98 ** (dt * 60));
      state.scrollVelocity = (state.scrollPosition - previous) / dt * 8;
      // Rebase both ends together so easing continues across the loop boundary.
      const laps = Math.trunc(state.scrollPosition);
      state.scrollPosition -= laps;
      state.scrollTarget -= laps;
      if (state.autoScroll) state.drift = (state.drift + dt * 0.0015) % 1;
      const position = state.drift + state.scrollPosition;
      state.progress = position - Math.floor(position);
      try { render(); } catch (error) {
        fail(error);
        return;
      }
      if (now - state.lastMetadata > 150) {
        garden.dataset.sceneProgress = state.progress.toFixed(4);
        state.lastMetadata = now;
      }
      state.lastFrame = now;
    }
    valley.rafID = requestAnimationFrame(frame);
  }

  function resume() {
    if (!valley || !state.loaded || state.paused || state.contextLost || state.failed || document.hidden || valley.rafID) return;
    updateLinkHover();
    // Ignore the time spent in another tab or while motion was paused.
    valley.valleyScene.clock.oldTime = performance.now();
    state.lastFrame = performance.now();
    valley.rafID = requestAnimationFrame(frame);
  }

  function updateControls() {
    const label = state.paused ? "Bật chuyển động" : "Tạm dừng chuyển động";
    toggle.setAttribute("aria-pressed", String(state.paused));
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
    root.dataset.motion = state.paused ? "paused" : "running";
  }

  function setPaused(paused) {
    if (state.failed) return;
    state.paused = paused;
    touchY = undefined;
    updateControls();
    if (paused) {
      updateLinkHover();
      stop();
      if (valley) valley.valleyScene.settings.fadingMouse = true;
      delete root.dataset.gardenOpening;
      if (state.loaded && !state.ready && !state.contextLost) {
        try { renderWithoutIntro(); } catch (error) { fail(error); }
      }
    } else resume();
  }

  function fail(error) {
    if (state.failed) return;
    state.failed = true;
    state.loaded = false;
    state.ready = false;
    clearTimeout(resizeTimer);
    stop();
    garden.classList.remove("is-ready");
    delete garden.dataset.renderer;
    delete root.dataset.gardenOpening;
    delete root.dataset.motion;
    toggle.hidden = true;
    if (valley) {
      try { valley.destroy(); } catch { /* Keep the static garden available. */ }
    }
    console.warn("Using the static garden fallback:", error);
  }

  function prepareScene() {
    if (state.loaded) return;
    state.loaded = true;
    const scene = valley.valleyScene;
    // Larger petals and closer foliage make the supplied scene less sparse.
    for (const [name, value] of Object.entries({
      uFlowerBaseScale: 4600,
      uLeavesBaseScale: 2850,
      uFlowerBloomDistance: 28,
    })) {
      scene.settings[name] = value;
      scene.uniforms[name].value = value;
    }
    scene.settings.fadingMouse = true;
    // Retain the reference's depth of field and bloom, with gentler film grain.
    scene.settings.uNoiseAlpha = 0.002;
    if (scene.splitPass) scene.splitPass.uniforms.uNoiseAlpha.value = 0.002;
    garden.dataset.spriteCount = String(scene.points.geometry.attributes.position.count);
    const canvas = valley.renderer.domElement;
    canvas.classList.add("garden-canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.addEventListener("webglcontextlost", event => {
      event.preventDefault();
      state.contextLost = true;
      stop();
      garden.classList.remove("is-ready");
      delete root.dataset.gardenOpening;
    });
    canvas.addEventListener("webglcontextrestored", () => {
      state.contextLost = false;
      requestAnimationFrame(() => {
        try { render(); markReady(); resume(); } catch (error) { fail(error); }
      });
    });
    toggle.hidden = false;
    updateControls();
    if (!state.paused && root.dataset.gardenOpening === "loading") {
      render();
      root.dataset.gardenOpening = "intro";
    } else renderWithoutIntro();
  }

  try {
    valley = new engine.Valley(document.body, () => {}, markReady);
    // Keep the canvas hidden until the first scene frame is drawn.
    valley.renderer.domElement.classList.add("garden-canvas");
    valley.renderer.domElement.setAttribute("aria-hidden", "true");
    // The profile uses its own render loop and camera input handlers.
    valley.startRender = () => {
      try { prepareScene(); resume(); } catch (error) { fail(error); }
    };
  } catch (error) {
    fail(error);
    return;
  }

  toggle.addEventListener("click", () => setPaused(!state.paused));
  reducedMotion.addEventListener("change", event => setPaused(event.matches));
  for (const link of document.querySelectorAll(".social-link")) {
    link.addEventListener("pointerenter", event => {
      if (event.pointerType === "touch") return;
      hoveredLink = link;
      updateLinkHover();
    });
    link.addEventListener("pointerleave", () => {
      if (hoveredLink === link) clearLinkHover();
    });
    link.addEventListener("focus", updateLinkHover);
    link.addEventListener("blur", () => queueMicrotask(updateLinkHover));
  }
  window.addEventListener("wheel", event => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const unit = event.deltaMode === 1 ? 15 : event.deltaMode === 2 ? innerHeight : 1;
    travel(-event.wheelDeltaY || event.deltaY * unit);
  }, { passive: true });
  window.addEventListener("touchstart", event => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
  }, { passive: true });
  window.addEventListener("touchmove", event => {
    const nextY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
    // A finger swipe has a shorter range than a sequence of wheel events.
    if (touchY !== undefined && nextY !== undefined) travel((touchY - nextY) * 7);
    touchY = nextY;
  }, { passive: true });
  function resetTouch() {
    touchY = undefined;
  }
  window.addEventListener("touchend", resetTouch, { passive: true });
  window.addEventListener("touchcancel", resetTouch, { passive: true });
  window.addEventListener("keydown", event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey ||
        event.target.closest?.("button, input, select, textarea, [contenteditable]")) return;

    const pageStep = innerHeight * 0.85;
    const steps = {
      ArrowDown: 80, ArrowUp: -80,
      PageDown: pageStep, PageUp: -pageStep,
      " ": event.shiftKey ? -pageStep : pageStep,
    };
    if (Object.hasOwn(steps, event.key)) travel(steps[event.key]);
  });
  window.addEventListener("resize", () => {
    const refreshStill = () => {
      if (!state.loaded || !state.paused || state.contextLost || state.failed || document.hidden) return;
      try {
        valley.valleyScene.clock.oldTime = performance.now();
        render();
      } catch (error) { fail(error); }
    };
    requestAnimationFrame(refreshStill);
    clearTimeout(resizeTimer);
    // The supplied engine performs another size update after 50ms.
    resizeTimer = setTimeout(refreshStill, 90);
  }, { passive: true });
  window.addEventListener("pointermove", event => {
    if (state.paused || !state.loaded) return;
    valley.valleyScene.settings.fadingMouse = Boolean(event.target.closest?.("a, button"));
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => {
    clearLinkHover();
    if (state.loaded) valley.valleyScene.settings.fadingMouse = true;
  });
  window.addEventListener("pointerup", event => {
    if (event.pointerType === "touch" && state.loaded) valley.valleyScene.settings.fadingMouse = true;
  }, { passive: true });
  window.addEventListener("pointercancel", () => {
    clearLinkHover();
    if (state.loaded) valley.valleyScene.settings.fadingMouse = true;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearLinkHover();
      stop();
    } else resume();
  });
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", resume);
})();
