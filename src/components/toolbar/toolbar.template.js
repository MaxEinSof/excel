function getButtonTemplate(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `

  return `
    <button class="toolbar__button ${button.isActive ? 'active' : ''}" ${meta} type="button">
      <span class="material-icons" ${meta}>${button.icon}</span>
    </button>
  `
}

export function getToolbarTemplate(state) {
  const buttons = [
    {
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
      icon: 'format_bold',
      isActive: state.fontWeight === 'bold'
    },
    {
      value: { fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic' },
      icon: 'format_italic',
      isActive: state.fontStyle === 'italic'
    },
    {
      value: { textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline' },
      icon: 'format_underlined',
      isActive: state.textDecoration === 'underline'
    },
    {
      value: { textAlign: 'left' },
      icon: 'format_align_left',
      isActive: state.textAlign === 'left'
    },
    {
      value: { textAlign: 'center' },
      icon: 'format_align_center',
      isActive: state.textAlign === 'center'
    },
    {
      value: { textAlign: 'right' },
      icon: 'format_align_right',
      isActive: state.textAlign === 'right'
    }
  ]

  return buttons.map(getButtonTemplate).join('')
}
