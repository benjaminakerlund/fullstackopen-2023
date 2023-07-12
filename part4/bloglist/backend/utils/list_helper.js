
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favBlog = (blogs) => {
    const reducer = (fav, item) => {
        if (item.likes >= fav.likes) { 
            fav = item }

        const ret = {
            title: fav.title,
            author: fav.author,
            likes: fav.likes
        }
        return ret
    }
    
    return blogs.reduce(reducer, blogs[0])
}


module.exports = {
    dummy,
    totalLikes,
    favBlog
}