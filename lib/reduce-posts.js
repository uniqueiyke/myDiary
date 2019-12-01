function reducePosts(posts, req) {
    return posts.reduce((acc, cur) => {
        if(cur.visibility === 'public'){
            acc.push(cur);
        }else if(req.user !== undefined){
            if(req.isAuthenticated && req.user._id.toString() === cur.authorID.toString()){
                acc.push(cur);
            }
        }
        return acc; 
    }, []);
}

module.exports = reducePosts;