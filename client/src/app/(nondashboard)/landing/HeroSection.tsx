"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.6, 0.8]);

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmedQuery
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lat, lng],
          })
        );
        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng,
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };

  // Floating animation variants
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/landing-splash.jpg"
          alt="Platform Hero Section"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Animated Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 border border-white/20 rotate-45 hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full hidden lg:block"
      />
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute bottom-40 left-20 w-12 h-12 border-2 border-white/30 rounded-full hidden lg:block"
      />

      {/* Main Content */}
      <motion.div
        style={{ y: textY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center">
          {/* Main Heading */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Find Your
              <motion.span
                className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Dream Home
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover exceptional rental properties crafted for your unique lifestyle. 
            Your perfect home awaits.
          </motion.p>

          {/* Search Section */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              
              {/* Search Bar */}
              <div className="relative flex bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, neighborhood or address..."
                  className="flex-1 bg-transparent border-none text-white placeholder-white/70 h-16 px-6 text-lg focus:ring-0 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleLocationSearch}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none h-16 px-8 text-lg font-semibold rounded-none rounded-r-2xl transition-all duration-300"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      Search
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Search Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              {['Downtown', 'Suburbs', 'Waterfront', 'City Center'].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm border border-white/20 hover:text-white transition-all duration-300"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;