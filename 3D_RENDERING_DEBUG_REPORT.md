# 3D Rendering Debug Report & Handover

## 🚨 Current Status
The **Purrpurr 3D Architecture (Building3D)** is failing to render correctly on the user's local environment.
- **Symptom:** The scene loads, UI labels (Orbiting projects) appear floating, but the main 3D canvas is either **completely white** or **empty/black**, causing a "ghost town" effect where the building is invisible or the renderer crashes/blanks out.
- **Last User Feedback:** "siguio igual" (remained the same: white screen / load then blank).

## 🛠️ Attempts Made
1.  **Architecture Data Merge:** Successfully merged Pigmento (Cosmic) and Purrpurr (Operational) data into `src/data/purrpurr-architecture.ts`.
2.  **Positioning Fix:** Adjusted building to start at Y=0 (Foundation), with underground levels going to negative Y.
3.  **Camera Adjustment:** Moved camera closer (`[20, 8, 20]`) and added `target={[0, 5, 0]}` to look at the center.
4.  **Background Fix:** Forced `bg-black` on the container and `style={{ background: '#050505' }}` on the Canvas to prevent CSS whiteout.
5.  **Optimization:** Drastically reduced particle count (Stars 8000 -> 2000), removed `ContactShadows`, removed `Float` wrapper from complex geometry.
6.  **Code Fixes:** Resolved `Float is not defined` error.

## 🕵️‍♂️ Suspected Causes (For Next Agent)
The persistence of the issue suggests a deeper problem than just "camera position":

1.  **WebGL Context Crash / Memory:** The browser might be running out of memory or crashing the WebGL context.
    *   *Indicator:* Screen goes white/blank after a momentary load.
2.  **Invalid Geometry Arguments:** The loop generating `RoundedBox` geometry might be passing `NaN` or invalid `args` at some point (e.g., in the cosmic levels tapering logic: `1.6 - (i * 0.02)`). If `args` are invalid, Three.js often aborts the whole render frame.
3.  **Material Transparency Conflict:** We use `transparent` and `opacity` on almost everything. Transparency sorting in Three.js can sometimes cause visual glitches or "disappearing" objects if not handled well, though total whiteout is rare.
4.  **Device Specific:** The user's hardware might not support specific shader features being used by `@react-three/drei` (e.g., `RoundedBox` specific shader).

## 📋 Instructions for Resolution
**DO NOT** try to guess-fix parameters anymore. Use a **Diagnostic Approach**:

1.  **Minimal Reproduction (The "Cube Test"):**
    *   Comment out `<BuildingStack>`, `<MultiverseSystem>`, `<Stars>`, and `<Sparkles>`.
    *   Render a **single, simple standard mesh**: `<mesh position={[0,0,0]}><boxGeometry /><meshBasicMaterial color="red" /></mesh>`.
    *   **Goal:** Confirm if the `Canvas` itself is working. If the red box appears, the issue is in the specific components we added.

2.  **Incremental Re-enable:**
    *   Enable `<BuildingStack>` **ONLY**. If it breaks, the issue is in the floor loops/geometry.
    *   Enable `<MultiverseSystem>` next.
    *   Enable Particles last.

3.  **Check `RoundedBox`:**
    *   Replace `RoundedBox` with a standard `<boxGeometry />` temporarily. `RoundedBox` is computationally heavier and more shader-dependent.

4.  **Inspect Browser Console:**
    *   Ask the user to check the Chrome DevTools Console for "WebGL: CONTEXT_LOST" or "Three.js: geometry.attributes... is NaN" errors.

## 📍 Key Files
*   `src/components/purrpurr/Building3D.tsx` (Logic core)
*   `src/data/purrpurr-architecture.ts` (Data source)
