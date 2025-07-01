"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  transform,
} from "framer-motion";
import Image from "next/image";

const RESPONSIVE_CONFIG = {
  mobile: {
    breakpoint: 768,
    iconSize: 80,
    margin: 16,
    grid: { rows: 8, cols: 4 },
  },
  tablet: {
    breakpoint: 1024,
    iconSize: 100,
    margin: 20,
    grid: { rows: 8, cols: 6 },
  },
  desktop: {
    breakpoint: Infinity,
    iconSize: 120,
    margin: 24,
    grid: { rows: 10, cols: 8 },
  },
};

// Enhanced device utilities with proper typing
interface DeviceSize {
  width: number;
  height: number;
}

interface IconConfig {
  size: number;
  margin: number;
  grid: { rows: number; cols: number };
}

const getResponsiveConfig = (): IconConfig => {
  if (typeof window === "undefined") {
    return { size: 120, margin: 24, grid: { rows: 10, cols: 8 } };
  }

  const width = window.innerWidth;

  if (width < RESPONSIVE_CONFIG.mobile.breakpoint) {
    return {
      size: RESPONSIVE_CONFIG.mobile.iconSize,
      margin: RESPONSIVE_CONFIG.mobile.margin,
      grid: RESPONSIVE_CONFIG.mobile.grid,
    };
  } else if (width < RESPONSIVE_CONFIG.tablet.breakpoint) {
    return {
      size: RESPONSIVE_CONFIG.tablet.iconSize,
      margin: RESPONSIVE_CONFIG.tablet.margin,
      grid: RESPONSIVE_CONFIG.tablet.grid,
    };
  } else {
    return {
      size: RESPONSIVE_CONFIG.desktop.iconSize,
      margin: RESPONSIVE_CONFIG.desktop.margin,
      grid: RESPONSIVE_CONFIG.desktop.grid,
    };
  }
};

const getDeviceSize = (): DeviceSize => ({
  width:
    typeof window !== "undefined"
      ? Math.max(window.innerWidth * 0.95, 320)
      : 1280,
  height:
    typeof window !== "undefined"
      ? Math.max(window.innerHeight * 0.85, 480)
      : 720,
});

const generateProfessionalColor = (index: number): string => {
  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  ];
  return colors[index % colors.length];
};

// Enhanced hook with proper responsive handling
export function useIconTransform({
  x,
  y,
  scale,
  planeX,
  planeY,
  xOffset,
  yOffset,
  deviceSize,
  iconConfig,
}: {
  x: any;
  y: any;
  scale: any;
  planeX: any;
  planeY: any;
  xOffset: number;
  yOffset: number;
  deviceSize: DeviceSize;
  iconConfig: IconConfig;
}) {
  const xScale = useRef(1);
  const yScale = useRef(1);

  const createScreenRange = useCallback(
    (axis: "width" | "height") => [
      -100,
      100,
      deviceSize[axis] - (iconConfig.size + iconConfig.margin) / 2 - 100,
      deviceSize[axis] - (iconConfig.size + iconConfig.margin) / 2 + 100,
    ],
    [deviceSize, iconConfig]
  );

  const scaleRange = [0.3, 1, 1, 0.3];
  const xRange = createScreenRange("width");
  const yRange = createScreenRange("height");

  const mapScreenToXOffset = useMemo(
    () => transform(xRange, [40, 0, 0, -40]),
    [xRange]
  );
  const mapScreenToYOffset = useMemo(
    () => transform(yRange, [40, 0, 0, -40]),
    [yRange]
  );
  const mapScreenXToScale = useMemo(
    () => transform(xRange, scaleRange),
    [xRange]
  );
  const mapScreenYToScale = useMemo(
    () => transform(yRange, scaleRange),
    [yRange]
  );

  useMotionValueEvent(planeX, "change", (v: number) => {
    const screenOffset = v + xOffset + 50;
    xScale.current = mapScreenXToScale(screenOffset);
    const newScale = Math.min(xScale.current, yScale.current);
    scale.set(Math.max(newScale, 0.2));
    x.set(mapScreenToXOffset(screenOffset));
  });

  useMotionValueEvent(planeY, "change", (v: number) => {
    const screenOffset = v + yOffset + 50;
    yScale.current = mapScreenYToScale(screenOffset);
    const newScale = Math.min(xScale.current, yScale.current);
    scale.set(Math.max(newScale, 0.2));
    y.set(mapScreenToYOffset(screenOffset));
  });
}

function Item({
  row,
  col,
  planeX,
  planeY,
  deviceSize,
  iconConfig,
  index,
}: {
  row: number;
  col: number;
  planeX: any;
  planeY: any;
  deviceSize: DeviceSize;
  iconConfig: IconConfig;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const xOffset =
    col * (iconConfig.size + iconConfig.margin) +
    (row % 2) * ((iconConfig.size + iconConfig.margin) / 2);
  const yOffset = row * (iconConfig.size + iconConfig.margin * 0.8);

  useIconTransform({
    x,
    y,
    scale,
    planeX,
    planeY,
    xOffset,
    yOffset,
    deviceSize,
    iconConfig,
  });

  const bgGradient = generateProfessionalColor(index);

  return (
    <motion.div
      className="absolute rounded-full flex items-center select-none justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{
        left: xOffset,
        top: yOffset,
        x,
        y,
        scale,
        width: iconConfig.size,
        height: iconConfig.size,
        background: bgGradient,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      <div className="relative w-3/5 h-3/5 overflow-hidden rounded-lg">
        <Image
          src="/assets/stocks/1.png"
          fill
          className="object-cover"
          alt={`Icon ${index + 1}`}
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
        />
      </div>
    </motion.div>
  );
}

// Main Dock component with enhanced responsiveness
export default function Dock() {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>(getDeviceSize());
  const [iconConfig, setIconConfig] = useState<IconConfig>(
    getResponsiveConfig()
  );

  // Enhanced resize handler with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newDeviceSize = getDeviceSize();
        const newIconConfig = getResponsiveConfig();
        setDeviceSize(newDeviceSize);
        setIconConfig(newIconConfig);
      }, 150);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  // Generate responsive grid
  const grid = useMemo(() => {
    return Array.from({ length: iconConfig.grid.rows }, (_, rowIndex) =>
      Array.from({ length: iconConfig.grid.cols }, (_, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        index: rowIndex * iconConfig.grid.cols + colIndex,
      }))
    );
  }, [iconConfig.grid]);

  // Calculate grid dimensions
  const gridDimensions = useMemo(() => {
    const totalWidth =
      iconConfig.grid.cols * (iconConfig.size + iconConfig.margin);
    const totalHeight =
      iconConfig.grid.rows * (iconConfig.size + iconConfig.margin);
    return { width: totalWidth, height: totalHeight };
  }, [iconConfig]);

  // Responsive drag constraints - prevent dragging outside when content is visible
  const dragConstraints = useMemo(() => {
    const padding = 100;
    const maxX = padding;
    const maxY = padding;

    // Calculate minimum positions to keep content within bounds
    const minX = Math.min(
      -(gridDimensions.width - deviceSize.width + padding),
      -padding
    );
    const minY = Math.min(
      -(gridDimensions.height - deviceSize.height + padding),
      -padding
    );

    return {
      left: minX,
      right: maxX,
      top: minY,
      bottom: maxY,
    };
  }, [deviceSize, gridDimensions]);

  // Center the grid initially
  const initialPosition = useMemo(() => {
    const centerX = (deviceSize.width - gridDimensions.width) / 2;
    const centerY = (deviceSize.height - gridDimensions.height) / 2;

    console.log(centerX, centerY);

    return {
      x: Math.max(
        Math.min(centerX, dragConstraints.right),
        dragConstraints.left
      ),
      y: Math.max(
        Math.min(centerY, dragConstraints.bottom),
        dragConstraints.top
      ),
    };
  }, [deviceSize, gridDimensions, dragConstraints]);

  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  // Update position when device size or config changes
  useEffect(() => {
    x.set(initialPosition.x);
    y.set(initialPosition.y);
  }, [initialPosition.x, initialPosition.y, x, y]);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl"
      style={{
        width: deviceSize.width,
        height: deviceSize.height,
        minHeight: 320,
        minWidth: 280,
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Drag instruction for better UX */}
      <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-medium">
        Drag to explore
      </div>

      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
        style={{
          width: gridDimensions.width + 200,
          height: gridDimensions.height + 200,
          x,
          y,
          background: "transparent",
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {grid.flat().map((item) => (
          <Item
            key={`${item.row}-${item.col}`}
            row={item.row}
            col={item.col}
            planeX={x}
            planeY={y}
            deviceSize={deviceSize}
            iconConfig={iconConfig}
            index={item.index}
          />
        ))}
      </motion.div>
    </div>
  );
}
