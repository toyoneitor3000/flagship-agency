"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useFullPageScroll — TikTok-style section scrolling.
 * Intercepts wheel and touch events on the given container,
 * and programmatically scrolls to the next/previous section.
 *
 * Supports sections with overflowing content: if a section is taller than
 * the viewport, the user can scroll internally first. Only when they reach
 * the top or bottom of the overflow does the section-to-section navigation
 * kick in.
 *
 * @param containerSelector - CSS selector for the scrollable container (e.g. "main")
 * @param sectionSelector   - CSS selector for each section (e.g. "[data-section]")
 */
export function useFullPageScroll(
    containerSelector: string = "main",
    sectionSelector: string = "[data-section]"
) {
    const isScrolling = useRef(false);
    const currentIndex = useRef(0);
    const touchStartY = useRef(0);
    // Track accumulated delta for overflowing sections at the edge
    const edgeDelta = useRef(0);
    const edgeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToSection = useCallback((index: number) => {
        const sections = document.querySelectorAll(sectionSelector);
        if (index < 0 || index >= sections.length) return;

        isScrolling.current = true;
        currentIndex.current = index;

        sections[index].scrollIntoView({ behavior: "smooth" });

        // Unlock after animation completes
        setTimeout(() => {
            isScrolling.current = false;
            edgeDelta.current = 0;
        }, 800);
    }, [sectionSelector]);

    useEffect(() => {
        // Determine which section is currently closest on mount
        const sections = document.querySelectorAll(sectionSelector);
        if (sections.length === 0) return;

        // Always start at the top
        window.scrollTo(0, 0);
        currentIndex.current = 0;

        /**
         * Check whether the current section overflows vertically and whether
         * we're at the edge of that overflow.
         */
        const getSectionScrollState = () => {
            const sections = document.querySelectorAll(sectionSelector);
            const section = sections[currentIndex.current] as HTMLElement;
            if (!section) return { overflows: false, atTop: true, atBottom: true };

            const overflows = section.scrollHeight > section.clientHeight + 2; // ~2px tolerance
            const atTop = section.scrollTop <= 2;
            const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 2;

            return { overflows, atTop, atBottom };
        };

        const EDGE_THRESHOLD = 100; // Accumulated deltaY needed to trigger section change

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) {
                e.preventDefault();
                return;
            }

            // Only respond to significant scroll gestures
            if (Math.abs(e.deltaY) < 30) return;

            const { overflows, atTop, atBottom } = getSectionScrollState();

            if (overflows) {
                const goingDown = e.deltaY > 0;
                const goingUp = e.deltaY < 0;

                // If we can still scroll internally, let the browser handle it
                if ((goingDown && !atBottom) || (goingUp && !atTop)) {
                    edgeDelta.current = 0;
                    return; // Don't prevent default — allow natural scroll
                }

                // We're at the edge. Accumulate delta for a "pronounced" scroll gesture.
                edgeDelta.current += Math.abs(e.deltaY);

                // Clear accumulator after a pause (resets if user stops scrolling)
                if (edgeTimeout.current) clearTimeout(edgeTimeout.current);
                edgeTimeout.current = setTimeout(() => {
                    edgeDelta.current = 0;
                }, 300);

                // Only navigate when enough edge-delta has accumulated
                if (edgeDelta.current < EDGE_THRESHOLD) {
                    e.preventDefault();
                    return;
                }

                edgeDelta.current = 0;
                e.preventDefault();

                if (goingDown) {
                    scrollToSection(currentIndex.current + 1);
                } else {
                    scrollToSection(currentIndex.current - 1);
                }
            } else {
                // Section does NOT overflow — classic full-page behavior
                e.preventDefault();

                if (e.deltaY > 0) {
                    scrollToSection(currentIndex.current + 1);
                } else {
                    scrollToSection(currentIndex.current - 1);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY.current - touchEndY;

            // Only respond to significant swipes (>50px)
            if (Math.abs(diff) < 50) return;

            const { overflows, atTop, atBottom } = getSectionScrollState();

            if (overflows) {
                const goingDown = diff > 0;
                const goingUp = diff < 0;

                // If we can still scroll internally, don't navigate
                if ((goingDown && !atBottom) || (goingUp && !atTop)) {
                    return;
                }

                // At the edge and a big swipe — navigate
                if (Math.abs(diff) < 80) return; // Require bigger swipe at edges
            }

            if (diff > 0) {
                // Swipe up → scroll down
                scrollToSection(currentIndex.current + 1);
            } else {
                // Swipe down → scroll up
                scrollToSection(currentIndex.current - 1);
            }
        };

        const handleKeydown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;

            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToSection(currentIndex.current + 1);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToSection(currentIndex.current - 1);
            } else if (e.key === "Home") {
                e.preventDefault();
                scrollToSection(0);
            } else if (e.key === "End") {
                e.preventDefault();
                const sections = document.querySelectorAll(sectionSelector);
                scrollToSection(sections.length - 1);
            }
        };

        // Add listeners with passive: false to allow preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", handleKeydown);
            if (edgeTimeout.current) clearTimeout(edgeTimeout.current);
        };
    }, [sectionSelector, scrollToSection]);

    return { scrollToSection, currentIndex };
}
