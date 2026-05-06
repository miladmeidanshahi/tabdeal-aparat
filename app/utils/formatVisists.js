export function formatVisits(num) {
  if (num == null || isNaN(num)) return ''

  const units = [
    { value: 1e9, label: 'میلیارد' },
    { value: 1e6, label: 'میلیون' },
    { value: 1e3, label: 'هزار' }
  ]

  for (const unit of units) {
    if (num >= unit.value) {
      let result = num / unit.value

      result = result % 1 === 0 ? result : result.toFixed(1)

      return `${result} ${unit.label}`
    }
  }

  return num.toString()
}
