import { storage } from '@core/utils'

const KEY_PREFIX = 'excel:'

function getKeys() {
  return new Array(localStorage.length)
      .fill('')
      .map((_, index) => {
        const key = localStorage.key(index)
        return key.startsWith(KEY_PREFIX) ? key : ''
      })
      .filter((key) => !!key)
}

function getDashboardItemTemplate(key) {
  const item = storage(key)
  const id = key.slice(KEY_PREFIX.length)
  const date = new Date(item.date)

  return `
    <li class="dashboard__item">
      <a href="#excel/${id}">${ item.title }</a>
      <strong>
        ${ date.toLocaleDateString('ru-RU') }
        /
        ${ date.toLocaleTimeString('ru-RU') }
      </strong>
    </li>
  `
}

export function getDashboardTableTemplate() {
  const keys = getKeys()

  if (!keys.length) {
    return `<p>Пока нет ни одной таблицы</p>`
  }

  return `
    <div class="dashboard__table-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="dashboard__list">
      ${ keys.map(getDashboardItemTemplate).join('') }
    </ul>
  `
}
