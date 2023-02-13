import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTaskPage extends Component {
  state = {taskList: [], task: '', selectTag: tagsList[0].optionId, filterTag: ''}

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onChangeActiveTag = val => {
    this.setState({filterTag: val})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {selectTag, task} = this.state
    if (selectTag !== '' && task !== '') {
      const newTask = {
        id: uuidv4(),
        task,
        tag: selectTag,
      }
      this.setState(prev => ({
        taskList: [...prev.taskList, newTask],
        selectTag: tagsList[0].optionId,
        task: '',
      }))
    }
  }

  render() {
    const {selectTag, task, filterTag, taskList} = this.state
    const filteredList = taskList.filter(
      item => item.tag.toLowerCase() === filterTag.toLowerCase(),
    )
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task">Task</label>
            <input
              value={task}
              type="text"
              id="task"
              className="input"
              onChange={this.onChangeTask}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag">Tags</label>
            <select
              value={selectTag}
              id="tag"
              className="input"
              onChange={this.onSelectTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-add">
            Add Task
          </button>
        </form>
        <div className="tasks-view-container">
          <h1 className="sub-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <TagItem
                key={each.id}
                details={each}
                activeTag={filterTag}
                onChangeActiveTag={this.onChangeActiveTag}
              />
            ))}
          </ul>
          <h1 className="sub-heading">Tasks</h1>
          <ul className="tasks-list">
            {filteredList.map(eachItem => (
              <TaskItem key={eachItem.id} details={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTaskPage
