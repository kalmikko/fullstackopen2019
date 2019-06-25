const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const reducer = (sum,item) => sum + item
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    var favBlog = blogs[0]
    blogs.map(blog => {
        if(blog.likes > favBlog.likes){
            favBlog = blog
        }
    })
    return favBlog
}

const mostBlogs = (blogs) => {
    const authors = new Array(blogs.length)
    for(i=0;i<blogs.length;i++){//make array w/ names & blogs
        comp = {name: blogs[i].author, blogs: 1}
        authors[i] = comp
    }
    mostB = 0
    mostI = 0
    /*go through all indexes and compare to other indexes
    and count the number of blogs up if there are repeats*/ 
    for(i=0;i<authors.length;i++){
        for(j=0;j<authors.length;j++){
            if(i===j){  //ignore if same index
            } else if (authors[i].name === authors[j].name) {
                authors[i].blogs++  //if repeat, add one blog
                if(authors[i].blogs > mostB){
                    mostB = authors[i].blogs //keep track of
                    mostI = i                //index with most
                }                            //blogs
            }
        }
    }
    return authors[mostI]   //return author with most blogs
}

const mostLikes = (blogs) => {
    const authors = new Array(blogs.length)
    for(i=0;i<blogs.length;i++){//make array w/ names & likes
        comp = {
            name: blogs[i].author, 
            likes: blogs[i].likes,
            checked: false
        }
        authors[i] = comp
    }
    mostL = 0
    mostI = 0
    /*go through all indexes and compare to other indexes
    and count the number of likes up if there are repeats*/ 
    for(i=0;i<authors.length;i++){
        for(j=0;j<authors.length;j++){       //ignore if same index 
            if(i===j || authors[i].checked){ // <- or already checked
            } else if (authors[i].name === authors[j].name) {
                authors[i].likes += authors[j].likes 
                authors[j].checked = true
                if(authors[i].likes > mostL){
                    mostL = authors[i].likes //keep track of
                    mostI = i                //<- index wit
                }                            // most likes
            }
        }
    }
    return authors[mostI]   //return author with most blogs
}
 
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}