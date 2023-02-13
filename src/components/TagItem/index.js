import './index.css'

const TagItem = props => {
  const {details, activeTag, onClickActiveTag} = props
  const {optionId, displayText} = details

  const onClickTag = () => {
    onClickActiveTag(displayText)
  }

  const activeCss = activeTag === optionId ? 'un-active' : 'btn-active'

  return (
    <li className="tag-item">
      <button type="button" onClick={onClickTag} className={activeTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
