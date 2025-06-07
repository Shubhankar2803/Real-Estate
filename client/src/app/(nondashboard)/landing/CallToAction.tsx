"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0.6, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/landing-call-to-action.jpg"
          alt="Search Section Background"
          fill
          className="object-cover object-center"
        />
      </motion.div>

      {/* Animated Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"
      />

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="text-center">
          {/* Title Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-white/50 mx-auto mb-8 rounded-full"
            />
            <motion.h2
              className="text-4xl lg:text-5xl font-light mb-6 text-white leading-tight"
              variants={itemVariants}
            >
              Ready to Find Your
              <motion.span
                className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-medium"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Perfect Home?
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
              variants={itemVariants}
            >
              Join thousands of renters who found their ideal home through our platform
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            {/* Primary Button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-white text-gray-800 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Start Searching
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.button>

            {/* Secondary Button */}
            <Link href="/signup" scroll={false}>
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="relative group"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative border-2 border-white/30 text-white px-8 py-4 rounded-xl font-medium hover:border-white/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Create Account
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>1,000+ Properties</span>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Verified Listings</span>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>24/7 Support</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default CallToActionSection;