import { Page } from '@core/Page'
import { Store } from '@core/Store'
import { rootReducer } from '@/store/rootReducer'
import { normalizeInitialState } from '@/store/initialState'
import { debounce, storage } from '@core/utils'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString()
    const state = storage(`excel:${params}`)
    const store = new Store(rootReducer, normalizeInitialState(state))

    const stateListener = debounce((state) => {
      storage(`excel:${params}`, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getContent()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
