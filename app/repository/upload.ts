export function createUploadRepository(appFetch: typeof $fetch) {
  return {
    image(file: File) {
      const body = new FormData()
      body.append('file', file)
      return appFetch<{ path: string }>('/api/admin/upload', { method: 'POST', body })
    },
  }
}
