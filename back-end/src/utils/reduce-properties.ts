import lodash from "lodash";
import mapProperties from "./map-properties";

/**
 * Configuration type where each key maps to an array of strings/nulls representing property paths
 */
type ReduceConfiguration = {
  [key: string]: (string | null)[];
};

/**
 * Generic type for data objects being reduced
 */
type DataObject = Record<string, unknown>;

/**
 * Generates a custom map-properties configuration for the current row in the data set.
 * @param configuration - The reduce-properties configuration where every value must be an array.
 *  Any `null` elements in the configuration values are replaced with the length of the previous value.
 *  `null` cannot be the first value in the value array.
 * @param previousRow - The previous row data or an empty object
 * @returns The same configuration with any `null` values mapped to the length of the previous property in the previousRow object.
 *
 * @example
 *
 * getRowMapConfiguration({ "movie_id": ["movies", null, "movie_id"] }, {})
 *  returns { "movie_id": ["movies", "0", "movie_id"] }
 *
 * getRowMapConfiguration({ "movie_id": ["movies", null, "movie_id"] }, { movies: [{}, {}, {}, {}]})
 *  returns { "movie_id": ["movies", "4", "movie_id"] }
 */
function getRowMapConfiguration(
  configuration: ReduceConfiguration,
  previousRow: DataObject
): Record<string, string[]> {
  return Object.entries(configuration).reduce<Record<string, string[]>>(
    (accumulator, [key, values]) => {
      accumulator[key] = values.map((value, index, source) => {
        if (value === null) {
          const previousPath = source[index - 1];
          if (!previousPath) {
            throw new Error("Null cannot be the first value in configuration array");
          }
          return String(lodash.get(previousRow, `${previousPath}.length`, 0));
        }
        return value;
      });
      return accumulator;
    },
    {}
  );
}

/**
 * Reduces an array of data by mapping properties onto array properties as objects.
 * @param uniqueField - The unique identifier field for the records in the array, this field is used as the key for the reduce operation.
 *  When called, the returned array will include one element for each unique field value.
 * @param configuration - Each key is the source property and the value is an array representing the path to the new property.
 *  Since array index values are not know at configuration time, use `null` to represent unknown index values.
 * @returns A function that accepts an array and when called returns an array with one element for each unique field value.
 */
function reduceProperties(
  uniqueField: string,
  configuration: ReduceConfiguration
): (data: DataObject[]) => DataObject[] {
  return (data: DataObject[]): DataObject[] => {
    const reducedData = data.reduce<Record<string, DataObject>>(
      (accumulator, row) => {
        const key = String(row[uniqueField]);
        const rowObject = accumulator[key] || {};
        const rowMapConfiguration = getRowMapConfiguration(configuration, rowObject);
        const rowMapper = mapProperties(rowMapConfiguration);
        accumulator[key] = lodash.merge(rowObject, rowMapper(row));
        return accumulator;
      },
      {}
    );

    return Object.values(reducedData);
  };
}

export default reduceProperties;
