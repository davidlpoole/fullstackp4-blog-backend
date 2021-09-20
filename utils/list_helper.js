
const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blogs) {
    return sum + blogs.likes
  }, 0)
}

const favoriteBlog = (blogs) => {

  const object = blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current)

  const { author, title, likes } = object
  return { author, title, likes }
}


module.exports = {
  totalLikes, favoriteBlog
}
