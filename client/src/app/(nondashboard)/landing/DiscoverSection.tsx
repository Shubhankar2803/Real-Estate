"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const cardHoverVariants = {
  rest: { 
    scale: 1,
    y: 0,
  },
  hover: { 
    scale: 1.03,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const DiscoverSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle Background Decorations */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-15 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10"
      >
        {/* Title Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-gray-300 mx-auto mb-8 rounded-full"
          />
          <motion.h2
            className="text-3xl lg:text-4xl font-light mb-6 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Simple steps to find your perfect home
          </motion.p>
          <motion.p
            className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Searching for your dream rental property has never been easier. 
            Start your journey today and discover your ideal home in just a few simple steps.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              imageSrc: "/landing-icon-wand.png",
              title: "Search Properties",
              description: "Browse our curated collection of verified rental properties in your desired location.",
              step: "01"
            },
            {
              imageSrc: "/landing-icon-calendar.png",
              title: "Book Your Rental",
              description: "Secure your perfect property with our streamlined booking process in just a few clicks.",
              step: "02"
            },
            {
              imageSrc: "/landing-icon-heart.png",
              title: "Move In & Enjoy",
              description: "Settle into your new home and start living your best life in your dream space.",
              step: "03"
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="relative z-10"
            >
              <DiscoverCard {...card} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0"
          >
            <svg className="w-full h-2" viewBox="0 0 400 8">
              <motion.path
                d="M 50 4 Q 200 4 350 4"
                stroke="#cbd5e1"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
  step,
  index,
}: {
  imageSrc: string;
  title: string;
  description: string;
  step: string;
  index: number;
}) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    variants={cardHoverVariants}
    className="relative group h-full"
  >
    {/* Step Number */}
    <motion.div
      className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      {step}
    </motion.div>

    {/* Card Background */}
    <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Subtle Hover Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl"
      />

      {/* Icon Container */}
      <motion.div
        className="relative mb-8 flex justify-center"
        whileHover={{ scale: 1.1, rotateY: 10 }}
        transition={{ duration: 0.3 }}
        animate={{
          y: [0, -5, 0],
        }}
        style={{
          animationDelay: `${index * 0.5}s`,
        }}
      >
        <div className="relative">
          {/* Icon Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-lg scale-150"
            animate={{
              scale: [1.5, 1.7, 1.5],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
          
          {/* Icon Background */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
            <Image
              src={imageSrc}
              width={32}
              height={32}
              className="w-8 h-8 opacity-80"
              alt={title}
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h3
          className="text-lg font-medium mb-4 text-gray-700 group-hover:text-gray-800 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-400 leading-relaxed text-sm font-light group-hover:text-gray-500 transition-colors duration-200"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Decorative Corner Element */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          delay: index * 1,
        }}
      />
    </div>
  </motion.div>
);

export default DiscoverSection;