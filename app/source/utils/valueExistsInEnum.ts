export const valueExistsInEnum = (value: string, enumerator: object) => {
  const enumValues = Object.values(enumerator)

  return enumValues.includes(value)
}
