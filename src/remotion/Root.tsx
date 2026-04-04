import React from 'react';
import { Composition } from 'remotion';
import { HeroIntro } from './HeroIntro';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroIntro"
      component={HeroIntro}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
