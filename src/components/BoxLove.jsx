import React, { useEffect } from 'react';
import CONFIG from '../assets/config';
import './BoxLove.css';

const BoxLove = () => {
  useEffect(() => {
    document.title = CONFIG.titleWeb;
    document.body.style.backgroundImage = `url(./images/${CONFIG.background})`;
  }, []);

  const renderFaces = (type, size) =>
    Array.from({ length: 6 }).map((_, i) => (
      <li key={i} className={`${type}-face`} style={{
        backgroundImage: `url(./images/${CONFIG[`${type}${i + 1}`]})`
      }} />
    ));

  return (
    <div className="box-love-wrapper">
      <div className="box-love">
        <ul className="minbox">{renderFaces('min')}</ul>
        <ol className="maxbox">{renderFaces('max')}</ol>
        <audio autoPlay loop>
          <source src="https://example.com/your-music.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default BoxLove;
