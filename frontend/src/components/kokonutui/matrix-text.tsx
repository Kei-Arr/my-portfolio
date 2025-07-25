"use client";

/**
 * @author: @dorian_baffier
 * @description: Matrix Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
}

const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 500,
    letterInterval = 100,
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    const getRandomChar = useCallback(
        () => (Math.random() > 0.5 ? "1" : "0"),
        []
    );

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            requestAnimationFrame(() => {
                setLetters((prev) => {
                    const newLetters = [...prev];
                    if (!newLetters[index].isSpace) {
                        newLetters[index] = {
                            ...newLetters[index],
                            char: getRandomChar(),
                            isMatrix: true,
                        };
                    }
                    return newLetters;
                });

                setTimeout(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        newLetters[index] = {
                            ...newLetters[index],
                            char: text[index],
                            isMatrix: false,
                        };
                        return newLetters;
                    });
                }, letterAnimationDuration);
            });
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, isAnimating, letterInterval]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay);
        return () => clearTimeout(timer);
    }, []);

    const motionVariants = useMemo(
        () => ({
            // initial: {
            //     color: "rgb(var(--foreground-rgb))",
            // },
            matrix: {
                color: "#E6D4C5",
                textShadow: "0 2px 4px rgba(230, 212, 197, 0.5)",
            },
            // normal: {
            //     color: "rgb(var(--foreground-rgb))",
            //     textShadow: "none",
            // },
        }),
        []
    );

    return (
        <div
            className={cn(
                "flex items-center justify-center",
                className
            )}
            aria-label="Matrix text animation"
        >
            <div className="flex flex-wrap items-center justify-center">
                {letters.map((letter, index) => (
                    <motion.div
                        key={`${index}-${letter.char}`}
                        className={`text-center overflow-hidden inline-block ${letter.isMatrix ? 'font-roboto-mono' : ''}`}
                        initial="initial"
                        animate={letter.isMatrix ? "matrix" : "normal"}
                        variants={motionVariants}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                        style={{
                            minWidth: letter.isSpace ? "0.3em" : "0.6em",
                            maxWidth: letter.isSpace ? "0.3em" : "1.2em",
                        }}
                    >
                        {letter.isSpace ? "\u00A0" : letter.char}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MatrixText;
