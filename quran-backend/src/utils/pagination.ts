export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function getPagination(
  pageStr: string | undefined,
  limitStr: string | undefined,
) {
  const page = Math.max(1, parseInt(pageStr || "1") || 1);
  const limit = Math.max(1, parseInt(limitStr || "10") || 10);
  return { page, limit };
}
