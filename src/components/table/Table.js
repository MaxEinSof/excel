import { ExcelComponent } from '@core/ExcelComponent'
import { getTableTemplate } from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'table'
  static parentClassName = 'excel'

  getTemplate() {
    return getTableTemplate()
  }
}
