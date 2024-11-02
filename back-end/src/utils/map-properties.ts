import lodash from "lodash";

/**
 * Type for the configuration object that maps source properties to target paths
 */
type PropertyConfiguration = {
  [key: string]: string | string[];
};

/**
 * Creates a function to map the properties of an object to different properties on a new object.
 * @param configuration - Object where each key is the source property and the value is either a "." delimited string or array for the target path
 * @returns A function that accepts an object and returns a new object with remapped properties based on the configuration
 */
function mapProperties<T extends object, U extends object>(
  configuration: PropertyConfiguration
): (data: T | null | undefined) => U | null | undefined {
  return (data: T | null | undefined): U | null | undefined => {
    if (data) {
      return Object.entries(data).reduce<Partial<U>>((accumulator, [key, value]) => {
        return lodash.set(accumulator, configuration[key] || key, value);
      }, {}) as U;
    }
    return data as U | null | undefined;
  };
}

export default mapProperties;