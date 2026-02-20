
# Implementation Plan: UI Enhancements

We will implement the following 4 UI improvements to elevate the landing page experience, skipping the "sticker peel" effect as requested.

## 1. Glassmorphism & Cinematic Cards (HomeMenu.tsx)
**Goal**: Refine the card interactions to use frosted glass effects instead of solid gradients, giving a modern, premium feel.
- Modify `TiltCard` in `HomeMenu.tsx`.
- Replace the bottom gradient text container with a `backdrop-blur-md` panel.
- Ensure text contrast remains high.

## 2. Ambient Glow (HomeMenu.tsx)
**Goal**: Integrate the dark cards with the white background using subtle ambient light.
- Add animated, blurred "orbs" behind the card grid in `HomeMenu.tsx`.
- Use brand colors (Yellow/Purple) with high blur to create depth.

## 3. Magnetic Cursor (New Component)
**Goal**: Add a custom cursor that enhances interactiveness.
- Create `src/components/ui/MagneticCursor.tsx`.
- Implement mouse tracking with `framer-motion`.
- Add states for "default" and "hover" (expanding when over links/buttons).
- Integrate into `src/app/layout.tsx` or `page.tsx`.

## 4. Parallax Background (New Component)
**Goal**: Make the static dot grid feel alive.
- Create `src/components/ui/ParallaxGrid.tsx`.
- Replace the static CSS background in `page.tsx` hero section.
- Implement slight movement based on mouse position to create a 3D depth effect.

---
**Execution Order:**
1. Update `HomeMenu.tsx` (Glassmorphism + Ambient Glow).
2. Create and integrate `MagneticCursor`.
3. Create and integrate `ParallaxGrid`.
