import React, { useState, useEffect } from "react";


const Todo = () => {
    const initialState = JSON.parse(localStorage.getItem("todos")) || [];

    const [todo,setTodo] = useState("");   
    const [todos,setTodos] = useState(initialState);   
    const [editId,seteditId] = useState(0);


    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos)); 
    },[todos])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(editId){
            const editTodo = todos.find((i)=>i.id===editId);
            const updatedTodos= todos.map((t)=>t.id===editTodo.id?
                (t={id:t.id,todo}):{id:t.id,todo:t.todo}
            );

            setTodos(updatedTodos);
            seteditId(0);
            setTodo("");
            return; 
        }

        if(todo!==''){
            setTodos([{id:`${todo}-${Date.now()}`, todo}, ...todos]);
        }

        setTodo("");

    };

    const handledelete = (id) =>{
        const deltodo = todos.filter((to)=>to.id!==id);
        setTodos([...deltodo]);
    };

    const handleupdate = (id) =>{
        const editTodo = todos.find((i)=>i.id===id);
        setTodo(editTodo.todo);
        seteditId(id);

    }
  return (
    <div className="container">
           <h1>Todo List</h1>

           <form className="inputform" onSubmit={handleSubmit}>
              <input type="text" value ={todo} onChange={(e)=>setTodo(e.target.value)}></input>
              <button type="submit">{editId? "Edit":"Go"}</button>
           </form>

           <uli className ="alllist">
              {
                 todos.map((t)=>(
                  <li className="oneitem">
                     <span className="todotext" key={t.id}>{t.todo}</span>
                     <button onClick={()=>handleupdate(t.id)}>Edit</button>
                     <button onClick={()=>handledelete(t.id)}>Delete</button>
                  </li>
                 ))
              }
           </uli>
         

    </div>
  )
}

export default Todo