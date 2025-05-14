export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  docs: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(model: any, filter: any, options: PaginationOptions = {}): Promise<PaginationResult<T>> {
  const page = options.page || 1;
  const limit = options.limit || 20;
  const skip = (page - 1) * limit;
  const docs = await model.find(filter).skip(skip).limit(limit).select('-password');
  const total = await model.countDocuments(filter);
  return { docs, total, page, limit };
} 