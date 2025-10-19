'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimatedButton;
var framer_motion_1 = require("framer-motion");
function AnimatedButton(_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.variant, variant = _c === void 0 ? 'primary' : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d;
    var baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors relative overflow-hidden';
    var variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };
    return (<framer_motion_1.motion.button className={"".concat(baseClasses, " ").concat(variantClasses[variant], " ").concat(className, " ").concat(disabled ? 'opacity-50 cursor-not-allowed' : '')} onClick={onClick} disabled={disabled} whileHover={disabled ? {} : { scale: 1.05 }} whileTap={disabled ? {} : { scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <framer_motion_1.motion.span className="relative z-10" initial={{ y: 0 }} whileHover={{ y: -1 }} transition={{ duration: 0.1 }}>
        {children}
      </framer_motion_1.motion.span>

      {/* Ripple effect */}
      <framer_motion_1.motion.div className="absolute inset-0 bg-white/20 rounded-lg" initial={{ scale: 0, opacity: 1 }} whileTap={{ scale: 2, opacity: 0 }} transition={{ duration: 0.3 }}/>
    </framer_motion_1.motion.button>);
}
