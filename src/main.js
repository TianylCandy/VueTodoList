// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'todomvc-app-css/index.css'

import Vue from 'vue' 
// let Vue=require('vue') 

var filters={
    all(todolist){
       return todolist
    },
    active(todolist){
        return todolist.filter((todo)=>{
            return !todo.completed
        })
    },
   completed(todolist){
        return todolist.filter((todo)=>{
            return todo.completed
        })
    }
}

let app = new Vue({
    el:'.todoapp',
    data:{
        msg:'hello Candy',
        title:'Todo List',
        newTodo:'',
        todolist:[{
            content:'vuex',
            completed:false
        }],
        editedTodo:null,
        editCache:'',
        hashName: 'all'
    },
    computed:{
        remain(){
           return filters.active(this.todolist).length
        },
        isAll:{
            get() {
                return this.remain===0
            },
            set(value){
                this.todolist.forEach((todo) => { todo.completed = value })
            }
        },
        filteredTodos(){
            return filters[this.hashName](this.todolist)

        }
    },
    methods:{
        addTodo(e){
            if(!this.newTodo){
                return
            }
            this.todolist.push({content:this.newTodo,completed:false})
            this.newTodo=''
        },
        removeTodo(index){
            this.todolist.splice(index,1)
        },
        editTodo(todo){
            this.editCache=todo.content
            this.editedTodo=todo
        },
        doneEdit(todo,index){
            this.editedTodo=null
            if(!todo.content){this.removeTodo(index)}
        },
        cancelEdit(todo){
            this.editedTodo=null
            todo.content=this.editCache
        },
        clear(){
            this.todolist=filters.active(this.todolist)
        }

     },

     directives:{
        focus(el,value){
            if(value){
                el.focus()
            }
        }
     }
})

function hashchange(){
    let hashName=location.hash.replace(/#\/?/,'')
    console.log(hashName);
    if(filters[hashName]){
        app.hashName = hashName
        console.log(app.hashName)
    }else{
        location.hash =''
        app.hashName = 'all'

    }
}
window.addEventListener('hashchange', hashchange)