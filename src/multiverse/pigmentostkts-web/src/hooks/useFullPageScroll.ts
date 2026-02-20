"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useFullPageScroll — Hybrid scroll with overflow awareness.
 *
 * - Short sections (fit in viewport): snap on any intentional scroll.
 * - Tall sections (content taller than viewport): allow natural internal
 *   scrolling. Only snap when the user has reached the TOP or BOTTOM edge.
 */
export function useFullPageScroll(
    containerSelector: string = "main",
    sectionSelector: string = "[data-section]"
) {
    const isScrolling = useRef(false);
    const currentIndex = useRef(0);
    const touchStartY = useRef(0);
    const edgeDelta = useRef(0);
    const edgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToSection = useCallback((index: number) => {
        const sections = document.querySelectorAll(sectionSelector);
        if (index < 0 || index >= sections.length) return;

        isScrolling.current = true;
        currentIndex.current = index;
        edgeDelta.current = 0;

        const section = sections[index] as HTMLElement;
        const navbar = document.querySelector("nav");
        const navOffset = navbar ? navbar.offsetHeight : 0;
        const targetTop = section.offsetTop - navOffset;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
        });

        setTimeout(() => {
            isScrolling.current = false;
        }, 1000);
    }, [sectionSelector]);

    useEffect(() => {
        const sections = document.querySelectorAll(sectionSelector);
        if (sections.length === 0) return;

        // --- Helpers ---

        const getNavHeight = () => {
            const navbar = document.querySelector("nav");
            return navbar ? navbar.offsetHeight : 0;
        };

        /** Sync currentIndex with natural page scroll */
        const syncIndex = () => {
            if (isScrolling.current) return;
            const navH = getNavHeight();
            const scrollPos = window.pageYOffset + navH + 20;
            const allSections = document.querySelectorAll(sectionSelector);
            let active = 0;
            allSections.forEach((s, i) => {
                if ((s as HTMLElement).offsetTop <= scrollPos) active = i;
            });
            currentIndex.current = active;
        };

        // Handle initial hash navigation
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const targetSection = document.getElementById(id);
            if (targetSection) {
                // Find index of section
                const allSections = Array.from(document.querySelectorAll(sectionSelector));
                const index = allSections.indexOf(targetSection);
                if (index !== -1) {
                    currentIndex.current = index;
                    // Small delay to ensure layout is ready
                    setTimeout(() => scrollToSection(index), 100);
                }
            }
        }

        /**
         * Check if the current section is TALLER than the viewport
         * and whether the user is at or near top/bottom edges.
         */
        const getEdgeState = () => {
            const allSections = document.querySelectorAll(sectionSelector);
            const section = allSections[currentIndex.current] as HTMLElement;
            if (!section) return { tall: false, atTop: true, atBottom: true };

            const navH = getNavHeight();
            const viewH = window.innerHeight;
            const sectionH = section.offsetHeight;

            // Section is "tall" if it's significantly taller than the viewport
            const tall = sectionH > viewH + 50;

            const scrollY = window.pageYOffset;
            const sectionTop = section.offsetTop - navH;
            const sectionBottom = section.offsetTop + sectionH - viewH;

            const atTop = scrollY <= sectionTop + 10;
            const atBottom = scrollY >= sectionBottom - 10;

            return { tall, atTop, atBottom };
        };

        // --- Event Handlers ---

        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) {
                e.preventDefault();
                return;
            }

            const absDelta = Math.abs(e.deltaY);
            if (absDelta < 5) return;

            const goingDown = e.deltaY > 0;
            const { tall, atTop, atBottom } = getEdgeState();

            // ── TALL SECTION (content overflows viewport) ──
            if (tall) {
                // If NOT at an edge, let the browser scroll naturally inside the section
                if ((goingDown && !atBottom) || (!goingDown && !atTop)) {
                    return; // natural scroll
                }

                // AT the edge of a tall section: accumulate delta to require "pushing"
                e.preventDefault();
                edgeDelta.current += absDelta;

                if (edgeTimer.current) clearTimeout(edgeTimer.current);
                edgeTimer.current = setTimeout(() => { edgeDelta.current = 0; }, 300);

                // Need to accumulate ~150px of delta to break out
                if (edgeDelta.current >= 150) {
                    edgeDelta.current = 0;
                    scrollToSection(goingDown ? currentIndex.current + 1 : currentIndex.current - 1);
                }
                return;
            }

            // ── SHORT SECTION (fits in viewport) ──
            // Snap on any intentional scroll (> 50 delta)
            if (absDelta > 50) {
                e.preventDefault();
                scrollToSection(goingDown ? currentIndex.current + 1 : currentIndex.current - 1);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling.current) return;

            const diff = touchStartY.current - e.changedTouches[0].clientY;
            const absDiff = Math.abs(diff);
            if (absDiff < 60) return;

            const goingDown = diff > 0;
            const { tall, atTop, atBottom } = getEdgeState();

            // If inside a tall section and not at edge, ignore
            if (tall && ((goingDown && !atBottom) || (!goingDown && !atTop))) {
                return;
            }

            if (absDiff > 120) {
                scrollToSection(goingDown ? currentIndex.current + 1 : currentIndex.current - 1);
            }
        };

        const handleKeydown = (e: KeyboardEvent) => {
            if (isScrolling.current) return;

            const { tall, atTop, atBottom } = getEdgeState();

            if (e.key === "ArrowDown" || e.key === "PageDown") {
                if (!tall || atBottom) {
                    e.preventDefault();
                    scrollToSection(currentIndex.current + 1);
                }
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                if (!tall || atTop) {
                    e.preventDefault();
                    scrollToSection(currentIndex.current - 1);
                }
            } else if (e.key === "Home") {
                e.preventDefault();
                scrollToSection(0);
            } else if (e.key === "End") {
                e.preventDefault();
                const allSections = document.querySelectorAll(sectionSelector);
                scrollToSection(allSections.length - 1);
            }
        };

        // --- Mount ---

        window.addEventListener("scroll", syncIndex, { passive: true });
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("scroll", syncIndex);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", handleKeydown);
            if (edgeTimer.current) clearTimeout(edgeTimer.current);
        };
    }, [sectionSelector, scrollToSection]);

    return { scrollToSection, currentIndex };
}
