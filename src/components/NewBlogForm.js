import React, { useState } from 'react';
import blogService from '../services/blogs'

const NewBlogForm = ({setErrorMessage,blogs,setBlogs}) => {
    const [title, settitle] = useState('')
    const [author, setauthor] = useState('')
    const [url, seturl] = useState('')

    const addNewBlog = async(event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.create({
                title,author,url
            })
            setBlogs(blogs.concat(newBlog))
            settitle('')
            setauthor('')
            seturl('')
            setErrorMessage(`New Blog: ${newBlog.title} by ${newBlog.author}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
        } catch (exception) {
            console.log(exception)
			setErrorMessage('Please provide all fields');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
    }

    return (
        <div>
        <h2>Create New Blog</h2>
            <form onSubmit={addNewBlog}>
                <div>Title:<input value={title} onChange={({target})=>{settitle(target.value)}} name="title"></input></div> <br/>
                <div>Author:<input value={author} onChange={({target})=>{setauthor(target.value)}} name="title"></input></div> <br/>
                <div>Url:<input value={url} onChange={({target})=>{seturl(target.value)}} name="title"></input></div> <br/>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default NewBlogForm