import React, { memo } from 'react';

const Footer = memo(() => {
  return (
    <footer className="mt-20 py-8 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-slate-500">
            © 2024 EasyCoach. Professional football management platform.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer; 