import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';

/**
 * Shows a spinner immediately, and after 3s also shows a “server waking up” banner.
 */
const Loader = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // schedule banner after 3s
    const timer = setTimeout(() => setShowBanner(true), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-wrapper">
      <Circles wrapperClass="loader-wrapper__loader" color="#0da69c" />
      {showBanner && (
        <div className="loader-wrapper__banner">
          The server is waking up and may take a moment—thanks for your
          patience!
        </div>
      )}
    </div>
  );
};

export default Loader;
