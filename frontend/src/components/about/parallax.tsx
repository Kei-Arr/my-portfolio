"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import galleryImages from "@/assets/images/gallery"

import Floating, {
  FloatingElement,
} from "@/fancy/components/image/parallax-floating"

const floatingConfig = [
  { depth: 1, top: "10%", left: "32%", imageIndex: 1, size: "w-20 h-20 md:w-28 md:h-28" },
  { depth: 2, top: "2%", left: "53%", imageIndex: 2, size: "w-28 h-40 md:w-40 md:h-52" },
  { depth: 1, top: "40%", left: "2%", imageIndex: 3, size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 2, top: "70%", left: "77%", imageIndex: 4, size: "w-28 h-28 md:w-36 md:h-48" },
  { depth: 4, top: "73%", left: "15%", imageIndex: 5, size: "w-40 md:w-52 h-full" },
  { depth: 1, top: "80%", left: "50%", imageIndex: 6, size: "w-24 h-24 md:w-32 md:h-32" },
]

const Preview = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center bg-dark-800 overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-50 text-white font-kurye-normal">
          About Me
        </p>
        <p className="text-xl z-50 max-w-md md:max-w-xl text-center hover:scale-105 transition-transform text-cream-100">
  I am a passionate Software Engineer with a knack for building full-stack web applications using modern technologies like Next.js and TailwindCSS. My journey in tech began with a curiosity for solving real-world problems through innovative solutions, which evolved into a love for crafting user-centric digital experiences.
        </p>

      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {floatingConfig.map(({ depth, top, left, imageIndex, size }, i) => (
          <FloatingElement
            key={i}
            depth={depth}
            className={`top-[${top}] left-[${left}]`}
          >
            <motion.img
              initial={{ opacity: 0 }}
              src={galleryImages[imageIndex]}
              className={`${size} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
            />
          </FloatingElement>
        ))}
      </Floating>
    </div>
  )
}

export default Preview
