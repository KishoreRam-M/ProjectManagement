import React from 'react';
import FeatureSection from './FeatureSection';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="Container text-center ">

<div className="tagline text-6xl text-secondary relative top-[150px] ">
  Work, Flow, Repeat.
</div>
        <div className="subheading text-3xl text-[#C4C6DB] relative top-[180px]"> Supercharge your team's focus and output with a workspace designed for deep work, not distractions.</div>
<div className="cta">
  <button className="bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C] font-semibold px-6 py-3 rounded-2xl shadow-md hover:opacity-90 transition duration-300 relative top-[210px] " onClick={()=>navigate('/feature')}>
    Experience ZenFlow
  </button>
</div>
    </div>
    </>
  );
};

export default HeroSection;
