import lodash from "lodash";

/**
 * Type for the configuration object that maps source properties to target paths
 */
type PropertyConfiguration = {
  [key: string]: string | string[];
};

/**
 * Maps object properties to a new structure based on provided configuration
 * @param configuration - Mapping configuration where keys are source properties and values are target paths
 * @returns Function that transforms objects according to the configuration
 */
function mapProperties<T extends object, U extends object>(
  configuration: PropertyConfiguration
): (data: T | null | undefined) => U | null | undefined {
  return (data: T | null | undefined): U | null | undefined => {
    if (!data) return data as U | null | undefined;
    
    return Object.entries(data).reduce<Partial<U>>(
      (accumulator, [key, value]) => {
        return lodash.set(accumulator, configuration[key] || key, value);
      }, 
      {}
    ) as U;
  };
}

export default mapProperties;