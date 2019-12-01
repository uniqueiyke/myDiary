$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger : 'hover'
    });
});

const likes = document.querySelectorAll('.likes');

const likesA = [...likes];

likesA.forEach(like => {
    like.addEventListener('click', async e => {
        e.preventDefault();
        try {
            // const url = 'https://localhost:4545' + like.getAttribute('href')
            const url = 'https://my-daily-diary.herokuapp.com' + like.getAttribute('href')
            const response = await fetch(url);
            const data = await response.text();
            const likesBadge = like.querySelector('.likes-badge')
            likesBadge.textContent = data;
            
        } catch (error) {
            console.log(error.message);
        }
        
    })
});
