import TodoItem from './Todo'
import todoList from '../common/types'




function TodoView({todoArray}:{todoArray:Array<todoList>}){
    return (
        <div>
            <ul>
                {todoArray.map(todoList=><TodoItem todoList={todoList} />)}
            </ul>
        </div>
    )
}

export default TodoView