"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      staggerChildren: 0.3,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.03,
    y: -8,
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const FeaturesSection = () => {
  const { scrollYProgress } = useScroll();
  
  // Enhanced parallax transforms
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="relative py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Enhanced Background Decorations with Parallax */}
      <motion.div
        style={{ y: backgroundY1 }}
        className="absolute top-32 left-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-sm"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{ y: backgroundY2 }}
        className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-25 blur-sm"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -25]) }}
        className="absolute top-64 right-32 w-6 h-6 bg-blue-200 rounded-full opacity-40"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 15]) }}
        className="absolute bottom-64 left-32 w-8 h-8 bg-purple-200 rounded-full opacity-30"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Title Section with Parallax */}
        <motion.div 
          variants={itemVariants} 
          style={{ y: titleY }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mx-auto mb-8 rounded-full"
          />
          <motion.h2
            className="text-4xl lg:text-5xl font-light mb-6 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Find Your Perfect Home
          </motion.h2>
          <motion.p
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Simple, verified listings with intuitive search
          </motion.p>
        </motion.div>

        {/* Features Grid with Parallax */}
        <motion.div 
          style={{ y: cardsY }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
            >
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={
                  [
                    "Verified Listings",
                    "Easy Browsing",
                    "Smart Search",
                  ][index]
                }
                description={
                  [
                    "All properties verified with authentic reviews from real tenants.",
                    "Clean interface designed for effortless property discovery.",
                    "Advanced filters to find your ideal home quickly.",
                  ][index]
                }
                linkText={["Explore", "Browse", "Search"][index]}
                linkHref={["/explore", "/search", "/discover"][index]}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
  index,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  index: number;
}) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      className="relative group h-full perspective-1000"
      style={{ perspective: 1000 }}
    >
      {/* Enhanced Card Background */}
      <div className="relative bg-white rounded-3xl p-8 h-full border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
        {/* Animated Hover Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Floating Image Container */}
        <motion.div
          className="relative mb-8 h-48 flex items-center justify-center"
          whileHover={{ 
            scale: 1.08,
            rotateY: 10,
            rotateX: 5,
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          animate={{
            y: [0, -5, 0],
          }}
          style={{
            animationDelay: `${index * 0.5}s`,
          }}
        >
          {/* Image glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
          
          <Image
            src={imageSrc}
            width={280}
            height={280}
            className="relative z-10 w-full h-full object-contain opacity-90 filter drop-shadow-lg"
            alt={title}
          />
        </motion.div>

        {/* Enhanced Content */}
        <div className="relative z-10 text-center">
          <motion.h3
            className="text-xl font-medium mb-4 text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-gray-400 mb-8 leading-relaxed text-sm font-light group-hover:text-gray-500 transition-colors duration-300"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>

          {/* Enhanced CTA Button */}
          <Link href={linkHref} scroll={false}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block"
            >
              <motion.div 
                className="relative text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-300 border-b border-gray-200 hover:border-gray-400 pb-1"
                whileHover={{
                  borderBottomWidth: "2px",
                }}
                transition={{ duration: 0.2 }}
              >
                {linkText}
                <motion.span
                  className="inline-block ml-1 text-xs"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  →
                </motion.span>
              </motion.div>
              
              {/* Hover effect line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        </div>

        {/* Card accent decoration */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: index * 1,
          }}
        />
      </div>
    </motion.div>
  );
};

export default FeaturesSection;