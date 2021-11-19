export function classNames(
  ...names: Array<string | undefined>
): string {
  return names
    .filter(name => name)
    .join(' ')
}

export async function fileToJSON(file: File): Promise<{} | []> {
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => {
      if (event.target === null || typeof event.target.result !== 'string') {
        return
      }
      resolve(JSON.parse(event.target.result))
    }
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })
}
