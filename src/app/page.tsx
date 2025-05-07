'use client';

import Interface from '@/components/modules/Interface';
import Intro from '@/components/template/Intro';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Pharser is not supported in server side rendering
const Forest = dynamic(() => import('@/components/Forest'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Interface />
      <Intro />
    </>
  );
}
