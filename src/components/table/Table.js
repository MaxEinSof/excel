import { ExcelComponent } from '@core/ExcelComponent'
import { getTableTemplate } from '@/components/table/table.template'
import resize from '@/components/table/table.resize'

export class Table extends ExcelComponent {
  static className = 'table'
  static parentClassName = 'excel'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resize(event, this.$root)
    }
  }

  getTemplate() {
    return getTableTemplate()
  }
}
