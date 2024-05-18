export const classificationSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    group: {
      type: 'string',
      maxLength: 100
    },
    items: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          value: {
            type: 'string'
          },
          label: {
            type: 'string'
          }
        }
      }
    }
  },
  required: ['group', 'items']
}