import React from 'react';

const ActionButton = ({ label, icon: Icon, onClick, className = '',  disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center space-x-2 p-3 border rounded-lg transition hover:bg-gray-200 hover:text-black ${className}`}
    >
      {Icon && <Icon className="h-5 w-5" />} {/* Render icon if provided */}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
