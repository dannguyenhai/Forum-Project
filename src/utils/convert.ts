
export const formatVideoUrl = (link?: string) => {
  if (!link) {
    return ''
  }
  if (link.includes('/embed/')) {
    return link
  } else {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);

    const id =  (match && match[2].length === 11)
      ? match[2]
      : null;
    return  `https://www.youtube.com/embed/${id}`
  }
}
