
/**
 * Utility functions for handling type conversions in the application
 */

/**
 * Converts a string or number ID to a number
 * @param id - The ID to convert
 * @returns The ID as a number
 */
export const toNumberId = (id: string | number | undefined | null): number | null => {
  if (id === undefined || id === null) return null;
  return typeof id === 'string' ? Number(id) : id;
};

/**
 * Converts a string or number ID to a string
 * @param id - The ID to convert
 * @returns The ID as a string
 */
export const toStringId = (id: string | number | undefined | null): string | null => {
  if (id === undefined || id === null) return null;
  return typeof id === 'number' ? String(id) : id;
};

/**
 * Ensures a value is a string
 * @param value - The value to convert
 * @returns The value as a string, or null if undefined/null
 */
export const ensureString = (value: any): string | null => {
  if (value === undefined || value === null) return null;
  return String(value);
};

/**
 * Maps object properties from database format to application format
 * @param dbObject - Database object
 * @param mapping - Mapping of database fields to application fields
 * @returns Mapped object with converted properties
 */
export const mapDatabaseObject = <T extends Record<string, any>>(
  dbObject: Record<string, any>, 
  mapping: Record<string, keyof T>
): T => {
  const result = {} as T;
  
  Object.entries(mapping).forEach(([dbField, appField]) => {
    if (dbObject[dbField] !== undefined) {
      result[appField] = dbObject[dbField];
    }
  });
  
  return result;
};
