import { useEffect, useState } from 'react';

const AnimatedHeading = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="flex-1 hidden lg:flex items-center justify-center relative">
      <h1 className="font-bold text-8xl text-white">SPHERE</h1>
      <h2
        className={`font-bold text-8xl text-white absolute inset-0 flex items-center justify-center ${animate ? 'animate-fade-up' : 'opacity-0'}`}
      >
        SHARE
      </h2>
    </div>
  );
};

export default AnimatedHeading;
