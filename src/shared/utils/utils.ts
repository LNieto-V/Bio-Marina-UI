/**
 * Removes __typename and other GraphQL metadata from objects
 */
export function sanitizeInput<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeInput) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj = { ...obj } as any;
    delete newObj.__typename;
    delete newObj._id; // Often needed for nested updates
    delete newObj.createdAt;
    delete newObj.updatedAt;
    
    Object.keys(newObj).forEach((key) => {
      newObj[key] = sanitizeInput(newObj[key]);
    });
    return newObj;
  }
  return obj;
}
