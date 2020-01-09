$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger : 'hover'
    });
});

function alretCommenOrLikeError(element, errorMgs) {
    const alertDiv = document.createElement('div');
    alertDiv.setAttribute('class', "alert alert-secondary");
    alertDiv.setAttribute('role', "alert");
    alertDiv.textContent = errorMgs;

    element.appendChild(alertDiv)
    setTimeout(() => {
        alertDiv.remove()
    }, 2000);
}
document.addEventListener('click', async e => {
    if(e.target.classList.contains('likes')){
        e.preventDefault();
        const like = e.target;
        const parentElement = like.parentElement;

        if(!like.hasAttribute('data-auth')){
            alretCommenOrLikeError(parentElement, 'Login to like a post.');
        }else{
            try {
                // const url = 'https://localhost:4545' + like.dataset.url;
                const url = 'https://my-daily-diary.herokuapp.com' + like.dataset.url;
                // console.log(url);
                const response = await fetch(url);
                const data = await response.text();
                const likesBadge = like.querySelector('.likes-badge')
                likesBadge.textContent = data;
                console.log(data);
                            
            } catch (error) {
                console.log(error.message);
            }
        }
    }else if(e.target.classList.contains('comments')){
        e.preventDefault();
        const comments = e.target;
        const parentElement = comments.parentElement.parentElement;
        let commentDiv = parentElement.querySelector('.comment-div')
        if(!commentDiv && comments.hasAttribute('data-auth')){
            commentDiv = document.createElement('div');
            const hr = document.createElement('hr');
            commentDiv.setAttribute('class', 'form-group comment-div');
            const textArea = document.createElement('textarea');
            textArea.setAttribute('class', 'form-control'); 
            textArea.name = 'body'; 
            textArea.focus();      
            const button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Post';
            button.setAttribute('class', 'post-comment btn btn-primary');
            button.setAttribute('data-url', comments.dataset.url);
            button.disabled = true;
            commentDiv.appendChild(hr);
            commentDiv.appendChild(textArea);
            commentDiv.appendChild(button);
            comments.after(commentDiv);
            textArea.addEventListener('input', ev => {
                button.disabled = ev.target.value.trim() !== 1 ? false : true
            })
        }else if(!comments.hasAttribute('data-auth')){
            alretCommenOrLikeError(comments.parentElement, 'Login to comment on this post.');
        }
    }else if(e.target.classList.contains('post-comment')){
        try {
            const comments = e.target;
            const data = {}
            data.comment = comments.previousElementSibling.value;

            // const parentElement = comments.parentElement;
            // const url = 'https://localhost:4545' + comments.dataset.url;
            const url = 'https://my-daily-diary.herokuapp.com' + comments.dataset.url;
            const fetchOptoin = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, fetchOptoin);
            const resData = await response.json();
            if(resData.error){
                console.log(resData.error);
            }else{
                console.log(resData);
                const card = document.createElement('div');
                card.setAttribute('class', 'card border-secondary comment-card');
                const cardHeader = document.createElement('h6');
                cardHeader.setAttribute('calss', 'card-header bg-secondary text-white');
                cardHeader.textContent = resData.commentedBy.name;
                const cardBody = document.createElement('div');
                cardBody.setAttribute('class', 'card-body');
                const cardBodyText = document.createElement('p');
                cardBodyText.setAttribute('class', 'card-text');
                cardBodyText.textContent = resData.comment;
                cardBody.appendChild(cardBodyText);
                card.append(cardHeader, cardBody);
                const parentElement = comments.parentElement;
                const grandParentNode = parentElement.parentElement.parentElement;
                const commentContainer = grandParentNode.querySelector('.comments-container');
                commentContainer.prepend(card);
                parentElement.remove();
                
            }             
        } catch (error) {
             console.log(error.message);
        }
    }
})
