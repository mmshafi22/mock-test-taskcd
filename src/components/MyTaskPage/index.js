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



//login - ebank
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {errorMsg: '', userId: '', pin: '',showError: false}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-bg-container">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="login-form">
            <h1 className="form-heading">Welcome back!</h1>
            <div className="input-container">
              <label htmlFor="userId">User ID</label>
              <input
                id="userId"
                type="text"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login


/login -ebank  css
.login-main-container {
  background-color: #152850;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-bg-container {
  width: 900px;
  height: 60vh;
  background-color: #e0eefe;
  border-radius: 10px;
  display: flex;
}
.login-img {
  width: 50%;
  padding: 10px;
}
.login-form {
  background-color: #ffffff;
  width: 50%;
  height: 100%;
  border-radius: 10px;
  display: column;
  flex-direction: column;
  justify-content: center;
}
.form-heading {
  font-family: Roboto;
  font-size: 25px;
  font-weight: bold;
  color: #183b56;
  margin: 0px;
  padding-bottom: 20px;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  font-family: Roboto;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 10px;
  color: #c3cad9;
}
input {
  border: 1px solid #c3cad9;
  background-color: transparent;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 10px;
}
