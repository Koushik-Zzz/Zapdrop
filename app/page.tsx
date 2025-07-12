 
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import HomeHero from '@/components/HomeHero';
 
export default function Home() {
  return (
        <HomeHero />
  )
}