import { Page } from '@core/Page'
import { $ } from '@core/dom'
import { getDashboardTableTemplate } from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()

    return $.create('div', 'dashboard').html(`
      <div class="dashboard__header">
        <h1>Excel Dashboard</h1>
      </div>

      <div class="dashboard__add">
        <div class="dashboard__container">
          <a href="#excel/${now}" class="dashboard__add-btn">Новая Таблица</a>
        </div>
      </div>

      <div class="dashboard__table dashboard__container">
        ${ getDashboardTableTemplate() }
      </div>
    `)
  }
}
