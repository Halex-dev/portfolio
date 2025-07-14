import { ref, onMounted } from "vue";

interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export function usePerformance() {
  const isLowEndDevice = ref<boolean>(false);
  const prefersReducedMotion = ref<boolean>(false);
  const connectionType = ref<string>("unknown");
  const isSlowConnection = ref<boolean>(false);
  const batteryLevel = ref<number>(1);

  const checkDevice = (): void => {
    // Check hardware
    const cores = navigator.hardwareConcurrency || 1;

    const hasDeviceMemory = "deviceMemory" in navigator;
    const memory = hasDeviceMemory
      ? (navigator as any).deviceMemory
      : undefined;

    // Low-end device detection
    if (hasDeviceMemory) isLowEndDevice.value = cores <= 2 || memory <= 2;
    else isLowEndDevice.value = cores <= 2;

    // Check connection
    const connection = (navigator as any).connection as ConnectionInfo;
    if (connection) {
      connectionType.value = connection.effectiveType || "unknown";
      isSlowConnection.value = ["slow-2g", "2g"].includes(
        connection.effectiveType || "",
      );
    }

    // Check reduced motion preference
    prefersReducedMotion.value = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  };

  const getBatteryInfo = async (): Promise<BatteryInfo | null> => {
    if ("getBattery" in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        batteryLevel.value = battery.level;
        return {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      } catch (error) {
        console.warn("Battery API not available:", error);
        return null;
      }
    }
    return null;
  };

  const shouldReduceAnimations = (): boolean => {
    return (
      prefersReducedMotion.value ||
      isLowEndDevice.value ||
      isSlowConnection.value ||
      batteryLevel.value < 0.2
    );
  };

  const getOptimalSettings = () => {
    return {
      particleCount: isLowEndDevice.value
        ? 20
        : isSlowConnection.value
          ? 40
          : 80,
      animationSpeed: shouldReduceAnimations() ? 0.5 : 1,
      enableHeavyEffects:
        !isLowEndDevice.value &&
        !isSlowConnection.value &&
        batteryLevel.value > 0.3,
    };
  };

  onMounted(() => {
    checkDevice();
    getBatteryInfo();

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
    };

    mediaQuery.addEventListener("change", handleChange);

    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      const handleConnectionChange = () => {
        connectionType.value = connection.effectiveType || "unknown";
        isSlowConnection.value = ["slow-2g", "2g"].includes(
          connection.effectiveType || "",
        );
      };

      connection.addEventListener("change", handleConnectionChange);
    }
  });

  return {
    isLowEndDevice,
    prefersReducedMotion,
    connectionType,
    isSlowConnection,
    batteryLevel,
    shouldReduceAnimations,
    getOptimalSettings,
    getBatteryInfo,
  };
}
