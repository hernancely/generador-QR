import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { getGalleryStats } from '../utils/api';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const result = await getGalleryStats();
        setStats(result.stats);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <h3 className="text-4xl font-bold text-wedding-primary">
            {stats.totalFiles}
          </h3>
          <p className="text-gray-600">Archivos Totales</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-4xl font-bold text-green-600">
            {stats.imageCount}
          </h3>
          <p className="text-gray-600">Fotos</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-4xl font-bold text-blue-600">
            {stats.videoCount}
          </h3>
          <p className="text-gray-600">Videos</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-4xl font-bold text-purple-600">
            {stats.totalSizeFormatted}
          </h3>
          <p className="text-gray-600">Tamaño Total</p>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
